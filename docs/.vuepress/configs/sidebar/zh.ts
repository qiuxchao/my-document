/*
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-12 15:32:23
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-12 17:40:18
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/frontend/': [
    {
      text: 'JavaScript',
      collapsible: true,
      children: [
        '/frontend/javascript/es6+.md',
        '/frontend/javascript/event_loop.md',
        '/frontend/javascript/promise.md',
        '/frontend/javascript/module.md',
      ],
    },
    {
      text: 'React',
      collapsible: true,
      children: [
        '/frontend/react/react_redux.md',
        '/frontend/react/react_router_dom.md',
      ],
    },
    {
      text: 'Webpack',
      collapsible: true,
      children: [
        '/frontend/webpack/summary.md',
        '/frontend/webpack/tapable_module.md',
      ],
    },
    {
      text: '网络',
      collapsible: true,
      children: [
        '/frontend/network/http.md',
        '/frontend/network/ajax.md',
      ],
    },
    {
      text: '算法',
      collapsible: true,
      children: [
        '/frontend/algorithm/sort_search.md',
        '/frontend/algorithm/linear.md',
        '/frontend/algorithm/tree.md',
        '/frontend/algorithm/graph.md',
        '/frontend/algorithm/greed_dynamic.md',
      ],
    },
    '/frontend/typescript.md',
    '/frontend/jquery.md',
  ],
  '/backend/': [
    {
      text: 'Python',
      collapsible: true,
      children: [
        '/backend/python/01_str_num.md',
        '/backend/python/02_list_for.md',
        '/backend/python/03_if.md',
        '/backend/python/04_input_while.md',
        '/backend/python/05_tuple.md',
        '/backend/python/06_dict.md',
        '/backend/python/07_def.md',
        '/backend/python/08_format.md',
        '/backend/python/09_encode_decode.md',
      ],
    },
    {
      text: 'NodeJs',
      collapsible: true,
      children: [
        '/backend/nodejs/npm_yarn.md',
        '/backend/nodejs/koa.md',
      ],
    },
  ],
  '/operation/': [
    {
      text: '运维技术',
      children: [
        '/operation/linux.md',
        '/operation/nginx.md',
        '/operation/ssl_ci.md',
        '/operation/gitlab.md',
        '/operation/jenkins.md',
      ],
    },
  ],
  '/tools/': [
    {
      text: '工具',
      children: [
        '/tools/git.md',
      ],
    },
  ],
  '/share/': [
    {
      text: '技术分享',
      children: [
        '/share/code_review.md',
      ],
    },
  ],
}