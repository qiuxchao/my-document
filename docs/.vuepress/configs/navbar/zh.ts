/*
 * @Descripttion:
 * @version:
 * @Author: qiuxchao
 * @Date: 2022-07-12 15:32:23
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-05 10:27:42
 */
import type { NavbarConfig } from '@vuepress/theme-default';

export const navbarZh: NavbarConfig = [
	{
		text: '前端技术',
		children: [
			{
				text: 'JavaScript',
				link: '/frontend/javascript/es6+.md',
			},
			{
				text: 'Css',
				link: '/frontend/css/vw_vh.md',
			},
			{
				text: 'React',
				link: '/frontend/react/react_redux.md',
			},
			{
				text: 'Webpack',
				link: '/frontend/webpack/summary.md',
			},
			{
				text: '网络',
				link: '/frontend/network/http.md',
			},
			{
				text: '算法',
				link: '/frontend/algorithm/sort_search.md',
			},
			{
				text: 'Canvas',
				link: '/frontend/canvas/',
			},
			{
				text: 'Typescript',
				link: '/frontend/typescript/',
			},
			'/frontend/babel.md',
			'/frontend/rollup.md',
			'/frontend/monorepo_proj_create.md',
			'/frontend/cache.md',
			// '/frontend/jquery.md',
			// '/frontend/bgw.md',
		],
	},
	{
		text: '后端技术',
		children: [
			{
				text: 'NodeJs',
				link: '/backend/nodejs/commonjs.md',
			},
			{
				text: 'Python',
				link: '/backend/python/01_str_num.md',
			},
			{
				text: 'Java',
				link: '/backend/java/basic.md',
			},
			'/backend/php/',
		],
	},
	{
		text: '运维技术',
		children: [
			'/operation/linux.md',
			'/operation/nginx.md',
			'/operation/ssl_ci.md',
			'/operation/gitlab.md',
			'/operation/jenkins.md',
			'/operation/redis.md',
			'/operation/mongodb.md',
		],
	},
	{
		text: '工具',
		children: [
			{
				text: '🧭工具、软件、网址导航',
				link: '/tools/navigation.md',
			},
			{
				text: 'Git',
				link: '/tools/git/',
			},
			{
				text: 'IDE',
				link: '/tools/ide/vscode_plugins.md',
			},
			{
				text: '操作系统',
				link: '/tools/system/mac/',
			},
		],
	},
	{
		text: '技术分享',
		children: ['/share/code_review.md', '/share/chrome_extensions.md'],
	},
];
