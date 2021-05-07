module.exports = {
  title: 'my blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      { text: '前端基础', link: '/accumulate/', target: '_self' },
      { text: 'github', link: 'https://baidu.com' },
      //提供了一个 items 数组而不是一个单一的 link 时，它将显示为一个 下拉列表 
      // items: [
      //   { text: 'Chinese', link: '/language/chinese/' },
      //   { text: 'Japanese', link: '/language/japanese/' }
      // ]      
    ],
    // sidebar: 'auto', // 侧边栏配置
    // sidebarDepth: 2, // 深度  最大深度2
    sidebar: [
      {
        title: 'JS',
        collapsable: true,
        children: [
          'js/basic',
          'js/array',
          'js/string',
          'js/object',
          'js/eventloop',
        ],
        sidebarDepth: 0
      },
      {
        title: 'FE框架',
        collapsable: true,
        children: [
          {
            title: 'react',
            collapsable: true,
            children: [
              'FE/react/basic',
              'FE/react/lifecycle',
            ],
            sidebarDepth: 0
          },
        ],
        sidebarDepth: 0
      },
    ]
  }
};