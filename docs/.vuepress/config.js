module.exports = {
  title: "my blog",
  description: "我的个人网站",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/logo.jpg" }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [
      // 导航栏配置
      { text: "前端基础", link: "/accumulate/", target: "_self" },
      { text: "github", link: "https://baidu.com" }
    ],
    sidebar: [
      {
        title: "JS",
        collapsable: true,
        children: [
          "js/home",
          "js/array",
          "js/string",
          "js/object",
          "js/feature",
          "js/eventloop"
        ],
        sidebarDepth: 0
      },
      {
        title: "FE框架",
        collapsable: true,
        children: [
          {
            title: "react",
            collapsable: true,
            children: ["FE/react/basic", "FE/react/route", "FE/react/lifecycle", "FE/react/hook"],
            sidebarDepth: 0
          },
          {
            title: "vue",
            collapsable: true,
            children: [],
            sidebarDepth: 0
          },
          {
            title: "React-Native",
            collapsable: true,
            children: [],
            sidebarDepth: 0
          }
        ],
        sidebarDepth: 0
      },
      {
        title: "构建工具",
        collapsable: true,
        children: [
          "webpack/basic",
          "webpack/usage",
          "webpack/polyfill",
          "webpack/interview"
        ],
        sidebarDepth: 0
      },
      // {
      //   title: "Servers",
      //   collapsable: true,
      //   children: ["Servers/basic"],
      //   sidebarDepth: 0
      // },
      {
        title: "Typescript",
        collapsable: true,
        children: ["Typescript/basic"],
        sidebarDepth: 0
      },
      {
        title: "Servers",
        collapsable: true,
        children: ["Servers/basic"],
        sidebarDepth: 0
      },
      {
        title: "Git命令",
        collapsable: true,
        children: ["git/command"],
        sidebarDepth: 0
      },
      {
        title: "Other",
        collapsable: true,
        children: ["other/basic"],
        sidebarDepth: 0
      },
    ]
  }
};
