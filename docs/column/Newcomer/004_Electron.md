# 启动electron
## 一、安装electron跟vite-plugin-electron插件

```
cmd
复制代码pnpm add -D electron vite-plugin-electron
```

**注意**：在下载过程中如果遇到卡住无法下载的问题时在跟目录创建一个.npmrc文件，将electron_mirror=https://npmmirror.com/mirrors/electron/CV进去再重新执行安装命令。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587773922-858e52a5-0a68-4cf6-93e3-3449ca124edd.webp#averageHue=%231b1b1a&clientId=u41311afe-8278-4&from=paste&id=u572e128a&originHeight=264&originWidth=973&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u855b59f3-839c-4f2c-b171-bdf0e296589&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587773930-5f05ba2f-e006-4cac-bce0-a250f1df1d9d.webp#averageHue=%231d1d1d&clientId=u41311afe-8278-4&from=paste&id=u4a3258a0&originHeight=804&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf0c11208-ca40-4837-9f77-3a78743f611&title=)
这次就安装成功了。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587773937-0be519ad-689a-4489-acb1-2f8edc066f10.webp#averageHue=%2333312b&clientId=u41311afe-8278-4&from=paste&id=u2800106b&originHeight=275&originWidth=829&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8d88885b-c04b-4b48-99d1-f21c5e81c5f&title=)
**再次注意**:如果需要兼容windows7/8/8.1版本，需要指定23.0.0版本以下的electron。

```
cmd
复制代码pnpm add -D electron@^22
```

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587773873-7883583a-9e83-4903-b682-755c9d0f1a5d.webp#averageHue=%23faf9f8&clientId=u41311afe-8278-4&from=paste&id=u59005502&originHeight=757&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc447f456-aa6c-4c56-bcc5-7fde45dca07&title=)

## 二、在vite.config.ts中使用vite-plugin-electron插件

1. 在根目录创建electron文件夹存放electron应用程序的代码方便管理，创建main.ts主进程文件并添加初始化程序。
2. 配置vite-plugin-electron插件需要进行打包编译的文件入口。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587774056-acced4e1-755e-4022-a167-6b8654e24e80.webp#averageHue=%231f1e1e&clientId=u41311afe-8278-4&from=paste&id=u4054669e&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9df69c73-15b3-4164-92f8-e9ef93b20cd&title=)

## 三、将网页装载到electron应用程序

1. 配置package.json的入口地址

由于electron主进程是使用的node环境，而默认情况下，Node.js 使用的是 CommonJS 模块规范，而 import 语句属于 ECMAScript 模块规范，两者不兼容。所以需要使用编译为 CommonJS 规范的dist-electron/main.js作为main属性的入口文件，否则会报es6语法错误。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587775587-d9fb3d46-7a4c-4279-8765-a91b5570ac5c.webp#averageHue=%23323030&clientId=u41311afe-8278-4&from=paste&id=u9d538dda&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufb90b13d-d34b-41ed-bde5-64cf060600e&title=)
正确写法。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587775537-320f4191-d33e-4a48-b09d-334599a70e21.webp#averageHue=%231e1d1d&clientId=u41311afe-8278-4&from=paste&id=ue4095705&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0ef4f25e-ac38-4d29-aad4-c35306cc98a&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587775604-2a567b02-cdc9-483c-88ea-28eec8baf03f.webp#averageHue=%231e1e1d&clientId=u41311afe-8278-4&from=paste&id=ufd5c04e5&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubb8bf582-4f24-4718-9812-1a9d4ab88a7&title=)
也可设置vite-plugin-electron的配置指定打包后的路径。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587775610-1bbc58da-906e-4f04-b719-293a54adf738.webp#averageHue=%2321201f&clientId=u41311afe-8278-4&from=paste&id=u555cc47f&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucb403a12-0b7e-4b32-a844-58019bda17a&title=)

## 四、package.json配置"type":"module"报错问题

由于dist-electron文件夹下是打包编译后的CommonJS模块规范的代码，当package.json设置type为module(ECMAScript模块规范)时将会将无法识别 CommonJS 模块规范的语法从而产生报错。此时就可以删除type:module或者将 type 的值设置为"commonjs"即可。因为不设置 type 时 Node.js 会默认使用 CommonJS 模块系统。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587775719-114637a5-f6b6-43ea-b4bb-80c3930576c8.webp#averageHue=%231f1f1f&clientId=u41311afe-8278-4&from=paste&id=ue36c5739&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2884cae5-b65b-4b1b-af9d-dfcfd8e26f1&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587776024-7c503fc0-03d6-4526-93c2-aaf7512fe33c.webp#averageHue=%23201f1f&clientId=u41311afe-8278-4&from=paste&id=ubea893d8&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub48c6e56-a35a-42b3-9ca7-0b9e038420c&title=)

## 五、控制台中文乱码问题

chcp 65001 是 Windows 系统下的一个命令，用于将控制台的代码页设置为 UTF-8 编码。在默认情况下，Windows 控制台使用的是 GBK 或者其他本地编码，导致在控制台中输出中文等非 ASCII 字符时可能会出现乱码。 使用 chcp 65001 命令可以将控制台的代码页设置为 UTF-8 编码，以便正确显示中文等非 ASCII 字符。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587776157-46bb5f3d-2dee-4e52-bf43-90aa0f22a6af.webp#averageHue=%231e1d1d&clientId=u41311afe-8278-4&from=paste&id=ua00e22e8&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uebdf021a-bdd2-4d4c-b805-ccdfa17d01a&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587776162-6584ad9d-8e35-4929-9ce2-49e1bb7adba8.webp#averageHue=%2321201f&clientId=u41311afe-8278-4&from=paste&id=u995ab182&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u45a35f61-c2e5-4613-8b6a-b0dc8b6049b&title=)

## 总结

1. 创建项目、执行pnpm i安装模板依赖
2. 安装electron、vite-plugin-electron
3. 配置vite.config.ts文件使用vite-plugin-electron插件并配置electron打包入口文件
4. 在根目录创建electron文件夹，创建main.ts为electron的主进程文件入口并准备好初始化代码
5. 设置package.json的main属性声明应用程序运行的入口文件并删除type:module属性
6. 执行pnpm dev即可打开electon桌面应用
   # 
   常见问题
   已经搭建好的工程目前只能启动electron桌面端的服务，如果需要启动web端服务的话需要将vite.config.ts中的plugins中的electron插件注释掉。这样非常麻烦，所以并不是我想要的效果。这一章我们将会使用不同的脚本命令启动不同服务，并且实现web端、electron端的项目打包。

## 一、开发环境web端electron端分离的实现方式优缺点

- 要对electron项目进行web跟electron桌面应用分离，目前我所了解到的方法有两种。

### 1. 传统方式

| 环境    | web            | electron                       | 优点                   | 缺点           |
| ------- | -------------- | ------------------------------ | ---------------------- | -------------- |
| **dev** | _"dev":"vite"_ | _"electron:dev": "electron ."_ | 清晰明了、简单易理解。 | 打包时比较麻烦 |

| **build** | _"build": "vue-tsc --noEmit && vite build"_ | _"electron:build":"vue-tsc --noEmit && vite build && electron-builder"_ | web端的开发环境、生产环境打包就是一个正常的web项目流程，几乎没有任何学习成本。
electron打包也只需要在web打包命令的基础上添加一个electron-builder命令即可，极其简单。 | ts项目中，需要将electron文件中的ts入口文件先进行打包编译，并设置package.json的入口文件为打包编译后的.js文件作为入口文件例：dist/electron/main.js。 |

### 2. 使用vue-plugin-electron插件的方式

| 环境      | web                                         | electron                                                     | 优点                                                         | 缺点                                                         |
| --------- | ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **dev**   | _"dev":"vite"_                              | _"electron:dev": "vite --config vite.config.electron.ts"_    | electron跟web端的配置分离，可针对不同环境编写独立的脚手架文件 | 需要写两套vite.config配置文件，然后使用vite --config指定配置文件来区分，当业务简单时可能会显得有些冗余 |
| **build** | _"build": "vue-tsc --noEmit && vite build"_ | _"electron:build": "vue-tsc && vite build --config vite.config.electron.ts && electron-builder"_ | electron跟web端的配置分离，可针对不同环境编写独立的脚手架文件 | 需要写两套vite.config配置文件，然后使用vite --config指定配置文件来区分，当业务简单时可能会显得有些冗余 |

- 本章节会使用插件的方式对开发环境跟打包配置详解。

## 二、web、electron开发环境搭建

我们已经知道当执行pnpm dev命令时会默认读取vite.config.ts文件中的配置信息启动开发服务，此时由于使用了vite-plugin-electron插件。所以就会启动electron的开发环境。
因此我们需要按照以下步骤新增一个electron服务的config文件与web服务的config文件分开管理。

1. 使用vite.chonfig.ts文件复制一份名为vite.config.electron.ts的electron专属配置文件。
2. 删除vite.chonfig.ts中的vite-plugin-electron插件，恢复初始化的样子。
3. 在package.json文件添加命令"electron:dev": "chcp 65001 && vite --config vite.config.electron.ts"

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587329283-9cece838-a9e1-4d6c-a48b-3df25999516e.webp#averageHue=%231e1e1d&clientId=u41311afe-8278-4&from=paste&id=u6cbfe7ca&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u43a7dcd7-68aa-4904-8a6b-7a48bd5f166&title=)

```
json
复制代码"electron:dev": "chcp 65001 && vite --config vite.config.electron.ts"
```

1. chcp 65001：解决控制台中文乱码问题。
2. vite --config vite.config.electron.ts：指定vite运行时的配置文件。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587329224-ea51a7c1-4fa3-4330-b040-3dc9f7ceda8f.webp#averageHue=%231e1d1d&clientId=u41311afe-8278-4&from=paste&id=u94721880&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue12cb9a4-c057-41bb-94cb-98489d59d41&title=)

- 执行pnpm dev 跟 pnpm electron:dev尝试一下。。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587329372-40affbde-10a8-4844-9870-9edfd04f0d7e.webp#averageHue=%23252524&clientId=u41311afe-8278-4&from=paste&id=u0345b1bb&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9519d919-44d5-48e0-a159-225a9532122&title=)
完美！
**注意**：传统方式在这就不演示了。感兴趣的同学可以按以下步骤尝试一下。

1. 添加命令"app:dev": "electron ."。
2. 同样将vite.config.ts中的viet-plugin-electron插件删除或注释。
3. 执行pnpm dev 跟 pnpm app:dev尝试一下。

这种方式一定要注意package.json文件中入口文件main属性的值是否正确哦。

## 三、打包

目前我知道的打包方式共有两种。

1. electron官方提到的[electron-forge](https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fzh%2Fdocs%2Flatest%2Ftutorial%2F%25E6%2589%2593%25E5%258C%2585%25E6%2595%2599%25E7%25A8%258B)(我没成功！所以用第二种方式，应该也是大多数vue + electron项目的常用打包方式)
2. 使用electron-builder构建。

### 1. web端

web端打包直接执行pnpm build进行打包构建，然后将打包结果dist文件夹部署在web服务器即可。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587329275-b04062a8-8d2b-463c-be65-2f5d05404a6a.webp#averageHue=%2334332b&clientId=u41311afe-8278-4&from=paste&id=u83d5319f&originHeight=263&originWidth=618&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua3f4ceb9-ad0f-440e-8c41-0c0dc1523f4&title=)
我这里启动了一个本地Nginx并监听80端口来检查打包结果是否正常运行。Nginx知识可自行百度查看即可。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587329304-648c981b-4b1a-44bd-bb9d-d69ca70dbcf6.webp#averageHue=%23191918&clientId=u41311afe-8278-4&from=paste&id=u70844fa9&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u961f1f3d-1269-40ce-be87-5742c727514&title=)
将dist文件夹中的文件放入nginx/html中
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332019-ac8609f7-0783-49e0-b1c3-25b203ed0354.webp#averageHue=%23252424&clientId=u41311afe-8278-4&from=paste&id=u3d6e3868&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u72bd1c3d-5c4d-464c-b2b1-44129835c53&title=)
在浏览器输入localhost:80访问页面，也是没有问题。
web打包成功！非常的简单。

### 2. electron桌面端

1. 安装electron-builder依赖。
2. 在package.json添加脚本。
3. 在electron/main.ts中配置应用加载路径。
4. 在根目录新增一个electron-builder.json文件设置electron-builder打包配置，src文件夹同级。
5. 执行pnpm electron:build进行打包。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332175-084212f0-85c8-4e0c-8652-dbae61831e85.webp#averageHue=%23201e1d&clientId=u41311afe-8278-4&from=paste&id=u7cce9a71&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u16f1ee9d-8858-4f71-afa2-113d5db2495&title=)

- dist：由vite打包后的产物。
- dist-electron：由vite-plugin-electron插件编译打包后生成的产物(为了将ts文件编译为js文件)。
- release：由electron-builder将dist跟dist-electron合并打包后生成的产物，其中的文件无需关注，目前我们仅关注.exe文件即可。(太多了，有些我也不懂😕！)

安装桌面应用

1. 在资源管理器中打开文件夹。
2. 直接双击.exe文件安装 。
3. 完成。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332096-f7b142eb-6e68-4809-bad5-c8fbada13a89.webp#averageHue=%23201f1f&clientId=u41311afe-8278-4&from=paste&id=u64d18c4f&originHeight=956&originWidth=565&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u935d9819-28e5-4b6c-9c33-84c7d169605&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332119-4a4abcb5-ae70-461b-b675-5a9375d72a00.webp#averageHue=%231c1b1b&clientId=u41311afe-8278-4&from=paste&id=uce24cce6&originHeight=339&originWidth=722&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u10c0421c-466f-4fb4-bf5a-688ea23330c&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332118-f4e192ac-c08e-409c-b320-26613969cee8.webp#averageHue=%23dbddd5&clientId=u41311afe-8278-4&from=paste&id=u61e2453f&originHeight=156&originWidth=387&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u86a80ac0-3cba-4533-89f4-75e6cfc4776&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332420-b0924f46-a8be-46cb-bcf2-8af5ed850449.webp#averageHue=%23242424&clientId=u41311afe-8278-4&from=paste&id=u82c3e0a5&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u218b0632-277f-4fad-8995-3531f0ba39a&title=)
这样就打包安装成功了！

## 四、使用asar解压工具排查解决打包后的bug

如果是对electron打包后出现bug不知道如何排查，那么这一小节应该能对大家有所帮助。
在学习解决打包后产生的各类bug之前，需要先安装一个.asar压缩文件的解压工具，使用asar解压工具将electron打包后的app.asar解压后查看，方便快速排查解决部分打包文件路径不对造成的bug。

1. 全局安装asar依赖。
2. 进入release/win-unpacked/resources文件夹

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332567-f5b69007-33d1-45eb-9769-ea78da48a276.webp#averageHue=%232f2e28&clientId=u41311afe-8278-4&from=paste&id=u214c5066&originHeight=436&originWidth=1357&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4c208762-975d-4604-b18d-963fcb9ec4d&title=)

1. 打开终端执行asar extract app.asar ./命令即可查看打包后的文件目录。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332579-8e3b4781-e53a-4692-ad2f-59817a4207c7.webp#averageHue=%23121212&clientId=u41311afe-8278-4&from=paste&id=u759adfd1&originHeight=270&originWidth=1067&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7092330f-c7dc-426e-9b24-422c690f9b5&title=)
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332640-0ad5de6f-bec5-42a4-8049-1c9f1ffdd4bf.webp#averageHue=%23191818&clientId=u41311afe-8278-4&from=paste&id=ued9bdf43&originHeight=824&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7752d0bb-7bbd-40db-a559-52514b1d6aa&title=)

### 1. 使用electron-builder默认配置时导致应用白屏问题

此处我将会删除electron-builder.json配置文件，使用默认配置进行打包测试。
我当前的文件目录结构👇。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332724-c9bef5f2-f24c-43dd-8000-f2497b66bc6f.webp#averageHue=%231e1e1d&clientId=u41311afe-8278-4&from=paste&id=ub14c3a38&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u13b8f8a5-94de-4dc5-8157-6988e272d78&title=)
🚀直接打包安装。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332928-a8344739-5460-44d3-a751-162ea24a36d8.webp#averageHue=%231e1d1c&clientId=u41311afe-8278-4&from=paste&id=u55c2fb8a&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1c53e59f-2483-45e1-a2e5-61b23de339e&title=)
此时electron-builder就会将打包结果输出到dist文件夹下，双击安装应用后打开，这时候就会发现，当前的应用打开后就白屏了。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332900-643f9b60-a33c-4e40-96e4-02eadbb9a0ed.webp#averageHue=%23fdfdfd&clientId=u41311afe-8278-4&from=paste&id=u585ca5f6&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u39c4adf3-fc3d-49c7-8f95-904bc91edc1&title=)
这时候先不要慌，选中菜单栏的view选项，打开devTools排查白屏的原因。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587332979-e5916f1a-1a65-4b63-a3d0-e78f90be1b61.webp#averageHue=%23fbfbfb&clientId=u41311afe-8278-4&from=paste&id=u092f84f7&originHeight=593&originWidth=946&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2494d364-cf6e-4b40-9c06-e6458a0a097&title=)
此时观察network可以发现，index.html文件请求失败了。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333026-09834224-e846-4d12-9d69-f842c74893c4.webp#averageHue=%23474d4c&clientId=u41311afe-8278-4&from=paste&id=ue83ba6ff&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u866418b8-a44a-421a-bd42-38c203180a5&title=)
为什么会失败呢？

1. 复制app.asar/dist/index.html前面的文件路径找到app.asar文件的所在目录。
2. 使用asar extract app.asar ./命令解压查看源文件。

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333288-e77729fb-6afc-43fa-8e8b-1e49ed813149.webp#averageHue=%231a1919&clientId=u41311afe-8278-4&from=paste&id=u80c80567&originHeight=750&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7f4fea27-fbac-45d5-9bb3-c4f0a56bc25&title=)
这时候就发现app.asar中压根就没有dist文件夹，所以当然就无法找到dist/index.html所以这就是造成白屏的原因。
**解决方法**：因为打包后的electron/main.ts文件是在dist-electron/main.js中，所以只需要将electron/main.ts中的'../dist/index.html'修改为'../index.html'后再次打包，这样electron的路径就是app.asar/index.html了。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333307-125cd68d-d222-45e1-a466-d9fef67c99e7.webp#averageHue=%231d1d1c&clientId=u41311afe-8278-4&from=paste&id=ub244cdff&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc07d6fcd-c628-4017-8224-3bc8362f2f5&title=)
此时electron应用的首页路径就配置正确了，但是你会发现他依旧还是白屏。又是为什么呢🤔？
如图所示，依旧还是源加载失败了。这次是main.ts😶。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333390-f141799c-4277-4623-bff0-afc41317728f.webp#averageHue=%23363936&clientId=u41311afe-8278-4&from=paste&id=u33904b16&originHeight=779&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uceb841ea-08a8-46e3-a77f-f003581d7fb&title=)
一开始我也非常好奇，为啥会有.ts文件会被加载呢，.ts文件不都已经配置了需要编译再打包嘛。
后来经过不断的排查➕测试，终于让我明白了其中的原因。

1. 首先：检查main.ts资源请求的原因。（发现index.html没有进行编译就打包了）

![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333458-ca117324-53c6-4874-862d-23ca80ff205f.webp#averageHue=%2331352c&clientId=u41311afe-8278-4&from=paste&id=u0fadda41&originHeight=779&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0d5fe360-3e4c-4599-9ebe-7deb8d32957&title=)

1. 分析未被解析打包的原因。

由于electron-builder在没有指定要打包的文件时，默认会将整个项目目录作为输入然后打包输出到dist文件夹中。

- 此时就会发生两件事：
  ①vite打包的dist文件夹被覆盖。
  ②electron-builder会将根目录所有文件原封不动的打包解压到app.asar文件中`。

修改vite打包输出文件修改为web-dist后打包分析。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333464-45a5aab9-4ae2-4f48-bd47-1cf30eadac05.webp#averageHue=%231e1d1c&clientId=u41311afe-8278-4&from=paste&id=u5c2db1c9&originHeight=813&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc4957b25-41a4-4955-a912-dc6f2bbea34&title=)
在外部资源管理器打开\dist\win-unpacked\resources并执行asar extract app.asar ./提取源文件。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333708-953e549a-f513-478a-ba50-c0dc60abf1c3.webp#averageHue=%231b1a19&clientId=u41311afe-8278-4&from=paste&id=u8fe046a4&originHeight=758&originWidth=1407&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua26a1408-c208-4967-ac3e-d6cfd67d75c&title=)
经过这解压后的源文件进行分析，我们可以发现，整个目录所有文件都被electron-builder默认打包到app.asar中了,得到了证实。不过虽然现在多了很多无用的文件，但如果将electron/main.ts文件的'../index.html'修改为'../web-dist/index.html',使用vite已经打包好的index.html作为electron的首页入口文件。那么此时页面也可以正常显示了🤩🤩！
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333755-67b81141-150e-4768-883f-0a549fdd97e2.webp#averageHue=%23293330&clientId=u41311afe-8278-4&from=paste&id=ue889ac36&originHeight=819&originWidth=1512&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4ac4ce73-ec8d-4153-83a3-1052d31ca82&title=)
当然这不是我们的最终解决方案，接下来我们直接通过配置electron-builder的配置来解决这个问题。 electron-builder的打包配置有两种方式。

1. 在package.json中添加"build"属性即可配置electron-builder的打包配置项。
2. 在根目录添加electron-builder.json配置文件添加相关配置

指定electron-builder需要打包的文件
此时electron-builder的打包结果就会输出到release文件夹中了,并且不会将没有用的文件打包到输出结果中了。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333869-96f4ae6f-401b-44ae-a2c6-42210dfc5d6e.webp#averageHue=%23231a19&clientId=u41311afe-8278-4&from=paste&id=u4b83d538&originHeight=406&originWidth=945&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0e3f1f86-7ed8-4822-9185-ae94c48c642&title=)
此时就只有dist、dist-electron文件夹被打包出来。（node_modules跟package.json我也不知道为什么还会打包出来，此处不深究了。）
最后：为了能顺利打开应用，还需要将electron/main.ts中的文件路径修改一下。
再次双击.exe文件自动安装打开就可以啦，非常完美🤩🤩。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333836-ec64e138-722e-484e-9bda-6b9c08873dc3.webp#averageHue=%2331342e&clientId=u41311afe-8278-4&from=paste&id=u46a72b45&originHeight=673&originWidth=1241&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9f0dcfe9-96ff-4114-90b6-b585128a38e&title=)
桌面跟开始菜单也会创建web-electron-template应用的快捷方式。
![](https://cdn.nlark.com/yuque/0/2023/webp/27056598/1694587333912-b3d7faee-b1d8-4391-bb8f-b7f553d54540.webp#averageHue=%23202b57&clientId=u41311afe-8278-4&from=paste&id=ud99cd577&originHeight=651&originWidth=642&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u139237a9-8487-4fb0-9299-d71a11c7f60&title=)

# 参考文献

- asar文件详解：[juejin.cn/post/721317…](https://juejin.cn/post/7213171235577036860)
- 更多electron-builder的详细知识跟配置可以访问这篇文章学习。非常棒棒。[juejin.cn/post/684490…](https://juejin.cn/post/6844903693683261453)

