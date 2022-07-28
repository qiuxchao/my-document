/*
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-06-17 16:21:48
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-28 11:08:27
 */
import { defaultTheme, defineUserConfig } from "vuepress";
import { navbarZh, sidebarZh } from './configs'
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')
// const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
import { sitemapPlugin } from "vuepress-plugin-sitemap2";



export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '湫的碎碎念',
  description: '一只前端崽',
  head: [['link', { rel: 'icon', href: '/images/head.jpg' }]],

  // Dev 配置项
  open: true,

  // 主题配置
  theme: defaultTheme({
    logo: '/images/head.jpg',
    navbar: navbarZh,
    sidebar: sidebarZh,
    repo: 'https://github.com/qiuxchao',
    editLinkText: '编辑此页',
    lastUpdatedText: '最近更新时间',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
  }),

  // 插件
  plugins: [
    sitemapPlugin({
      hostname: "https://qiuxc.cn",
    }),
    googleAnalyticsPlugin({
      id: 'G-KEP9J329HR'
    }),
  ]
})