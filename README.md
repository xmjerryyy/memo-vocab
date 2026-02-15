# Memo Vocab - 记忆单词本

这是一个基于 React + Vite + Supabase 的现代化背单词应用。

## 功能特点

- 📱 **完美适配移动端**：响应式设计，类似原生 App 的体验。
- ☁️ **云端同步**：使用 Supabase 进行数据存储和身份验证。
- 🧠 **艾宾浩斯记忆曲线**：内置 SM-2 间隔重复算法，科学背单词。
- 📚 **丰富词书**：支持多本词书管理。
- 📊 **数据统计**：可视化学习进度。

## 快速开始

### 1. 环境准备

你需要先安装 [Node.js](https://nodejs.org/) (建议版本 v18+)。

### 2. 安装依赖

在项目根目录下打开终端，运行：

```bash
npm install
```

### 3. 配置 Supabase

1. 注册并登录 [Supabase](https://supabase.com/)。
2. 创建一个新的 Project。
3. 进入 Project Settings -> API，复制 `Project URL` 和 `anon public key`。
4. 在项目根目录创建 `.env` 文件（参考 `.env.example`），填入你的配置：

```env
VITE_SUPABASE_URL=你的Project URL
VITE_SUPABASE_ANON_KEY=你的anon key
```

5. 进入 Supabase 的 SQL Editor，复制本项目根目录下的 `schema.sql` 内容并运行，以创建数据库表结构。

### 4. 启动项目

```bash
npm run dev
```

打开浏览器访问显示的地址（通常是 http://localhost:5173）。

## 项目结构

- `src/components`: UI 组件
- `src/lib`: 工具库（Supabase 客户端、算法实现）
- `src/pages`: 页面组件
- `src/store`: 全局状态管理 (Zustand)
- `src/types`: TypeScript 类型定义

## 核心算法

位于 `src/lib/spaced-repetition.ts`，实现了简化的 SM-2 算法，根据用户的反馈（忘记、模糊、认识、简单）动态计算下一次复习时间。
