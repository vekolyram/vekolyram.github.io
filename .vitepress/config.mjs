import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '蔚蓝 Everest 官方 Wiki · 中文文档',
  description: 'Celeste（蔚蓝）Everest modding API 官方 wiki 的中文翻译（Custom Maps 与 Code Mods 教程）',
  srcDir: 'docs',
  cleanUrls: false,
  // 独立 Pages 仓库（<用户名>.github.io）部署在根路径
  base: '/',

  markdown: {
    // 与 MkDocs 版一致的中文 slugify：保留中文/变音符（如 Lönn），连续非字符合并为一个 -
    anchor: {
      slugify: (str) =>
        str
          .toLowerCase()
          .replace(/[^\p{L}\p{N}_]+/gu, '-')
          .replace(/^-+|-+$/g, ''),
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/Tutorials/First-Custom-Map' },
      { text: '自定义地图', link: '/Guides/Custom-Maps' },
      { text: '代码模组', link: '/Coding/Making-Code-Mods' },
      { text: '常见问题', link: '/General/FAQ' },
      { text: '编译原理', link: '/Compilers/' },
      { text: '原始 Wiki', link: 'https://github.com/EverestAPI/Resources/wiki' },
    ],

    sidebar: [
      { text: '首页', link: '/' },
      {
        text: '教程',
        collapsible: true,
        items: [
          { text: '第一张自定义地图', link: '/Tutorials/First-Custom-Map' },
          { text: '替换贴图', link: '/Tutorials/Replacing-A-Texture' },
        ],
      },
      {
        text: '指南',
        collapsible: true,
        items: [
          { text: '自定义地图', link: '/Guides/Custom-Maps' },
          { text: '模组搭建', link: '/Guides/Mod-Setup' },
        ],
      },
      {
        text: '制图',
        collapsible: true,
        items: [
          { text: '制图 FAQ', link: '/Mapping-FAQ' },
          { text: '地图元数据', link: '/Mapping/Map-Metadata' },
          { text: '实体与触发器文档', link: '/Mapping/Entity-and-Trigger-Documentation' },
          { text: '添加自定义对话', link: '/Mapping/Adding-Custom-Dialogue' },
          { text: '大地图自定义', link: '/Overworld-Customisation' },
          { text: '摄像机', link: '/Camera' },
          { text: '实用制图工具', link: '/Useful-Mapping-Tools' },
          { text: 'Helper 手册', link: '/Mapping/Helper-Manuals' },
          { text: 'Ahorn 安装帮助', link: '/Mapping/Ahorn-Installation-Help' },
        ],
      },
      {
        text: '图形',
        collapsible: true,
        items: [
          { text: '自定义图块集', link: '/Mapping/Custom-Tilesets' },
          { text: '图块集格式参考', link: '/Mapping/Tileset-Format-Reference' },
          { text: '风格地面', link: '/Mapping/Adding-Stylegrounds' },
          { text: '实体换肤', link: '/Mapping/Reskinning-Entities' },
          { text: '贴花注册表', link: '/Mapping/Decal-Registry' },
          { text: '自定义肖像', link: '/Mapping/Custom-Portraits' },
          { text: '贴图包', link: '/Guides/Texture-Packs' },
        ],
      },
      {
        text: '音频',
        collapsible: true,
        items: [
          { text: '添加自定义音频', link: '/Mapping/Adding-Custom-Audio' },
        ],
      },
      {
        text: '代码模组',
        collapsible: true,
        items: [
          { text: '第一个代码模组', link: '/Coding/Your-First-Code-Mod' },
          { text: '代码模组搭建', link: '/Coding/Code-Mod-Setup' },
          { text: '编写代码模组', link: '/Coding/Making-Code-Mods' },
          { text: '设置、存档数据与会话', link: '/Coding/Settings,-SaveData-and-Session' },
          { text: 'Everest 事件', link: '/Coding/Everest-Events' },
          { text: '理解输入', link: '/Coding/Understanding-Input' },
          { text: '日志', link: '/Coding/Logging' },
          { text: '跨模组功能', link: '/Coding/Cross-Mod-Functionality' },
          { text: '推荐实践与常见误区', link: '/Coding/Recommended-Practices-and-Pitfalls' },
          { text: '模组更新指南', link: '/Coding/Mod-Updating-Guide' },
          { text: '自定义实体、触发器与风格地面', link: '/Coding/Custom-Entities,-Triggers-and-Stylegrounds' },
          { text: '创建自定义事件', link: '/Coding/Creating-Custom-Events' },
          { text: '添加精灵图', link: '/Coding/Adding-Sprites' },
        ],
      },
      {
        text: '通用',
        collapsible: true,
        items: [
          { text: '常见问题', link: '/General/FAQ' },
          { text: '调试模式', link: '/General/Debug-Mode' },
          { text: '上传模组', link: '/Uploading-Mods' },
        ],
      },
      {
        text: '编译原理精读',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '专栏总览', link: '/Compilers/' },
          { text: '第1章 引论', link: '/Compilers/ch01' },
          { text: '第2章 一个简单的语法制导翻译器', link: '/Compilers/ch02' },
          { text: '第3章 词法分析', link: '/Compilers/ch03' },
          { text: '第4章 语法分析', link: '/Compilers/ch04' },
          { text: '第5章 语法制导的翻译', link: '/Compilers/ch05' },
          { text: '第6章 中间代码生成', link: '/Compilers/ch06' },
          { text: '第7章 运行时刻环境', link: '/Compilers/ch07' },
          { text: '第8章 代码生成', link: '/Compilers/ch08' },
          { text: '第9章 机器无关优化', link: '/Compilers/ch09' },
          { text: '第10章 指令级并行性', link: '/Compilers/ch10' },
          { text: '第11章 并行性和局部性优化', link: '/Compilers/ch11' },
          { text: '第12章 过程间分析', link: '/Compilers/ch12' },
        ],
      },
    ],

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    lastUpdated: { text: '最后更新' },
  },
})
