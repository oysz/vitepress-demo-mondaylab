import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  '/column/Algorithm/': [
    {
      text: '栈和队列',
      items: [
        {
          text: '栈-深拷贝和浅拷贝',
          link: '/column/Algorithm/001_Stack'
        },
        {
          text: '队列-事件循环',
          link: '/column/Algorithm/002_Queue'
        }
      ]
    },
    {
      text: '字典和树',
      items: [
        {
          text: '字典和集合-Set和Map',
          link: '/column/Algorithm/003_Dictionary'
        },
        {
          text: '树-深/广度优先遍历',
          link: '/column/Algorithm/004_Tree'
        }
      ]
    }
  ],
  '/column/Growing/': [
    {
      text: '所思·所想',
      items: [
        {
          text: 'React 入门思考',
          link: '/column/Growing/'
        }
      ]
    }
  ],
  '/column/Newcomer/': [
    {
      text: '前端新人手摸手教程',
      items: [
        {
          text: 'Pinia 快速上手指南',
          link: '/column/Newcomer/001_Pinia.md'
        },
        {
          text: 'Git常用命令',
          link: '/column/Newcomer/002_Git.md'
        },
        {
          text: 'Vue-Router快速上手指南',
          link: '/column/Newcomer/003_Vue-Router.md'
        },
        {
          text: 'Electron快速上手指南',
          link: '/column/Newcomer/004_Electron.md'
        },
        {
          text: 'NestJs快速上手指南',
          link: '/column/Newcomer/005_NestJs.md'
        },
      ]
    }
  ],
  '/column/Travel/': [
    {
      text: '大江南北游记',
      items: [
        {
          text: '大江南北游记',
          link: '/column/Travel/'
        }
      ]
    }
  ],
  '/column/PMP/': [
    {
      text: 'PMP信息系统项目管理师',
      items: [
        {
          text: '十大知识领域',
          link: '/column/PMP/'
        }
      ]
    }
  ]
};
