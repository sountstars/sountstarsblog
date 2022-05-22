(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{433:function(_,t,v){"use strict";v.r(t);var d=v(46),e=Object(d.a)({},(function(){var _=this,t=_.$createElement,v=_._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"git常用规范"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#git常用规范"}},[_._v("#")]),_._v(" git常用规范")]),_._v(" "),v("p"),v("div",{staticClass:"table-of-contents"},[v("ul",[v("li",[v("a",{attrs:{href:"#分支"}},[_._v("分支")])]),v("li",[v("a",{attrs:{href:"#tag"}},[_._v("Tag")])]),v("li",[v("a",{attrs:{href:"#commit-message的格式"}},[_._v("Commit message的格式")])]),v("li",[v("a",{attrs:{href:"#git-commit-emoji"}},[_._v("git commit(emoji)")])])])]),v("p"),_._v(" "),v("h2",{attrs:{id:"分支"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分支"}},[_._v("#")]),_._v(" 分支")]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("master")]),_._v("分支为主分支（保护分支），不能直接在master上进行修改代码或提交,通过"),v("strong",[_._v("MR")]),_._v("(merge Request)或者"),v("strong",[_._v("PR")]),_._v("(pull Request)的方式进行提交。")]),_._v(" "),v("li",[v("strong",[_._v("preview")]),_._v("分支为预发分支， 所有测试完成需要上线的功能合并到该分支")]),_._v(" "),v("li",[v("strong",[_._v("develop、 test")]),_._v("分支为测试分支，所有开发完成需要提交测试的功能合并到该分支")]),_._v(" "),v("li",[v("strong",[_._v("feature/xxx")]),_._v("分支为功能开发分支，根据不同需求创建独立的功能分支，开发完成后合并到develop或test分支")]),_._v(" "),v("li",[v("strong",[_._v("hotfix")]),_._v("分支为bug修复分支，需要根据实际情况对已发布的版本进行漏洞修复")])]),_._v(" "),v("h2",{attrs:{id:"tag"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tag"}},[_._v("#")]),_._v(" Tag")]),_._v(" "),v("ul",[v("li",[_._v("架构升级或架构重大调整，修改第1位")]),_._v(" "),v("li",[_._v("新功能上线或者模块大的调整，修改第2位")]),_._v(" "),v("li",[_._v("bug修复上线，修改第3位")])]),_._v(" "),v("h2",{attrs:{id:"commit-message的格式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#commit-message的格式"}},[_._v("#")]),_._v(" Commit message的格式")]),_._v(" "),v("ul",[v("li",[_._v("feat：新功能（feature）")]),_._v(" "),v("li",[_._v("fix：修补bug")]),_._v(" "),v("li",[_._v("docs：文档（documentation）")]),_._v(" "),v("li",[_._v("style： 格式（不影响代码运行的变动）")]),_._v(" "),v("li",[_._v("refactor：重构（即不是新增功能，也不是修改bug的代码变动）")]),_._v(" "),v("li",[_._v("test：增加测试")])]),_._v(" "),v("h2",{attrs:{id:"git-commit-emoji"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#git-commit-emoji"}},[_._v("#")]),_._v(" git commit(emoji)")]),_._v(" "),v("p",[_._v("commit时添加 emoji 表情的提交记录能包含很多有用信息，提升阅读体验")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("emoji")]),_._v(" "),v("th",[_._v("emoji 代码")]),_._v(" "),v("th",[_._v("commit 说明")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("🎉 (庆祝)")]),_._v(" "),v("td",[v("code",[_._v(":tada:")])]),_._v(" "),v("td",[_._v("初次提交")])]),_._v(" "),v("tr",[v("td",[_._v("🐛 (bug)")]),_._v(" "),v("td",[v("code",[_._v(":bug:")])]),_._v(" "),v("td",[_._v("修复 bug")])]),_._v(" "),v("tr",[v("td",[_._v("📝 (备忘录)")]),_._v(" "),v("td",[v("code",[_._v(":memo:")])]),_._v(" "),v("td",[_._v("撰写文档")])]),_._v(" "),v("tr",[v("td",[_._v("🎨 (调色板)")]),_._v(" "),v("td",[v("code",[_._v(":art:")])]),_._v(" "),v("td",[_._v("改进代码结构/代码格式")])]),_._v(" "),v("tr",[v("td",[_._v("⚡️ (闪电)🐎 (赛马)")]),_._v(" "),v("td",[v("code",[_._v(":zap:“:racehorse:")])]),_._v(" "),v("td",[_._v("提升性能")])]),_._v(" "),v("tr",[v("td",[_._v("🔥 (火焰)")]),_._v(" "),v("td",[v("code",[_._v(":fire:")])]),_._v(" "),v("td",[_._v("移除代码或文件")])]),_._v(" "),v("tr",[v("td",[_._v("🚑 (急救车)")]),_._v(" "),v("td",[v("code",[_._v(":ambulance:")])]),_._v(" "),v("td",[_._v("重要补丁")])]),_._v(" "),v("tr",[v("td",[_._v("✨ (火花)")]),_._v(" "),v("td",[v("code",[_._v(":sparkles:")])]),_._v(" "),v("td",[_._v("引入新功能")])]),_._v(" "),v("tr",[v("td",[_._v("🚀 (火箭)")]),_._v(" "),v("td",[v("code",[_._v(":rocket:")])]),_._v(" "),v("td",[_._v("部署功能")])]),_._v(" "),v("tr",[v("td",[_._v("💄 (口红)")]),_._v(" "),v("td",[v("code",[_._v(":lipstick:")])]),_._v(" "),v("td",[_._v("更新 UI 和样式文件")])]),_._v(" "),v("tr",[v("td",[_._v("✅ (白色复选框)")]),_._v(" "),v("td",[v("code",[_._v(":white_check_mark:")])]),_._v(" "),v("td",[_._v("增加测试")])]),_._v(" "),v("tr",[v("td",[_._v("🔒 (锁)")]),_._v(" "),v("td",[v("code",[_._v(":lock:")])]),_._v(" "),v("td",[_._v("修复安全问题")])]),_._v(" "),v("tr",[v("td",[_._v("🍎 (苹果)")]),_._v(" "),v("td",[v("code",[_._v(":apple:")])]),_._v(" "),v("td",[_._v("修复 macOS 下的问题")])]),_._v(" "),v("tr",[v("td",[_._v("🐧 (企鹅)")]),_._v(" "),v("td",[v("code",[_._v(":penguin:")])]),_._v(" "),v("td",[_._v("修复 Linux 下的问题")])]),_._v(" "),v("tr",[v("td",[_._v("🏁 (旗帜)")]),_._v(" "),v("td",[v("code",[_._v(":checked_flag:")])]),_._v(" "),v("td",[_._v("修复 Windows 下的问题")])]),_._v(" "),v("tr",[v("td",[_._v("🔖 (书签)")]),_._v(" "),v("td",[v("code",[_._v(":bookmark:")])]),_._v(" "),v("td",[_._v("发行/版本标签")])]),_._v(" "),v("tr",[v("td",[_._v("🚨 (警车灯)")]),_._v(" "),v("td",[v("code",[_._v(":rotating_light:")])]),_._v(" "),v("td",[_._v("移除 linter 警告")])]),_._v(" "),v("tr",[v("td",[_._v("🚧 (施工)")]),_._v(" "),v("td",[v("code",[_._v(":construction:")])]),_._v(" "),v("td",[_._v("工作进行中")])]),_._v(" "),v("tr",[v("td",[_._v("💚 (绿心)")]),_._v(" "),v("td",[v("code",[_._v(":green_heart:")])]),_._v(" "),v("td",[_._v("修复 CI 构建问题")])]),_._v(" "),v("tr",[v("td",[_._v("⬇️ (下降箭头)")]),_._v(" "),v("td",[v("code",[_._v(":arrow_down:")])]),_._v(" "),v("td",[_._v("降级依赖")])]),_._v(" "),v("tr",[v("td",[_._v("⬆️ (上升箭头)")]),_._v(" "),v("td",[v("code",[_._v(":arrow_up:")])]),_._v(" "),v("td",[_._v("升级依赖")])]),_._v(" "),v("tr",[v("td",[_._v("👷 (工人)")]),_._v(" "),v("td",[v("code",[_._v(":construction_worker:")])]),_._v(" "),v("td",[_._v("添加 CI 构建系统")])]),_._v(" "),v("tr",[v("td",[_._v("📈 (上升趋势图)")]),_._v(" "),v("td",[v("code",[_._v(":chart_with_upwards_trend:")])]),_._v(" "),v("td",[_._v("添加分析或跟踪代码")])]),_._v(" "),v("tr",[v("td",[_._v("🔨 (锤子)")]),_._v(" "),v("td",[v("code",[_._v(":hammer:")])]),_._v(" "),v("td",[_._v("重大重构")])]),_._v(" "),v("tr",[v("td",[_._v("➖ (减号)")]),_._v(" "),v("td",[v("code",[_._v(":heavy_minus_sign:")])]),_._v(" "),v("td",[_._v("减少一个依赖")])]),_._v(" "),v("tr",[v("td",[_._v("🐳 (鲸鱼)")]),_._v(" "),v("td",[v("code",[_._v(":whale:")])]),_._v(" "),v("td",[_._v("Docker 相关工作")])]),_._v(" "),v("tr",[v("td",[_._v("➕ (加号)")]),_._v(" "),v("td",[v("code",[_._v(":heavy_plug_sign:")])]),_._v(" "),v("td",[_._v("增加一个依赖")])]),_._v(" "),v("tr",[v("td",[_._v("🔧 (扳手)")]),_._v(" "),v("td",[v("code",[_._v(":wrench:")])]),_._v(" "),v("td",[_._v("修改配置文件")])]),_._v(" "),v("tr",[v("td",[_._v("🌐 (地球)")]),_._v(" "),v("td",[v("code",[_._v(":globe_with_meridians:")])]),_._v(" "),v("td",[_._v("国际化与本地化")])]),_._v(" "),v("tr",[v("td",[_._v("✏️ (铅笔)")]),_._v(" "),v("td",[v("code",[_._v(":pencil2:")])]),_._v(" "),v("td",[_._v("修复 typo")])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);