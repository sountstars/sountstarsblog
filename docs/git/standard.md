# git常用规范

[[TOC]]

## 分支
+ **master**分支为主分支（保护分支），不能直接在master上进行修改代码或提交,通过**MR**(merge Request)或者**PR**(pull Request)的方式进行提交。
+ **preview**分支为预发分支， 所有测试完成需要上线的功能合并到该分支
+ **develop、 test**分支为测试分支，所有开发完成需要提交测试的功能合并到该分支
+ **feature/xxx**分支为功能开发分支，根据不同需求创建独立的功能分支，开发完成后合并到develop或test分支
+ **hotfix**分支为bug修复分支，需要根据实际情况对已发布的版本进行漏洞修复

## Tag  
+ 架构升级或架构重大调整，修改第1位
+ 新功能上线或者模块大的调整，修改第2位
+ bug修复上线，修改第3位

## Commit message的格式
+ feat：新功能（feature）
+ fix：修补bug
+ docs：文档（documentation）
+ style： 格式（不影响代码运行的变动）
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）
+ test：增加测试
  
## git commit(emoji)
commit时添加 emoji 表情的提交记录能包含很多有用信息，提升阅读体验
|emoji|	emoji 代码|commit 说明| 
|  -- | --| -- |
|:tada: (庆祝) | `:tada:`| 初次提交|
|:bug: (bug) | `:bug:`| 修复 bug|
|:memo: (备忘录) | `:memo:`| 撰写文档|
|:art: (调色板)	|`:art:`|	改进代码结构/代码格式|
|:zap: (闪电):racehorse: (赛马)|	`:zap:“:racehorse:`	|提升性能|
|:fire: (火焰)	|`:fire:`|	移除代码或文件|
|:ambulance: (急救车)|`	:ambulance:	`|重要补丁|
|:sparkles: (火花)|`	:sparkles:`|	引入新功能|
|:rocket: (火箭)|`	:rocket:`|	部署功能|
|:lipstick: (口红)|`	:lipstick:`|	更新 UI 和样式文件|
|:white_check_mark: (白色复选框)|`	:white_check_mark:`|	增加测试|
|:lock: (锁)	|`:lock:`|	修复安全问题|
|:apple: (苹果)	|`:apple:	`|修复 macOS 下的问题|
|:penguin: (企鹅)|`	:penguin:`|	修复 Linux 下的问题|
|:checkered_flag: (旗帜)|`	:checked_flag:`|	修复 Windows 下的问题|
|:bookmark: (书签)|`	:bookmark:`|	发行/版本标签|
|:rotating_light: (警车灯)|`	:rotating_light:`|	移除 linter 警告|
|:construction: (施工)|`	:construction:`|	工作进行中|
|:green_heart: (绿心)	|`:green_heart:`|	修复 CI 构建问题|
|:arrow_down: (下降箭头)	|`:arrow_down:`|	降级依赖|
|:arrow_up: (上升箭头)|`	:arrow_up:`|	升级依赖|
|:construction_worker: (工人)	|`:construction_worker:`|	添加 CI 构建系统|
|:chart_with_upwards_trend: (上升趋势图)|`	:chart_with_upwards_trend:`|	添加分析或跟踪代码|
|:hammer: (锤子)|`	:hammer:`|	重大重构|
|:heavy_minus_sign: (减号)|`	:heavy_minus_sign:`|	减少一个依赖|
|:whale: (鲸鱼)	|`:whale:`|	Docker 相关工作|
|:heavy_plus_sign: (加号)	|`:heavy_plug_sign:	`|增加一个依赖|
|:wrench: (扳手)|`	:wrench:	`|修改配置文件|
|:globe_with_meridians: (地球)|`	:globe_with_meridians:`|	国际化与本地化|
|:pencil2: (铅笔)|`	:pencil2:`|	修复 typo|





