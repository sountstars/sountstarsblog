module.exports = {
  title: "aurora blog",
  description: "我的个人网站",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/feature_cat.jpeg" }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  prot:'8999',
  base: "/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [
      // 导航栏配置
      // { text: "前端基础", link: "FE/react", target: "_self" },
      { text: "github", link: "https://github.com/sountstars" }
    ],
    sidebar: [
      {
        title: "JS",
        collapsable: true,
        children: [
          "js/home",
          "js/date",
          "js/array",
          "js/string",
          "js/object",
          "js/regexp",
          "js/feature",
          "js/eventloop",
          "js/for_on_for_in",
          "js/web_worker",
          "js/promise",
          "js/heap",
          "js/design",
          "js/npm_yarn",
          "js/fetch_axios",
          "js/url_process",
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
            children: [
              "FE/react/basic",
              "FE/react/lifecycle",
              "FE/react/hook",
              "FE/react/route",
              "FE/react/react_redux",
              "FE/react/react_fiber",
              "FE/react/virtual_dom",
              "FE/react/react_event"
            ],
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
          {
            title: "webpack",
            collapsable: true,
            children: [
              "webpack/basic",
              "webpack/usage",
              "webpack/polyfill",
              "webpack/interview"
            ],
            sidebarDepth: 0
          },
          {
            title: "vite",
            collapsable: true,
            children: [
              "vite/basic",
            ],
            sidebarDepth: 0
          },
          "webpack/diff",
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
        children: ["Servers/basic","Servers/nginx"],
        sidebarDepth: 0
      },
      {
        title: "Git命令",
        collapsable: true,
        children: ["git/standard"],
        sidebarDepth: 0
      },
      {
        title: "Other",
        collapsable: true,
        children: ["other/basic","other/master","other/message"],
        sidebarDepth: 0
      }
    ]
  }
};
