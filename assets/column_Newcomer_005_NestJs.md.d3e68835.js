import{_ as a,o as e,c as n,L as l}from"./chunks/framework.9fa19bf9.js";const b=JSON.parse('{"title":"NestJs","description":"","frontmatter":{},"headers":[],"relativePath":"column/Newcomer/005_NestJs.md"}'),o={name:"column/Newcomer/005_NestJs.md"};function p(t,s,r,c,i,d){return e(),n("div",null,s[0]||(s[0]=[l(`<h1 id="nestjs" tabindex="-1">NestJs <a class="header-anchor" href="#nestjs" aria-label="Permalink to &quot;NestJs&quot;">​</a></h1><h2 id="_1-简介" tabindex="-1">1.简介 <a class="header-anchor" href="#_1-简介" aria-label="Permalink to &quot;1.简介&quot;">​</a></h2><p>本周由于霄哥安排我和治航重构web-dev，所以第一次接触到Nest.js。这次项目前端采用的Vue3+ts，后端采用的就是Nest.js。自从学习前端以来，一直没怎么接触过后端知识，所以对我来说有一定的挑战，不过在霄哥和官方文档的帮助下，还是学到了不少，接下来分享一下我对Nest.js的一些理解和技巧。</p><h2 id="_2-nest介绍" tabindex="-1">2.Nest介绍 <a class="header-anchor" href="#_2-nest介绍" aria-label="Permalink to &quot;2.Nest介绍&quot;">​</a></h2><p>Nest 是一个渐进的 Node.js 框架，可以在 TypeScript 和 JavaScript (ES6、ES7、ES8)之上构 建高效、可伸缩的企业级服务器端应用程序。我们可以这样认为： Nest 是 Node.js 版的 Spring 框架。 NestJs 的核心思想：就是提供了一个层与层直接的耦合度极小,抽象化极高的一个架构 体系。 中文文档：<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.nestjs.cn%2F" target="_blank" rel="noreferrer">https://docs.nestjs.cn/</a></p><h4 id="nestjs-的特性" tabindex="-1">Nestjs 的特性 <a class="header-anchor" href="#nestjs-的特性" aria-label="Permalink to &quot;Nestjs 的特性&quot;">​</a></h4><ul><li>依赖注入容器</li><li>模块化封装</li><li>可测试性</li><li>内置支持 TypeScript</li><li>可基于 Express 或者 fastify</li></ul><h1 id="_3-项目构建" tabindex="-1">3.项目构建 <a class="header-anchor" href="#_3-项目构建" aria-label="Permalink to &quot;3.项目构建&quot;">​</a></h1><p>由于这次的项目是同事已经搭建好的，所以我没有进行构建项目，不过还是贴一下过程。</p><h4 id="_3-1-安装-mongodb" tabindex="-1">3.1 安装 MongoDB <a class="header-anchor" href="#_3-1-安装-mongodb" aria-label="Permalink to &quot;3.1 安装 MongoDB&quot;">​</a></h4><p>目前 MongoDB 已经不开源了，因此我们想要安装 MongoDB 就只能安装社区版本。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">brew tap mongodb/brew</span></span>
<span class="line"><span style="color:#BABED8;">brew install mongodb-community</span></span></code></pre></div><p>启动 MongoDB 的服务：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">brew services start mongodb-community</span></span></code></pre></div><h4 id="_3-2-构建并启动项目" tabindex="-1">3.2 构建并启动项目 <a class="header-anchor" href="#_3-2-构建并启动项目" aria-label="Permalink to &quot;3.2 构建并启动项目&quot;">​</a></h4><p>构建项目有两种方式，可以自行选择。<strong>建议采用第一种方式，因为后面我们可以直接使用脚手架工具生成项目文件。</strong> 使用 Nest CLI 安装：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">npm i -g @nestjs/cli</span></span>
<span class="line"><span style="color:#BABED8;">nest new nest-crud-demo</span></span></code></pre></div><p>使用 Git 安装：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">git clone https://github.com/nestjs/typescript-starter.git nest-crud-demo</span></span></code></pre></div><p>创建新项目或启动服务：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">//创建新项目</span></span>
<span class="line"><span style="color:#BABED8;">nest new nestdemo </span></span>
<span class="line"><span style="color:#BABED8;">//启动服务</span></span>
<span class="line"><span style="color:#BABED8;">cd nest-crud-demo</span></span>
<span class="line"><span style="color:#BABED8;">npm run start:dev 或者 yarn run start:dev</span></span></code></pre></div><p>安装依赖： 项目中我们会用到 Mongoose 来操作我们的数据库，Nest 官方为我们提供了一个 Mongoose 的封装，我们需要安装 mongoose 和 @nestjs/mongoose：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">npm install mongoose @nestjs/mongoose --save</span></span></code></pre></div><p>安装好之后我们就可以开始编码过程了。</p><h1 id="_4-相关指令" tabindex="-1">4.相关指令 <a class="header-anchor" href="#_4-相关指令" aria-label="Permalink to &quot;4.相关指令&quot;">​</a></h1><ul><li>nest new 名称 创建项目</li><li>nest g co 名称 创建控制器</li><li>nest g s 名称 创建服务</li><li>nest g mi 名称 创建中间件</li><li>nest g pi 名称 创建管道</li><li>nest g mo 名称 创建模块</li><li>nest g gu 名称 创建守卫</li><li>nest -h/--help 帮助，如下：</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">name          │ alias       │ description                                  │</span></span>
<span class="line"><span style="color:#babed8;">      │ application   │ application │ Generate a new application workspace         │</span></span>
<span class="line"><span style="color:#babed8;">      │ class         │ cl          │ Generate a new class                         │</span></span>
<span class="line"><span style="color:#babed8;">      │ configuration │ config      │ Generate a CLI configuration file            │</span></span>
<span class="line"><span style="color:#babed8;">      │ controller    │ co          │ Generate a controller declaration            │</span></span>
<span class="line"><span style="color:#babed8;">      │ decorator     │ d           │ Generate a custom decorator                  │</span></span>
<span class="line"><span style="color:#babed8;">      │ filter        │ f           │ Generate a filter declaration                │</span></span>
<span class="line"><span style="color:#babed8;">      │ gateway       │ ga          │ Generate a gateway declaration               │</span></span>
<span class="line"><span style="color:#babed8;">      │ guard         │ gu          │ Generate a guard declaration                 │</span></span>
<span class="line"><span style="color:#babed8;">      │ interceptor   │ in          │ Generate an interceptor declaration          │</span></span>
<span class="line"><span style="color:#babed8;">      │ interface     │ interface   │ Generate an interface                        │</span></span>
<span class="line"><span style="color:#babed8;">      │ middleware    │ mi          │ Generate a middleware declaration            │</span></span>
<span class="line"><span style="color:#babed8;">      │ module        │ mo          │ Generate a module declaration                │</span></span>
<span class="line"><span style="color:#babed8;">      │ pipe          │ pi          │ Generate a pipe declaration                  │</span></span>
<span class="line"><span style="color:#babed8;">      │ provider      │ pr          │ Generate a provider declaration              │</span></span>
<span class="line"><span style="color:#babed8;">      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │</span></span>
<span class="line"><span style="color:#babed8;">      │ service       │ s           │ Generate a service declaration               │</span></span>
<span class="line"><span style="color:#babed8;">      │ library       │ lib         │ Generate a new library within a monorepo     │</span></span>
<span class="line"><span style="color:#babed8;">      │ sub-app       │ app         │ Generate a new application within a monorepo │</span></span>
<span class="line"><span style="color:#babed8;">      │ resource      │ res         │ Generate a new CRUD resource</span></span></code></pre></div><blockquote><p>创建类型指令都可以指定文件路径，而且路径全部是再src目录下面，例如： nest g co /aaa/bbb/user 则在src下面就会存在一个三级目录，user的目录下 有一个以user命名大写的控制器 UserController.ts文件</p></blockquote><h1 id="_5-创建crud模块" tabindex="-1">5.创建CRUD模块 <a class="header-anchor" href="#_5-创建crud模块" aria-label="Permalink to &quot;5.创建CRUD模块&quot;">​</a></h1><h4 id="_5-1-传统方法" tabindex="-1">5.1 传统方法 <a class="header-anchor" href="#_5-1-传统方法" aria-label="Permalink to &quot;5.1 传统方法&quot;">​</a></h4><h4 id="_5-1-1-创建module-controller-provider" tabindex="-1">5.1.1 创建Module，Controller，Provider <a class="header-anchor" href="#_5-1-1-创建module-controller-provider" aria-label="Permalink to &quot;5.1.1 创建Module，Controller，Provider&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 创建 Module</span></span>
<span class="line"><span style="color:#babed8;">nest g module user server // 脚手架工具会自动在 src/server/user 文件夹下创建一个 user.module.ts，这是 Nest 的模块文件，Nest 用它来组织整个应用程序的结构。</span></span>
<span class="line"><span style="color:#babed8;">// 创建 Controller</span></span>
<span class="line"><span style="color:#babed8;">nest g controller user server // 在 Nest 中，controller 就类似前端的「路由」，负责处理「客户端传入的请求」和「服务端返回的响应」。也就是负责分发和处理「请求」和「响应」。</span></span>
<span class="line"><span style="color:#babed8;">// 创建 Provider</span></span>
<span class="line"><span style="color:#babed8;">nest g service user server // 从字面意思来理解，就是「服务的提供者」。我们的 controller 接收到了一个用户的查询请求，我们不能直接在 controller 中去查询数据库并返回，而是要将查询请求交给 provider 来处理，所以说 provider 就是用来提供「数据库操作服务」的。</span></span></code></pre></div><h4 id="_5-1-2-连接数据库" tabindex="-1">5.1.2 连接数据库 <a class="header-anchor" href="#_5-1-2-连接数据库" aria-label="Permalink to &quot;5.1.2 连接数据库&quot;">​</a></h4><p>连接数据之前，我们要先在根模块，也就是 app.module.ts 中引入 Mongoose 的连接模块：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">// app.module.ts</span></span>
<span class="line"><span style="color:#BABED8;">import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { MongooseModule } from &#39;@nestjs/mongoose&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { AppController } from &#39;./app.controller&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { AppService } from &#39;./app.service&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { UserModule } from &#39;./server/user/user.module&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">@Module({</span></span>
<span class="line"><span style="color:#BABED8;">imports: [MongooseModule.forRoot(&#39;mongodb://localhost/xxx&#39;), UserModule],</span></span>
<span class="line"><span style="color:#BABED8;">controllers: [AppController],</span></span>
<span class="line"><span style="color:#BABED8;">providers: [AppService]</span></span>
<span class="line"><span style="color:#BABED8;">})</span></span>
<span class="line"><span style="color:#BABED8;">export class AppModule {}</span></span></code></pre></div><p>然后就是引入 Mongoose 分模块，这里我们先要创建一个数据表的格式，在 src/server/user 文件夹下创建一个 user.schema.ts 文件，定义一个数据表的格式：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">// user.schema.ts</span></span>
<span class="line"><span style="color:#BABED8;">import { Schema } from &#39;mongoose&#39;;</span></span>
<span class="line"><span style="color:#BABED8;"> </span></span>
<span class="line"><span style="color:#BABED8;">export const userSchema = new Schema({</span></span>
<span class="line"><span style="color:#BABED8;">  _id: { type: String, required: true }, // 覆盖 Mongoose 生成的默认 _id</span></span>
<span class="line"><span style="color:#BABED8;">  user_name: { type: String, required: true },</span></span>
<span class="line"><span style="color:#BABED8;">  password: { type: String, required: true }</span></span>
<span class="line"><span style="color:#BABED8;">});</span></span></code></pre></div><p>然后将我们的 user.module.ts 文件修改成这样：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">// user.module.ts</span></span>
<span class="line"><span style="color:#BABED8;">import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { MongooseModule } from &#39;@nestjs/mongoose&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { UserController } from &#39;./user.controller&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { userSchema } from &#39;./user.schema&#39;;</span></span>
<span class="line"><span style="color:#BABED8;">import { UserService } from &#39;./user.service&#39;;</span></span>
<span class="line"><span style="color:#BABED8;"> </span></span>
<span class="line"><span style="color:#BABED8;">@Module({</span></span>
<span class="line"><span style="color:#BABED8;">  imports: [MongooseModule.forFeature([{ name: &#39;Users&#39;, schema: userSchema }])],</span></span>
<span class="line"><span style="color:#BABED8;">  controllers: [UserController],</span></span>
<span class="line"><span style="color:#BABED8;">  providers: [UserService]</span></span>
<span class="line"><span style="color:#BABED8;">})</span></span>
<span class="line"><span style="color:#BABED8;">export class UserModule {}</span></span></code></pre></div><p>然后就可以开始编写的CRUD 逻辑了。</p><h4 id="_5-2-通过指令快速创建" tabindex="-1">5.2 通过指令快速创建 <a class="header-anchor" href="#_5-2-通过指令快速创建" aria-label="Permalink to &quot;5.2 通过指令快速创建&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">nest g res user // 脚手架工具会自动在 src/user 文件夹下创建CRUD文件包</span></span></code></pre></div><blockquote><h3 id="需要注意的是这种方法需要自己手动引入-mongoose-分模块" tabindex="-1">需要注意的是这种方法需要自己手动引入 Mongoose 分模块 <a class="header-anchor" href="#需要注意的是这种方法需要自己手动引入-mongoose-分模块" aria-label="Permalink to &quot;需要注意的是这种方法需要自己手动引入 Mongoose 分模块&quot;">​</a></h3></blockquote><h1 id="_6-批量导入postman测试接口" tabindex="-1">6.批量导入postman测试接口 <a class="header-anchor" href="#_6-批量导入postman测试接口" aria-label="Permalink to &quot;6.批量导入postman测试接口&quot;">​</a></h1><p>安装Swagger集成：</p><blockquote><p>npm install --save @nestjs/swagger swagger-ui-express</p></blockquote><p>如果你正在使用fastify，你必须安装 fastify-swagger 而不是 swagger-ui-express，这次项目采用的就是 fastify-swagger</p><blockquote><p>npm install --save @nestjs/swagger fastify-swagger</p></blockquote><ul><li>引导 <ul><li>main.ts文件</li><li>引入：import { SwaggerModule, DocumentBuilder } from &#39;@nestjs/swagger&#39;;</li><li>编码</li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { NestFactory } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { AppModule } from &#39;./app.module&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { SwaggerModule, DocumentBuilder } from &#39;@nestjs/swagger&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { urlencoded, json } from &#39;express&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">async function bootstrap() {</span></span>
<span class="line"><span style="color:#babed8;">  const app = await NestFactory.create(AppModule);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  app.use(json({ limit: &#39;50mb&#39; }));</span></span>
<span class="line"><span style="color:#babed8;">  app.use(urlencoded({ extended: true, limit: &#39;50mb&#39; }));</span></span>
<span class="line"><span style="color:#babed8;">  app.setGlobalPrefix(&#39;lego/api&#39;)</span></span>
<span class="line"><span style="color:#babed8;">  // 加入swagger</span></span>
<span class="line"><span style="color:#babed8;">  // https://docs.nestjs.com/openapi/introduction</span></span>
<span class="line"><span style="color:#babed8;">  const config = new DocumentBuilder()</span></span>
<span class="line"><span style="color:#babed8;">    .setTitle(&#39;webdev接口文档&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    .setDescription(&#39;webdev 低代码平台后端服务接口文档&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    .setVersion(&#39;1.0&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    .addTag(&#39;webdev&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    .build();</span></span>
<span class="line"><span style="color:#babed8;">  const document = SwaggerModule.createDocument(app, config);</span></span>
<span class="line"><span style="color:#babed8;">  SwaggerModule.setup(&#39;api-docs&#39;, app, document);</span></span>
<span class="line"><span style="color:#babed8;">  await app.listen(3000);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">bootstrap();</span></span></code></pre></div><p>打开本地的api-docs-json文件，将json文件另存到本地，再导入postman就可以啦。</p><p>这里另外附上postman的快速上手教程：</p><blockquote><p><a href="https://blog.csdn.net/fxbin123/article/details/80428216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165233374216781667894361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&amp;request_id=165233374216781667894361&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-80428216-null-null.142%5Ev9%5Epc_search_result_control_group,157%5Ev4%5Enew_style&amp;utm_term=postman&amp;spm=1018.2226.3001.4187" target="_blank" rel="noreferrer">https://blog.csdn.net/fxbin123/article/details/80428216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165233374216781667894361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&amp;request_id=165233374216781667894361&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-80428216-null-null.142^v9^pc_search_result_control_group,157^v4^new_style&amp;utm_term=postman&amp;spm=1018.2226.3001.4187</a></p></blockquote>`,53)]))}const m=a(o,[["render",p]]);export{b as __pageData,m as default};
