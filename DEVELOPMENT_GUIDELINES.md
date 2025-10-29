# Big Banana 开发指南

## 🚀 开发服务器管理

### 避免端口占用问题的预防建议

#### 1. 启动开发服务器前检查
```bash
# 检查端口 3000 是否被占用
netstat -ano | findstr :3000

# 如果有输出，说明端口被占用，需要先停止相关进程
# 查看占用端口的进程详情
wmic process where ProcessId=<PID> get Name,CommandLine,ProcessId,WorkingSetSize
```

#### 2. 正确停止开发服务器
- **使用 Ctrl+C** - 在运行开发服务器的终端中按 Ctrl+C 正确停止
- **避免直接关闭终端** - 直接关闭可能导致进程仍在后台运行
- **确认进程已停止** - 停止后再次检查端口占用情况

#### 3. 检查多个 Node.js 进程
```bash
# 查看所有 Next.js 相关进程
wmic process where "Name='node.exe' and CommandLine like '%next%'" get Name,CommandLine,ProcessId,WorkingSetSize /FORMAT:TABLE

# 如果发现多个进程，清理多余的：
wmic process where ProcessId=<PID> delete
```

#### 4. 定期系统维护
- **每周检查** - 定期检查是否有不必要的 Node.js 进程
- **内存监控** - 如果系统变慢，检查进程内存使用情况
- **端口清理** - 确保只有需要的端口被占用

### 🛠️ 开发工作流程

#### 标准启动流程
1. **检查端口占用**
   ```bash
   netstat -ano | findstr :3000
   ```

2. **如果端口被占用，停止相关进程**
   ```bash
   # 查找进程ID
   netstat -ano | findstr :3000
   # 终止进程
   wmic process where ProcessId=<PID> delete
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **验证启动成功**
   ```bash
   curl -I http://localhost:3000
   ```

#### 标准停止流程
1. **在开发服务器终端按 Ctrl+C**
2. **确认端口已释放**
   ```bash
   netstat -ano | findstr :3000
   ```
3. **如果端口仍被占用，手动清理进程**

### 📊 性能监控

#### 内存使用检查
```bash
# 查看进程内存使用情况
wmic process where "Name='node.exe'" get Name,ProcessId,WorkingSetSize /FORMAT:TABLE

# 转换为 MB 更易读
# 1 MB = 1,048,576 bytes
```

#### 正常内存使用范围
- **单个 Next.js 开发服务器**: 100-300 MB
- **如果超过 500 MB**: 可能有内存泄漏，需要重启
- **如果多个进程总计超过 1 GB**: 需要清理多余进程

### 🚨 问题排查

#### 端口占用问题
**症状**:
- 开发服务器启动在 3006, 3007, 3008, 3009 等端口
- 系统变慢，内存使用高

**解决方案**:
1. 查找所有 Next.js 进程
2. 终止不需要的进程
3. 重启开发服务器

#### 认证问题
**症状**:
- GitHub 认证失败
- "Invalid API key" 错误

**解决方案**:
1. 检查 .env.local 文件中的 Supabase 配置
2. 确保服务重启后环境变量已加载
3. 验证 Supabase 项目设置

### 📝 记录模板

每次开发会话建议记录：
- **启动时间**:
- **端口使用**:
- **遇到的问题**:
- **解决方案**:
- **性能观察**:

---

**最后更新**: 2025-10-29
**维护者**: Claude Code Assistant