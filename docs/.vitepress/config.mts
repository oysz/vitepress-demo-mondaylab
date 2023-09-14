import { defineConfig } from 'vitepress'
import { nav } from './relaConf';
import { sidebar } from './relaConf';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JJW的个人博客",
  description: "A VitePress Site",
  base: '/vitepress-demo-mondaylab/', // 这里将会影响之后生成的根路径
  themeConfig: {
    logo: '/vue-color-avatar.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: nav, // 把定义的nav给替换进来
    sidebar: sidebar, // 把定义的sidebar给替换进来
    i18nRouting: true,
    outline: {
      level: [2, 6],
      label: '目录'
    },
    search: {
      provider: 'local'
    },
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

