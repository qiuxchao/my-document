/*
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-12 15:32:23
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-15 19:53:19
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
				'/frontend/javascript/dependency_injection.md',
				'/frontend/javascript/reg_grammar.md',
				{
					text: 'JavaScript 高级程序设计——读书笔记',
					link: '/frontend/javascript/js_basic/history.md',
					children: [
						'/frontend/javascript/js_basic/history.md',
						'/frontend/javascript/js_basic/version.md'
					]
				},
			],
		},
		{
			text: 'Css',
			collapsible: true,
			children: [
				'/frontend/css/vw_vh.md',
				'/frontend/css/flexible.md',
				'/frontend/css/miniprogram_scroll_notice.md',
				'/frontend/css/flex.md',
				'/frontend/css/grid.md',
				'/frontend/css/some_example.md',
			],
		},
		{
			text: 'React',
			collapsible: true,
			children: [
				'/frontend/react/react_redux.md',
				'/frontend/react/react_router_dom.md',
				'/frontend/react/react_source_read.md',
				'/frontend/react/hooks.md',
				'/frontend/react/next.md',
				'/frontend/react/hole.md',
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
				'/frontend/network/websockets.md',
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
		{
			text: 'Canvas',
			collapsible: true,
			children: [
				'/frontend/canvas/',
			],
		},
		{
			text: 'Typescript',
			collapsible: true,
			children: [
				'/frontend/typescript/',
				'/frontend/typescript/exercise.md'
			],
		},
		'/frontend/rollup.md',
		'/frontend/jquery.md',
		'/frontend/bgw.md',
	],
	'/backend/': [
		{
			text: 'NodeJs',
			collapsible: true,
			children: [
				'/backend/nodejs/commonjs.md',
				'/backend/nodejs/npm.md',
				'/backend/nodejs/npm_yarn_source.md',
				'/backend/nodejs/pnpm.md',
				'/backend/nodejs/fs.md',
				'/backend/nodejs/path.md',
				'/backend/nodejs/os.md',
				'/backend/nodejs/url.md',
				'/backend/nodejs/http.md',
				'/backend/nodejs/events.md',
				'/backend/nodejs/express.md',
				'/backend/nodejs/koa.md',
				'/backend/nodejs/cheerio.md',
				'/backend/nodejs/upload_img.md',
				'/backend/nodejs/yargs.md',
				'/backend/nodejs/axios.md',
				'/backend/nodejs/shelljs.md',
				'/backend/nodejs/husky.md',
				'/backend/nodejs/playwright.md',
				'/backend/nodejs/mongoose.md',
			],
		},
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
				'/backend/python/venv.md',
				'/backend/python/decorators.md',
			],
		},
		{
			text: 'Java',
			collapsible: true,
			children: [
				'/backend/java/basic.md',
				'/backend/java/oop.md',
			],
		},
		'/backend/php/',
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
				'/operation/redis.md',
				'/operation/mongodb.md',
			],
		},
	],
	'/tools/': [
		'/tools/navigation.md',
		{
			text: 'Git',
			children: [
				'/tools/git/',
				'/tools/git/git_tag.md',
				'/tools/git/logogram.md',
				'/tools/git/js_delivr.md',
				'/tools/git/some_lore.md',
				'/tools/git/semantic_versions.md',
			],
		},
		{
			text: 'IDE',
			children: [
				'/tools/ide/vscode_plugins.md',
				'/tools/ide/vscode_setting.md',
				'/tools/ide/eslint.md',
			],
		},
	],
	'/share/': [
		{
			text: '技术分享',
			children: [
				'/share/code_review.md',
				'/share/chrome_extensions.md',
				'/share/specification.md',
				'/share/vuepress_blog.md',
			],
		},
	],
}
