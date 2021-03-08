module.exports = {
  base: '/blog/',
  title: "拖延症患者",
  description: '此心光明，亦复何言。',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '走马观花', link: '/timeline/', icon: 'reco-date' }
    ],
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '类目' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      },
      socialLinks: []
    },
    friendLink: [
      {
        title: '华为',
        link: 'https://www.huawei.com/cn/?ic_medium=direct&ic_source=surlent'
      }
    ],
    repo: 'https://github.com/qqxiaofeizhu/blog',
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'wjs',
    // 作者头像
    authorAvatar: '/logo.png',
    // 备案号
    // record: 'xxxx',
    // 项目开始时间
    startYear: '2020',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
    vssueConfig: {
      platform: 'github',
      owner: 'qqxiaofeizhu',
      repo: 'blog',
      clientId: '3c23ccc7a3ffabe4da79',
      clientSecret: '25e549538375929622529ee6157f4fe6d6d83044',
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
      theme: ["haruto"],
      clean: true,
      modelStyle: {
        position: "fixed",
        left: "0px",
        bottom: "0px",
        opacity: "0.9",
        zIndex: 99999
      }
    }],
    [
      'dynamic-title',
      {
        showText: '(/≧▽≦/)咦！又好了！',
        hideText: '(●—●)喔哟，崩溃啦！',
        recoverTime: 2000,
      },
    ],
  ]
}