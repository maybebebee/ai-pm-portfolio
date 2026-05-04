# 范与恒｜AI 产品经理作品集

这是一个用于投递 AI 产品经理实习岗位的个人作品集网站第一版，使用 React + Vite + TypeScript + Tailwind CSS 构建。网站重点展示个人定位、能力结构、项目经历、产品方法论、简历入口与联系方式。

## 本地运行

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认会在本地启动 Vite 服务，终端会显示访问地址。

## 构建方式

```bash
npm run build
```

构建产物会生成在 `dist` 目录中。

## GitHub Pages 部署说明

项目已内置 GitHub Actions 部署配置：`.github/workflows/deploy.yml`。

1. 在 GitHub 新建一个空仓库，例如 `ai-pm-portfolio`。
2. 将本项目推送到仓库的 `main` 分支。
3. 进入仓库 Settings -> Pages。
4. Source 选择 `GitHub Actions`。
5. 等待 Actions 执行完成后，即可访问公开链接。

当前 `vite.config.ts` 使用 `base: './'`，适合部署到 GitHub Pages 的仓库子路径。

## 后续可扩展方向

- 为每个项目增加独立详情页，展示 PRD、流程图、原型图、Demo 截图和复盘。
- 将项目数据抽离为独立配置文件，便于持续维护。
- 如需公开简历，可增加脱敏版 `public/resume.pdf`，再把页面按钮改回下载入口。
- 增加部署流水线，自动发布到 GitHub Pages。
- 补充访问统计或作品集更新日志，但不引入复杂后端。
