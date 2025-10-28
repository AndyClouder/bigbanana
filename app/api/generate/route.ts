import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Initialize OpenAI client only when needed
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "https://bigbanana.ai", // Site URL for rankings
        "X-Title": "Big Banana", // Site title for rankings
      },
    });

    console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY);

    const { imageUrl, prompt } = await request.json();

    console.log('Received request - Prompt:', prompt);
    console.log('Image URL length:', imageUrl?.length);

    if (!imageUrl || !prompt) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing imageUrl or prompt' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error('API key not found in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    console.log('Calling OpenRouter API...');
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${prompt}\n\n请直接生成修改后的图片，不要询问，直接按照指令操作并返回图片。`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      // 添加参数以确保返回图片
      response_format: { type: "auto" },
    } as any);

    console.log('API response received');
    const message = completion.choices[0].message;
    console.log('Message:', JSON.stringify(message, null, 2));

    // 提取图片数据
    const images = (message as any).images;
    const textContent = message.content;

    if (images && images.length > 0) {
      // 返回第一张生成的图片
      const imageUrl = images[0].image_url.url;
      console.log('Generated image URL (first 100 chars):', imageUrl.substring(0, 100));

      return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        text: textContent || ''
      });
    } else {
      // 如果没有图片，返回文本
      return NextResponse.json({
        success: true,
        text: textContent || '',
        imageUrl: null
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });

    return NextResponse.json(
      {
        error: 'Failed to generate',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    );
  }
}
