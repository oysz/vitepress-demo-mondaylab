# NestJs
## 1.简介

本周由于霄哥安排我和治航重构web-dev，所以第一次接触到Nest.js。这次项目前端采用的Vue3+ts，后端采用的就是Nest.js。自从学习前端以来，一直没怎么接触过后端知识，所以对我来说有一定的挑战，不过在霄哥和官方文档的帮助下，还是学到了不少，接下来分享一下我对Nest.js的一些理解和技巧。

## 2.Nest介绍

Nest 是一个渐进的 Node.js 框架，可以在 TypeScript 和 JavaScript (ES6、ES7、ES8)之上构 建高效、可伸缩的企业级服务器端应用程序。我们可以这样认为： Nest 是 Node.js 版的 Spring 框架。
NestJs 的核心思想：就是提供了一个层与层直接的耦合度极小,抽象化极高的一个架构 体系。
中文文档：[https://docs.nestjs.cn/](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.nestjs.cn%2F)

#### Nestjs 的特性

- 依赖注入容器
- 模块化封装
- 可测试性
- 内置支持 TypeScript
- 可基于 Express 或者 fastify

# 3.项目构建

由于这次的项目是同事已经搭建好的，所以我没有进行构建项目，不过还是贴一下过程。

#### 3.1 安装 MongoDB

目前 MongoDB 已经不开源了，因此我们想要安装 MongoDB 就只能安装社区版本。

```vue
brew tap mongodb/brew
brew install mongodb-community
```

启动 MongoDB 的服务：

```vue
brew services start mongodb-community
```

#### 3.2 构建并启动项目

构建项目有两种方式，可以自行选择。**建议采用第一种方式，因为后面我们可以直接使用脚手架工具生成项目文件。**
使用 Nest CLI 安装：

```vue
npm i -g @nestjs/cli
nest new nest-crud-demo
```

使用 Git 安装：

```vue
git clone https://github.com/nestjs/typescript-starter.git nest-crud-demo
```

创建新项目或启动服务：

```vue
//创建新项目
nest new nestdemo 
//启动服务
cd nest-crud-demo
npm run start:dev 或者 yarn run start:dev
```

安装依赖：
项目中我们会用到 Mongoose 来操作我们的数据库，Nest 官方为我们提供了一个 Mongoose 的封装，我们需要安装 mongoose 和 @nestjs/mongoose：

```vue
npm install mongoose @nestjs/mongoose --save
```

安装好之后我们就可以开始编码过程了。

# 4.相关指令

- nest new 名称 创建项目
- nest g co 名称 创建控制器
- nest g s 名称 创建服务
- nest g mi 名称 创建中间件
- nest g pi 名称 创建管道
- nest g mo 名称 创建模块
- nest g gu 名称 创建守卫
- nest -h/--help 帮助，如下：

```
        name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ in          │ Generate an interceptor declaration          │
      │ interface     │ interface   │ Generate an interface                        │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ service       │ s           │ Generate a service declaration               │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      │ resource      │ res         │ Generate a new CRUD resource   
```

> 创建类型指令都可以指定文件路径，而且路径全部是再src目录下面，例如：
> nest g co /aaa/bbb/user 则在src下面就会存在一个三级目录，user的目录下
> 有一个以user命名大写的控制器 UserController.ts文件

# 5.创建CRUD模块

#### 5.1 传统方法

#### 5.1.1 创建Module，Controller，Provider

```
// 创建 Module
nest g module user server // 脚手架工具会自动在 src/server/user 文件夹下创建一个 user.module.ts，这是 Nest 的模块文件，Nest 用它来组织整个应用程序的结构。
// 创建 Controller
nest g controller user server // 在 Nest 中，controller 就类似前端的「路由」，负责处理「客户端传入的请求」和「服务端返回的响应」。也就是负责分发和处理「请求」和「响应」。
// 创建 Provider
nest g service user server // 从字面意思来理解，就是「服务的提供者」。我们的 controller 接收到了一个用户的查询请求，我们不能直接在 controller 中去查询数据库并返回，而是要将查询请求交给 provider 来处理，所以说 provider 就是用来提供「数据库操作服务」的。

```

#### 5.1.2 连接数据库

连接数据之前，我们要先在根模块，也就是 app.module.ts 中引入 Mongoose 的连接模块：

```vue
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';

@Module({
imports: [MongooseModule.forRoot('mongodb://localhost/xxx'), UserModule],
controllers: [AppController],
providers: [AppService]
})
export class AppModule {}

```

然后就是引入 Mongoose 分模块，这里我们先要创建一个数据表的格式，在 src/server/user 文件夹下创建一个 user.schema.ts 文件，定义一个数据表的格式：

```vue
// user.schema.ts
import { Schema } from 'mongoose';
 
export const userSchema = new Schema({
  _id: { type: String, required: true }, // 覆盖 Mongoose 生成的默认 _id
  user_name: { type: String, required: true },
  password: { type: String, required: true }
});

```

然后将我们的 user.module.ts 文件修改成这样：

```vue
// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { userSchema } from './user.schema';
import { UserService } from './user.service';
 
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

```

然后就可以开始编写的CRUD 逻辑了。

#### 5.2 通过指令快速创建

```
nest g res user // 脚手架工具会自动在 src/user 文件夹下创建CRUD文件包

```

> ### 需要注意的是这种方法需要自己手动引入 Mongoose 分模块

# 6.批量导入postman测试接口

安装Swagger集成：

> npm install --save @nestjs/swagger swagger-ui-express

如果你正在使用fastify，你必须安装 fastify-swagger 而不是 swagger-ui-express，这次项目采用的就是 fastify-swagger

> npm install --save @nestjs/swagger fastify-swagger

- 引导
  - main.ts文件
  - 引入：import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
  - 编码

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setGlobalPrefix('lego/api')
  // 加入swagger
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('webdev接口文档')
    .setDescription('webdev 低代码平台后端服务接口文档')
    .setVersion('1.0')
    .addTag('webdev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();


```

打开本地的api-docs-json文件，将json文件另存到本地，再导入postman就可以啦。
<!-- 打开[http://localhost:3000/api-docs-json](http://localhost:3000/api-docs-json)，将json文件另存到本地，再导入postman就可以啦。 -->
这里另外附上postman的快速上手教程：

> [https://blog.csdn.net/fxbin123/article/details/80428216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165233374216781667894361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165233374216781667894361&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-80428216-null-null.142^v9^pc_search_result_control_group,157^v4^new_style&utm_term=postman&spm=1018.2226.3001.4187](https://blog.csdn.net/fxbin123/article/details/80428216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165233374216781667894361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165233374216781667894361&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-80428216-null-null.142^v9^pc_search_result_control_group,157^v4^new_style&utm_term=postman&spm=1018.2226.3001.4187)

