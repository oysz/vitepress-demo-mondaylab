import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '个人成长',
    items: [
      // {
      //   text: '大江南北游记',
      //   link: '/column/Travel/'
      // },
      {
        text: '所思·所想',
        link: '/column/Growing/'
      },
      {
        text: 'Electron跨端相关',
        link: '/column/Electron/'
      },
      {
        text: '货架陈列运营',
        link: '/column/Draggable/'
      },
    ]
  },
  {
    text: '前端开发',
    items: [
      {
        text: '数据结构与算法',
        link: '/column/Algorithm/'
      },
      {
        text: '前端新人手摸手教程',
        link: '/column/Newcomer/'
      },
      {
        text: 'PMP信息系统项目管理师',
        link: '/column/PMP/'
      },
      {
        text: 'CSS基础',
        link: '/column/CSS/'
      },
      {
        text: 'React相关',
        link: '/column/React/'
      }
    ]
  },
  {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/oysz' },
      {
        text: '掘金',
        link: 'https://juejin.cn/user/567817594733224'
      },
      // {
      //   text: '飞书社区',
      //   link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
      // },
      // {
      //   text: '知乎',
      //   link: 'https://www.zhihu.com/people/zheng-zi-ji-67-89/posts'
      // }
    ]
  }
];
