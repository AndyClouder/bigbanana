# Supabase GitHub 认证设置指南

本指南将帮助您配置 Supabase 以启用 GitHub OAuth 认证功能。

## 1. 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project" 创建新项目
3. 选择组织，输入项目名称（如：bigbanana）
4. 设置数据库密码（请妥善保存）
5. 选择地区（建议选择距离最近的地区）
6. 点击 "Create new project"

## 2. 配置 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: Big Banana AI Image Editor
   - **Homepage URL**: `http://localhost:3000` (开发环境) 或您的生产域名
   - **Authorization callback URL**: `https://[your-project-ref].supabase.co/auth/v1/callback`
4. 点击 "Register application"
5. 保存生成的 **Client ID** 和 **Client Secret**

## 3. 在 Supabase 中配置 GitHub 认证

1. 在 Supabase Dashboard 中，进入您的项目
2. 导航到 **Authentication** > **Providers**
3. 找到 **GitHub** 提供商
4. 启用 GitHub 认证
5. 填入从 GitHub 获取的信息：
   - **Client ID**: 您的 GitHub OAuth App Client ID
   - **Client Secret**: 您的 GitHub OAuth App Client Secret
6. 点击 "Save"

## 4. 获取 Supabase 配置信息

1. 在 Supabase Dashboard 中，进入 **Settings** > **API**
2. 复制以下信息：
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon public**: `eyJ...` (public key)
   - **service_role**: `eyJ...` (服务端密钥，请妥善保管)

## 5. 配置环境变量

在项目根目录的 `.env.local` 文件中添加以下配置：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

替换为您的实际配置信息。

## 6. 运行项目

1. 安装依赖（如果尚未安装）：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 访问 `http://localhost:3000`

## 7. 测试认证流程

1. 点击右上角的登录按钮
2. 选择 "使用 GitHub 登录"
3. 系统将重定向到 GitHub 进行授权
4. 授权成功后，将返回到应用并自动登录

## 功能特性

- ✅ GitHub OAuth 认证
- ✅ 服务器端会话管理
- ✅ 客户端认证状态管理
- ✅ 受保护的路由（编辑器需要登录）
- ✅ 用户菜单显示头像和登出选项
- ✅ 自动重定向未登录用户
- ✅ 错误处理和提示

## API 路由

- `/api/auth/github` - GitHub OAuth 登录入口
- `/api/auth/callback` - OAuth 回调处理
- `/api/auth/logout` - 登出处理

## 安全注意事项

1. **环境变量安全**：
   - 永远不要在前端代码中使用 `SUPABASE_SERVICE_ROLE_KEY`
   - 确保在生产环境中使用强密码和安全的密钥

2. **域名配置**：
   - 在生产环境中，确保在 GitHub OAuth App 中配置正确的回调 URL
   - 在 Supabase 中配置允许的域名

3. **会话管理**：
   - 系统自动处理会话刷新
   - 登录状态在客户端和服务器端保持同步

## 故障排除

### 常见问题

1. **"Invalid supabaseUrl" 错误**
   - 检查 `.env.local` 中的 URL 配置是否正确
   - 确保 URL 包含 `https://` 前缀

2. **GitHub 回调失败**
   - 检查 GitHub OAuth App 中的回调 URL 配置
   - 确保 Supabase 中的 GitHub 配置正确

3. **登录后立即登出**
   - 检查环境变量配置是否正确
   - 确保域名配置匹配

如有其他问题，请查看控制台错误信息或 Supabase 日志。