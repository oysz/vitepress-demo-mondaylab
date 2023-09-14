---
# 提供三种布局，doc、page和home https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# https://vitepress.dev/reference/default-theme-home-page
title: JJW的博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true

hero:
    name: OYSZ
    text: Stay foolish, Stay hungry.
    tagline: /斜杠青年/人间清醒/工具控/
    image:
        src: /vue-color-avatar.png
        alt: avatar
    actions:
    - theme: brand
      text: 进入主页
      link: /column/views/guide
    - theme: alt
      text: 个人成长
      link: /column/Growing/
features:
  - icon: 🤹‍♀️
    title: Web前端
    details: 小厂程序员，国内某互联网厂搬砖。
    link: /column/views/guide
  - icon: 👩‍🎨‍
    title: 喜欢美学
    details: 热爱一切美学，喜欢用各种设计工具造图。
  - icon: 🧩
    title: 斜杆青年
    details: 是个平平无奇但是又很热爱学习的斜杆青年。
---


<!-- 自定义组件 -->
<script setup>
import home from './components/home.vue';
</script>

<home />