const nav = require("./config/nav");
module.exports = {
  title: '上天的🐷',
  description: '向日葵告诉我，只要面对着阳光努力向上，日子就会变得单纯而美好。',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  base: '/blog/',
  plugins: [
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['shizuku', 'miku','wanko','blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'z16']
      }
    ],
    ['cursor-effects', {
      size: 2, // size of the particle, default: 2
      shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    }],
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功"
      }
   }]
  ],
  
  theme: 'reco',
  themeConfig: {
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    valineConfig: {
      appId: 'IBmCaoIoKFEr4VPoSPy1dIQR-gzGzoHsz',// your appId
      appKey: 'tNhtaflmwIXUfk9x7xlMeIDJ', // your appKey
    },
    type: 'blog',
    // logo: "/assets/img/logo.jpg",
    nav,
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: '地球反三体组织',
        link: 'http://www.woai996.com/'
      },
    ],//  友情链接
    author: 'y_chunli',
    authorAvatar: '/assets/img/head.jpg',
    // record: 'ICP 备案文案',
    // recordLink: 'ICP 备案指向链接',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
  },
}
