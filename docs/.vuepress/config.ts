/*
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-06-17 16:21:48
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-11 14:35:02
 */
import { defaultTheme, defineUserConfig } from "vuepress";

export default defineUserConfig({
  base: '/document/',
  lang: 'zh-CN',
  title: '湫的碎碎念',
  description: '记录学习',
  head: [['link', { rel: 'icon', href: '/images/head.jpg' }]],

  // Dev 配置项
  open: true,

  // 主题配置
  theme: defaultTheme({
    logo: '/images/head.jpg',
    navbar: [
      {
        text: '前端技术',
        children: [],
      },
      {
        text: '后端技术',
        children: [],
      },
      {
        text: '运维技术',
        children: ['/operation/nginx.md', '/operation/ssl_ci.md', '/operation/gitlab.md', '/operation/linux.md'],
      },
      {
        text: '技术分享',
        children: ['/share/code_review.md'],
      },
    ],
    repo: 'https://github.com/qiuxchao',
    editLinkText: '编辑此页',
    lastUpdatedText: '最近更新时间',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
  }),
})