# Vercel GitHub OAuth 认证修复指南

## 🚨 问题：Vercel部署后GitHub登录失败

## 📋 需要配置的URL

### 1. GitHub OAuth应用设置
- **Authorization callback URL**: `https://your-vercel-app-url.vercel.app/api/auth/callback`

### 2. Supabase认证设置
- **Site URL**: `https://your-vercel-app-url.vercel.app`
- **Redirect URLs**: `https://your-vercel-app-url.vercel.app/api/auth/callback`

### 3. Vercel环境变量
```env
NEXT_PUBLIC_SUPABASE_URL=https://biweavfpggfgtsknhykp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpd2VhdmZwZ2dmZ3Rza25oeWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NTE2MzAsImV4cCI6MjA3NjIyNzYzMH0.J_mLv1_fEwGUhIXAuTxnas0KQHVHp4MA4Tr30vdTAUM
```

## 🔧 修复步骤

### 步骤1: 获取您的Vercel域名
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到您的Big Banana项目
3. 复制项目域名（如：`your-app-name.vercel.app`）

### 步骤2: 更新GitHub OAuth设置
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击您的OAuth应用
3. 修改Authorization callback URL为：`https://your-app-name.vercel.app/api/auth/callback`
4. 保存更改

### 步骤3: 更新Supabase设置
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 进入您的项目
3. 导航到 Authentication > Settings
4. 更新Site URL为：`https://your-app-name.vercel.app`
5. 在Redirect URLs中添加：`https://your-app-name.vercel.app/api/auth/callback`
6. 保存更改

### 步骤4: 配置Vercel环境变量
1. 在Vercel Dashboard中进入您的项目
2. 进入 Settings > Environment Variables
3. 添加上述环境变量
4. 重新部署项目

## ✅ 验证修复

完成配置后：
1. 重新部署Vercel项目
2. 访问您的应用
3. 点击"使用GitHub登录"
4. 应该能正常跳转到GitHub并完成授权

## 🆘 故障排除

如果仍有问题，请检查：
- Vercel部署日志中的错误信息
- Supabase认证日志
- GitHub OAuth应用状态是否为"Active"
- 所有URL配置是否完全匹配（包括https协议）

## 📞 支持

如果问题持续存在，请提供：
- Vercel项目URL
- GitHub OAuth应用配置截图
- 错误截图
- Vercel部署日志