# Creem 支付集成设置指南

本指南将帮助您完成 Creem 支付系统的完整配置。

## 📋 前置要求

1. 注册 [Creem 账户](https://creem.io)
2. 获取 Creem API 密钥
3. 配置 Webhook 端点

## 🔧 环境变量配置

在 `.env.local` 文件中添加以下环境变量：

```env
# Creem Payment Configuration
CREEM_API_KEY=your_creem_api_key_here
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret_here
```

### 获取 Creem API 密钥

1. 登录 [Creem Dashboard](https://dashboard.creem.io)
2. 进入 Settings > API Keys
3. 创建新的 API 密钥
4. 复制密钥到 `.env.local` 文件

## 🛠️ 数据库设置

需要在 Supabase 中创建以下表：

### 1. 订阅表 (subscriptions)

```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  creem_subscription_id TEXT UNIQUE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_creem_id ON subscriptions(creem_subscription_id);
```

### 2. 用户积分表 (user_credits)

```sql
CREATE TABLE user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'subscription' CHECK (type IN ('subscription', 'purchase', 'bonus')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX idx_user_credits_created_at ON user_credits(created_at);
```

### 3. 总积分视图 (user_total_credits)

```sql
CREATE VIEW user_total_credits AS
SELECT
  user_id,
  SUM(credits) as total_credits
FROM user_credits
GROUP BY user_id;
```

## 🎯 Webhook 配置

在 Creem Dashboard 中配置 Webhook：

1. 进入 Settings > Webhooks
2. 添加新的 Webhook URL: `https://your-domain.com/api/payment/webhook`
3. 选择需要监听的事件：
   - `checkout.session.completed`
   - `payment.succeeded`
   - `payment.failed`
   - `subscription.created`
   - `subscription.cancelled`
4. 保存并复制 Webhook Secret

## 🔄 价格方案配置

当前支持的价格方案：

| 计划ID | 月付价格 | 年付价格 | 积分数量 |
|--------|----------|----------|----------|
| basic  | $12      | $6       | 100      |
| pro    | $19.50   | $9.75    | 500      |
| max    | $80      | $40      | 2000     |

## 🚀 测试支付流程

### 1. 本地测试

```bash
# 启动开发服务器
npm run dev

# 访问价格页面
http://localhost:3000/pricing
```

### 2. 测试模式

Creem 支持测试模式，使用测试卡号进行测试：

- 测试卡号: `4242424242424242`
- CVC: `123`
- 过期日期: 任意未来日期

## 🔍 调试指南

### 查看日志

```bash
# 开发环境日志
npm run dev

# 检查 Creem Dashboard 中的支付事件
```

### 常见问题

1. **API 密钥错误**: 确保环境变量正确配置
2. **Webhook 未触发**: 检查 Webhook URL 是否可访问
3. **支付失败**: 查看浏览器控制台错误信息
4. **数据库错误**: 检查 Supabase 表是否正确创建

## 🛡️ 安全考虑

1. **API 密钥保护**: 永远不要在前端代码中使用 CREEM_API_KEY
2. **Webhook 验证**: 实现签名验证确保请求来源可靠
3. **HTTPS**: 确保生产环境使用 HTTPS
4. **错误处理**: 不要向用户暴露详细的错误信息

## 📞 技术支持

如果遇到问题：

1. 查看 Creem [官方文档](https://docs.creem.io)
2. 检查 Supabase 日志
3. 联系技术支持团队

## 🔄 部署清单

- [ ] 配置生产环境变量
- [ ] 创建 Supabase 数据表
- [ ] 配置 Creem Webhook
- [ ] 测试完整支付流程
- [ ] 验证订阅状态同步
- [ ] 设置监控和告警