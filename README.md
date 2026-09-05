# everest-vitepress —— 蔚蓝 Everest 官方 Wiki 中文文档库（VitePress 版）

基于翻译后的 Markdown 页面（内容源：`../everest-docs/docs`）构建的 [VitePress](https://vitepress.dev/) 静态站点。

## 结构

```
everest-vitepress/
├── package.json            # npm 脚本
├── .vitepress/config.mjs   # 站点配置（中文 UI、nav、sidebar）
├── docs/                   # 页面内容（31 个中文翻译页 + index.md）
├── tools/                  # 转换/检查脚本（见下）
└── .vitepress/dist/        # 构建产物（npm run build 生成）
```

## 使用

```bat
npm run dev      # 本地开发预览 → http://localhost:5173
npm run build    # 构建静态站点到 .vitepress/dist/
npm run preview  # 预览构建产物
```

## 内容源与同步

页面内容来自 `../everest-docs/docs`（MkDocs/Material 源，即翻译稿主库）。
`docs/` 内是**副本**，且经过 VitePress 适配转换。同步流程：

1. 复制：`../everest-docs/docs/**/*.md` → `docs/`
2. 转换 Material 语法：
   ```bat
   ..\everest-docs\python\python.exe tools\convert_vitepress.py
   ```
   - `!!! type "中文标题"` admonition → GitHub callout（`> [!TYPE] 中文标题`）
   - `<details markdown="1">` → `<details>`
3. 转义裸尖括号（C# 泛型，避免被 Vue 编译器当 HTML 标签）：
   ```bat
   ..\everest-docs\python\python.exe tools\escape_angle.py
   ```
4. `npm run build` 验证；若有 “missing end tag” 错误，用 `tools/check_tags.mjs`
   对渲染 HTML 做标签配平定位（曾有 Google Sheets 导出的 `<html>/<body>` 壳需手动删除）。
5. 新增页面记得同步更新 `.vitepress/config.mjs` 的 `themeConfig.sidebar`。

> 注意：第 2、3 步会就地修改 `docs/` 副本；MkDocs 源中的同名文件不受影响。

## 部署到 GitHub Pages

本项目已配置 **GitHub Actions 自动部署**（`.github/workflows/deploy.yml`），
面向**独立 Pages 仓库**（`<用户名>.github.io`，部署在根路径，`base: '/'`）。
若改用项目仓库（子路径），把 `config.mjs` 的 `base` 改为 `/<仓库名>/`。

首次部署步骤：

1. 在 GitHub 新建仓库，名称必须是 `<你的用户名>.github.io`（Public，不要勾选 README）。
2. 本地关联并推送：
   ```bat
   git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. 打开仓库 → Settings → Pages → **Build and deployment / Source 选 “GitHub Actions”**。
4. Actions 运行完成后，站点即发布于 `https://<你的用户名>.github.io/`。

之后每次 `git push` 到 `main` 都会自动重新构建并发布。
