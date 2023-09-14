<a name="puI5X"></a>

# 环境及开发工具配置

![image.png](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694573699756-f32aeb0c-9f5b-4224-9ec9-bf985f1cabe2.png#averageHue=%23edf6f8&clientId=uf587ae3f-b2f2-4&from=paste&height=490&id=u522cd985&originHeight=490&originWidth=757&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137038&status=done&style=none&taskId=u5ba43fad-5993-4370-b67e-da4df7313f3&title=&width=757)
<a name="42274520"></a>

### Chrome 插件

这里给大家一个清单列表，都是我经常使用的：

- [FeHelper(前端助手)](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Ffehelper%E5%89%8D%E7%AB%AF%E5%8A%A9%E6%89%8B%2Fpkgccpejnmalmdinmhkkfafefagiiiad%3Futm_source%3Dchrome-ntp-icon)。这个我个人觉得前端必备。JSON自动格式化、手动格式化，支持排序、解码、下载等，更多功能可在配置页按需安装 
- [Octotree - GitHub code tree](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Foctotree-github-code-tree%2Fbkhaagjahfmjljalopjnoealnfndnagc%3Futm_source%3Dchrome-ntp-icon)。方便我们查看 `Github` 代码 
- [SpanTree - GitLab Tree](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fspantree-gitlab-tree%2Fgcjikeldobhnaglcoaejmdlmbienoocg%3Futm_source%3Dchrome-ntp-icon)。方便我们查看 `Gitlab` 代码，（吐槽一下，我们的 `Gitlab` 有时候实在太慢了） 
- [React Developer Tools](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%3Futm_source%3Dchrome-ntp-icon)。React 开发者必备 
- [Vue.js devtools](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fvuejs-devtools%2Fnhdogjmejiglipccpnnnanhbledajbpd%3Futm_source%3Dchrome-ntp-icon)。Vue 开发者必备 
- [掘金](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2F%E6%8E%98%E9%87%91%2Flecdifefmmfjnjjinhaennhdlmcaeeeb%3Futm_source%3Dchrome-ntp-icon)。逛社区 
- [沙拉查词-聚合词典划词翻译](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2F%E6%B2%99%E6%8B%89%E6%9F%A5%E8%AF%8D-%E8%81%9A%E5%90%88%E8%AF%8D%E5%85%B8%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91%2Fcdonnmffkdaoajfknoeeecmchibpmkmg%3Futm_source%3Dchrome-ntp-icon)。翻译用 
  <a name="Node.js"></a>

### Node.js安装

- 安装 `Node.js`,可以直接通过[官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fnodejs.org%2Fen%2F)进行下载安装。
  <a name="fx7SJ"></a>

### 管理 npm 源

工作中，我们通常需要切换到淘宝或者公司的 npm 源，推荐使用 nrm 管理你的 npm 源。<br />安装：

```
bash
复制代码npm install -g nrm
```

**常见命令**<br />列出可选择的源:

```
bash
复制代码nrm ls
```

<a name="cml6L"></a>

### Node.js版本管理

<br />下载完 `Node.js` 就有 `npm` 了。可以统一用 `nvm` 进行包管理： 

```
npm i nvm -g
```

<br />安装指定版本，可模糊安装，如：安装 `v4.4.0`，既可 `$ nvm install v4.4.0`，又可 `$ nvm install 4.4` <br />删除已安装的指定版本，语法与 `install` 用法一致 <br />切换使用指定的版本 `node` <br />`注意`：在任意一个命令行窗口进行切换之后，其他的窗口或其他命令行工具窗口 `需要关掉工具，重启才能生效`。（例如 `VSCode` 内或外部命令切换之后，需要重启 `VSCode`，才能正常生效，否则或处于 `临时生效状态`，也就是在 `VSCode` 中重新打开一个命令行查看版本还会是旧版本，所以必须要重启。）<br />这里的 `重启` 不是简单的关掉窗口重启，没有退出后台进程，而是完全退出杀死工具进程，重新启动。<br />`列出所有安装的版本`

```
nvm ls
```

<a name="BZorB"></a>

## 开发工具

<a name="kWVjj"></a>

### VScode 以及插件

说到 Vscode，就需要提到 Vscode 的插件。网上应该有非常多的推荐，这里就列几个个人用得比较多的。

- [Chinese (Simplified) Language Pack for Visual Studio Code](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DMS-CEINTL.vscode-language-pack-zh-hans)。适用于 VS Code 的中文（简体）语言包
- [Code Spell Checker](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstreetsidesoftware.code-spell-checker)。拼写检查
- [Git History](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddonjayamanne.githistory)。查看 Git 历史
- [GitLens — Git supercharged](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Deamodio.gitlens)。Git 功能增强，使用 Git 的必备插件
- [Live Server](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dritwickdey.LiveServer)。方便你快速在本地起一个服务
- [Markdown All in One](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dyzhang.markdown-all-in-one)。markdown 功能增强
- [TODO Highlight](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dwayou.vscode-todo-highlight)。添加 TODO 高亮
- [Vetur](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Doctref.vetur)。Vue 开发者必备
- [Tabnine](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DTabNine.tabnine-vscode)。AI 帮助你更快编程（比如智能化提示）

最后重点介绍一个 Vscode 插件——[Settings Sync](https://link.juejin.cn?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DShan.code-settings-sync)。假如你已经在一台电脑中配置好了 Vscode。你完全可以将配置上传到远程账号，然后你用新的电脑，只需要登录该账号，通过一些配置，就可以全部同步过来即可，这对于新人入职一家新的公司，非常方便。
<a name="stQdH"></a>

### Git

下载安装，可以通过上面提到的 Homebrew 安装：

```
bash
复制代码brew install git
```

设置用户名和邮箱<br />创建 SSH key<br />成功的话会在 ~/ 下生成 .ssh 文件夹，进去，打开 id_rsa.pub，复制里面的 key。也可以通过终端查看：<br />复制内容，并粘贴到 Github 和 Gitlab 中设置的 SSH 中即可。
<a name="bC3aU"></a>

### <br />

<a name="tbWIb"></a>

### [SwitchHosts](https://github.com/oldj/SwitchHosts/releases)

SwitchHosts是一款管理hosts文件的利器：<br />![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694574079170-7e4dba4f-cb1a-41f8-ba79-ec277bb412b4.webp#averageHue=%23d5e9d5&clientId=uf587ae3f-b2f2-4&from=paste&id=ua39aaf15&originHeight=450&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue8dc23ad-89d9-451b-bae4-c82d09d67a4&title=)<br />在此之前，我们修改hosts需要经历以下几个步骤：

- 找到hosts文件
- 从一长串内容里查找修改项目
- 有权限问题还需复制替换文件

当你的工作严重依赖hosts，或者需要分类管理时，值得体验下SwitchHosts!。<br />它有以下几个特点：

- 跨平台支持
- 语法高亮显示
- 支持分类组合
- 支持远程hosts
- 系统菜单栏快速切换
- 导入导出
- Alfred workflow（macOS）
  <a name="PfMDK"></a>

### 代理工具

whistle 是基于 Node 实现的跨平台 web 调试代理工具。whistle 是一个 web 调试代理工具，它的功能十分强大。作为一名前端，我们需要经常跟协议中的应用层打交道，Mock 数据、跨域问题、cookie 的修改、移动端调试等等，都是我们必备的技能，而 whistle 就能解决其中 90% 的问题。<br />个人经常使用的一些场景如下：

- 绑定 Host
- 替换请求（Mock 数据）
- 使用 Weinre 或者 vConsole 调试移动端页面
- 修改 cookie
- 往 HTML 中插入样式
- 往 HTML 中插入脚本 ...

详情可以看这篇文章——[前端应该知道的web调试工具——whistle](https://juejin.cn/post/6861882596927504392)
<a name="pzxXB"></a>

### Charles

charles手机抓包教程
<a name="aukk3"></a>

#### 一、设置系统代理

![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574236552-8285057f-e20b-4a29-a8ba-13d1db787ff5.png#averageHue=%23f1eeec&clientId=uf587ae3f-b2f2-4&from=paste&id=u5c8bef67&originHeight=404&originWidth=327&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u92791a79-6fa4-490e-8924-86f4a454b6f&title=)
<a name="oTfX7"></a>

#### 二、电脑端安装证书

![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574245242-c3dabb92-5ee8-42dc-996c-aab0a8fdecaa.png#averageHue=%23f3f3f2&clientId=uf587ae3f-b2f2-4&from=paste&id=u3d254fdd&originHeight=340&originWidth=756&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0059574b-9c1b-438a-9f73-ea6af3b147b&title=)<br />安装的时候就注意证书放在“受信任的证书委发机构”就行，其他的都是点下一步<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574256906-929e9ed7-9533-48f5-8db4-2bad142969f1.png#averageHue=%23f8f7f6&clientId=uf587ae3f-b2f2-4&from=paste&id=ub3cca910&originHeight=464&originWidth=337&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue3e4662a-fb64-4b0b-af96-ed2a7088e22&title=)

<a name="aOFcs"></a>

#### 三、设置代理

![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574265353-a4e4d75f-2bc2-4dc2-9884-6520cb5bf0c5.png#averageHue=%23eeebea&clientId=uf587ae3f-b2f2-4&from=paste&id=ub38acf0b&originHeight=304&originWidth=356&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u52e22480-9f26-459b-b92f-e1f86b4fb50&title=)

<a name="T1WGH"></a>

#### 四、设置手机上的代理

让手机和电脑保持连接同一个wifi<br />先查看电脑端的地址<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574283110-a1c2ce4d-371b-4055-820e-e14dac31c9a8.png#averageHue=%23f4f0ef&clientId=uf587ae3f-b2f2-4&from=paste&id=u79200978&originHeight=312&originWidth=435&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u40856b9e-2f0c-4b47-92b0-e728504b136&title=)<br />再设置手机代理（以苹果手机为例）<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/27056598/1694574292429-5a4ca0f5-0655-4ad8-a30f-7f996f8e1643.jpeg#averageHue=%232f4f30&clientId=uf587ae3f-b2f2-4&from=paste&id=ub556c4b0&originHeight=900&originWidth=1277&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uda5f1ace-cd6c-477a-b017-988c44bf351&title=)<br />设置保存完成后，charles界面会弹出一个连接请求框，点击“Allow”（如果没有弹窗，就关闭charles，重启，手机端重新连接试试）<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574299614-7ae4c00b-b913-4e37-ac91-638d2d8255f5.png#averageHue=%23e8e3e1&clientId=uf587ae3f-b2f2-4&from=paste&id=u4e0508ec&originHeight=153&originWidth=549&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5296fd41-c2da-4d65-a0da-2b10159b1e6&title=)<br />如果不小心点击了 拒绝（Deny），依次点击： Proxy -> Access Control Settings 进行添加你的手机IP<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574305432-0925bb84-e73e-4d27-b764-3ba1f00ac973.png#averageHue=%23ede9e7&clientId=uf587ae3f-b2f2-4&from=paste&id=u1056c0a3&originHeight=540&originWidth=437&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u64d298ce-c8c7-4f17-ad04-8f49a3062d3&title=)<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574315992-e691635e-78c9-4794-bb35-98c6ea142f6c.png#averageHue=%23f0eeed&clientId=uf587ae3f-b2f2-4&from=paste&id=u13e44df0&originHeight=458&originWidth=538&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0637be3f-cf8e-4262-bfba-95ca4096046&title=)
<a name="BnOuI"></a>

#### 五、手机端下载证书、安装、信任

<a name="ZH5sN"></a>

##### 1、下载

查看下载证书地址<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574326197-e491ebfe-5b4b-4332-90b4-bb0396268fb9.png#averageHue=%23f1f0f0&clientId=uf587ae3f-b2f2-4&from=paste&id=u2092b25b&originHeight=411&originWidth=912&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3e1e1dde-f452-47fe-828b-b03b93c0620&title=)<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574334616-1abcf51d-a2a5-4f92-a6a9-638a444956b2.png#averageHue=%23ebe8e7&clientId=uf587ae3f-b2f2-4&from=paste&id=u33e5dc09&originHeight=173&originWidth=554&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8e155d03-7e8a-4831-9831-b761ead3289&title=)<br />打开手机浏览器，访问划红线处的地址<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/27056598/1694574341123-4bd53b2f-c9a1-40ad-bcfc-7335c24b385c.jpeg#averageHue=%2361605f&clientId=uf587ae3f-b2f2-4&from=paste&id=uf3aaffbc&originHeight=907&originWidth=1273&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7fd5cfe4-2038-4997-bf46-56d372c2256&title=)
<a name="DYvNg"></a>

##### 2、安装

打开手机设置，安装刚刚下载的文件<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574347352-f290975f-9eb3-4191-8622-00a8fc83cd50.png#averageHue=%23616f84&clientId=uf587ae3f-b2f2-4&from=paste&id=u9669e6df&originHeight=811&originWidth=765&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uea76af3b-db11-4ca3-ac6a-c6aa24399a6&title=)

<a name="mHpXu"></a>

##### 3、设置信任

打开手机设置–通用–关于本机，滑到底部<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/27056598/1694574353318-4999816d-2de8-421a-a1e4-4dd25af6a214.jpeg#averageHue=%2349854c&clientId=uf587ae3f-b2f2-4&from=paste&id=uf8b12ff8&originHeight=905&originWidth=840&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3cc420e6-75f8-48e1-a61c-8078be3a3a6&title=)<br />用手机打开浏览器访问任意地址就可以看到charles抓到的数据啦<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574362669-db428c29-13b4-4f79-8fad-b5ccc04727b2.png#averageHue=%23f8f6f5&clientId=uf587ae3f-b2f2-4&from=paste&id=ub0d02a0a&originHeight=737&originWidth=614&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=udb753a77-fd70-4f27-a3f6-178edf625b7&title=)<br />至此就完成charles和手机的链接了。

<a name="DELns"></a>

#### 六、设置抓取固定地址信息

抓包的信息太多太杂，只想查看固定地址的信息
<a name="u9sEW"></a>

##### 方法一： 在Filter一栏输入要抓取的地址

![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574395635-943553fb-0be8-462e-84e9-69da88b2b805.png#averageHue=%23faf8f7&clientId=uf587ae3f-b2f2-4&from=paste&id=u0c360d27&originHeight=1034&originWidth=610&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u56429bc9-d48d-40ca-9c62-758005c3ce5&title=)<br />例：baidu

<a name="HIXtf"></a>

##### 方法二：手动设置过滤

![](https://cdn.nlark.com/yuque/0/2023/jpeg/27056598/1694574409162-e51a1e09-020d-4785-9388-e79de6ff870a.jpeg#averageHue=%23f5f3f2&clientId=uf587ae3f-b2f2-4&from=paste&id=u2a3f701f&originHeight=580&originWidth=1018&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uaa904851-5261-47e0-9715-fc9025286e5&title=)<br />![](https://cdn.nlark.com/yuque/0/2023/png/27056598/1694574415391-b6ff9041-d07a-4f23-9c93-4c7c20c6c62c.png#averageHue=%23f0f0ef&clientId=uf587ae3f-b2f2-4&from=paste&id=u2d90cdf4&originHeight=370&originWidth=556&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6e542172-3ccd-4afd-a724-29de35c0efd&title=)
<a name="cpALP"></a>

# 内部技术文档

<a name="ae0ae"></a>

## [低代码技术平台文档](https://hi03e5v749.feishu.cn/docx/H44idQcoqo8Cp0xeze7cOLFHnqd)

<a name="LMydS"></a>

## [Pinia 快速上手指南](https://www.yuque.com/jiajunwei-18qww/uazcg1/rvv7v2pf38v0cfqn)

<a name="mnt37"></a>

## [Vuex快速上手指南](https://www.yuque.com/jiajunwei-18qww/uazcg1/wq96grqaa90ohc5k)

<a name="hB3K9"></a>

## [Git常用命令](https://www.yuque.com/jiajunwei-18qww/uazcg1/lr6vk4v3a3htfown)

<a name="f5CuY"></a>

## [Vue-Router快速上手指南](https://www.yuque.com/jiajunwei-18qww/uazcg1/tkazdayr1ghl5rm8)

<a name="iGJlJ"></a>

## [Electron快速上手指南](https://www.yuque.com/jiajunwei-18qww/uazcg1/fxvsocggy5iqbitp)

<a name="rfiuQ"></a>

## [NestJs快速上手指南](https://www.yuque.com/jiajunwei-18qww/uazcg1/gzkw2uwtusl77gqr)



