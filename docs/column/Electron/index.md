
- ## 项目：electron+vue3+ts
- ### 项目背景：客户的WMS系统是安装在终端机上，需要把h5页面挂载到客户端上，实现客户操作。electron刚好可以解决这个问题，而且学习成本不高。并且使用了neginx 实现静态文件服务，实现h5页面挂载到客户端端，客户在内网即可使用
   
### 1.electron框架如何实现把h5页面挂载到客户端？

- ## 实现原理

  Electron通过**主进程**创建窗口，并在**渲染进程**中加载H5页面，同时支持：

  - Chromium内核渲染网页
  - Node.js访问系统API
  - 跨进程通信（IPC）

  ------

  ## 具体实现步骤

  ### 方案一：加载本地HTML文件 win.loadFile('src/index.html') 

  javascript

  ```javascript
  // main.js（主进程）
  const { app, BrowserWindow } = require('electron')
  
  function createWindow() {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true  // 启用Node.js集成
      }
    })
    
    // 加载本地文件
    win.loadFile('src/index.html') 
  }
  
  app.whenReady().then(createWindow)
  ```

  ### 方案二：加载远程URL win.loadURL('https://your-web-app-domain.com')

  javascript

  ```javascript
  // 主进程修改加载方式
  win.loadURL('https://your-web-app-domain.com')
  
  // 需要处理跨域问题时
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*']
      }
    })
  })
  ```

  ------

  ## 核心配置项

  ### 1. 窗口配置参数

  |     参数      |     说明     | 示例值  |
  | :-----------: | :----------: | :-----: |
  |    `width`    |   窗口宽度   | `1200`  |
  |   `height`    |   窗口高度   |  `800`  |
  |    `frame`    | 是否显示边框 | `false` |
  | `transparent` |   窗口透明   | `true`  |

  ### 2. 安全配置建议

  javascript

  ```javascript
  new BrowserWindow({
    webPreferences: {
      contextIsolation: true,  // 启用上下文隔离
      sandbox: true,           // 启用沙箱模式
      preload: path.join(__dirname, 'preload.js')  // 预加载脚本
    }
  })
  ```

  ------

  ## 打包部署

  ### 使用electron-builder

  ------

  ## 常见问题排查

  ### 1. 页面白屏

  - ✅ 检查文件路径是否正确
  - ✅ 开启开发者工具调试

  javascript

  ```javascript
  win.webContents.openDevTools()
  ```

  ### 2. 性能优化

  javascript

  ```javascript
  // 禁用GPU加速（低配设备）
  app.disableHardwareAcceleration()
  
  // 启用内存优化
  win.webContents.on('dom-ready', () => {
    win.webContents.setZoomFactor(1.0)
  })
  ```



### 2.Electron 本地交互实现指南（文件读写篇）

Electron 通过主进程（Main Process）与渲染进程（Renderer Process）的分工协作实现本地系统交互。文件读写等敏感操作需通过主进程完成，渲染进程通过 IPC（进程间通信）机制与主进程交互。

---

#### 一、核心实现原理

##### 1. 进程分工

- **主进程**：拥有完整 Node.js 环境，可直接使用 `fs` 模块操作文件系统
- **渲染进程**：运行在浏览器环境，需通过 IPC 向主进程发起文件操作请求

##### 2. IPC 通信机制

- **ipcMain**：主进程监听器
- **ipcRenderer**：渲染进程触发器
- **Context Bridge**：安全暴露 API 的桥梁

---

#### 二、文件读写实现步骤

##### 1. 基础文件操作

```javascript
// 主进程（main.js）
const fs = require('fs');
ipcMain.on('read-file', (event, path) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    event.sender.send('file-content', data);
  });
});

// 渲染进程（preload.js）
contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (path) => ipcRenderer.send('read-file', path),
  onFileContent: (callback) => ipcRenderer.on('file-content', callback)
});
```

##### 2. 文件对话框集成

```javascript
// 渲染进程调用文件选择器
const { dialog } = require('electron').remote;
dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
}).then(result => {
  if (!result.canceled) {
    const path = result.filePaths[0];
    window.electronAPI.readFile(path);
  }
});
```

##### 3. 实时文件监听

使用 `chokidar` 库实现目录监控：

```javascript
// 主进程
const chokidar = require('chokidar');
ipcMain.on('watch-directory', (event, path) => {
  const watcher = chokidar.watch(path, {
    persistent: true,
    ignoreInitial: true
  });

  watcher.on('all', (eventType, filePath) => {
    event.sender.send('file-change', { type: eventType, path: filePath });
  });
});
```

---

#### 三、安全配置要点

1. ##### **预加载脚本配置**：

```javascript
// 创建 BrowserWindow 时配置
new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})
```

2. **权限控制**：

- 使用 `path.join()` 处理路径拼接
- 验证用户选择的文件路径
- 限制可访问目录范围

---

#### 四、扩展方案推荐

| 方案类型   | 实现方式                | 适用场景       |
| ---------- | ----------------------- | -------------- |
| 原生存储   | `electron-store` 模块   | 应用配置存储   |
| 数据库方案 | SQLite + `knex.js`      | 结构化数据存储 |
| 自动化操作 | `fs-extra` 扩展库       | 复杂文件操作   |
| 二进制处理 | `Buffer` + `Stream` API | 大文件分块处理 |

---

#### 五、最佳实践建议

1. ##### **遵循最小权限原则**：渲染进程不应直接访问 `fs` 模块

2. ##### **错误处理标准化**：统一封装错误码和提示信息

3. ##### **性能优化**：大文件操作使用流式处理

4. ##### **多进程通信**：采用 `invoke/handle` 模式替代单向事件

通过合理运用 IPC 通信机制与 Node.js 原生模块，开发者可以构建安全高效的本地文件交互系统。建议结合官方文档与社区最佳实践进行深度定制。

### 3.Electron 主进程与渲染进程的区别

Electron 的主进程（Main Process）和渲染进程（Renderer Process）是其多进程架构的核心组成部分，两者的区别主要体现在以下方面：

---

#### 1. **职责与功能**

- **主进程**  
  - **唯一性**：每个 Electron 应用有且仅有一个主进程[1,2,4](@ref)。
  - **核心管理**：负责应用的生命周期（启动、退出等）、创建/管理窗口（通过 `BrowserWindow`）、与操作系统交互（如文件系统、菜单栏、对话框等）[1,2,4](@ref)。
  - **系统级操作**：可以访问 Node.js 和 Electron 的所有 API，执行底层任务（如网络请求、加密数据操作）[2,6,7](@ref)。

- **渲染进程**  
  - **多实例性**：每个窗口对应一个独立的渲染进程[1,2,4](@ref)。
  - **界面展示**：负责渲染网页内容（HTML/CSS/JavaScript），处理用户交互（如按钮点击、表单输入）[1,2,4](@ref)。
  - **限制性**：默认无法直接访问 Node.js API（需通过预加载脚本或配置 `nodeIntegration`）[2,5,7](@ref)。

---

#### 2. **运行环境**

- **主进程**  
  - 运行在 **Node.js 环境**中，支持所有 Node.js 模块（如 `fs`、`path`）[1,6,7](@ref)。
  - 可以通过 `ipcMain` 模块监听来自渲染进程的消息[2,3,9](@ref)。

- **渲染进程**  
  - 运行在 **Chromium 浏览器环境**中，支持 Web API（如 DOM 操作、Fetch API）[1,7,9](@ref)。
  - 通过 `ipcRenderer` 模块向主进程发送消息[2,3,7](@ref)。

---

#### 3. **通信机制**

- **进程间通信（IPC）**  
  - **主进程 → 渲染进程**：通过 `BrowserWindow.webContents.send()` 发送消息[2,7,9](@ref)。
  - **渲染进程 → 主进程**：通过 `ipcRenderer.send()` 发送消息，主进程通过 `ipcMain.on()` 监听[2,3,9](@ref)。
  - **预加载脚本（Preload Script）**：在渲染进程中桥接 Node.js 功能，通过 `contextBridge.exposeInMainWorld()` 安全暴露 API[5,7,9](@ref)。

---

#### 4. **安全性与隔离**

- **主进程**  
  - 可执行敏感操作（如文件读写、系统命令），需避免直接暴露给用户界面[2,4,7](@ref)。

- **渲染进程**  
  - 默认启用 **上下文隔离（Context Isolation）**，防止渲染进程直接访问 Node.js 全局对象[5,7,9](@ref)。
  - 通过预加载脚本限制可访问的 API，避免安全漏洞[5,7,9](@ref)。

---

#### 5. **典型应用场景**

- **主进程**  

  - 创建窗口、注册全局快捷键、处理系统托盘图标[1,2,7](@ref)。

  - 示例代码：

    ```javascript
    const { app, BrowserWindow } = require('electron');
    app.whenReady().then(() => {
      const win = new BrowserWindow({ width: 800, height: 600 });
      win.loadFile('index.html');
    });
    ```

- **渲染进程**  

  - 实现动态 UI 效果、响应用户输入、调用主进程功能。

  - 示例代码：

    ```javascript
    // 预加载脚本中暴露 API
    contextBridge.exposeInMainWorld('electronAPI', {
      openFile: () => ipcRenderer.invoke('dialog:openFile')
    });
    ```

---

#### 总结

主进程是 Electron 应用的“大脑”，负责全局管理和系统交互；渲染进程则是“界面引擎”，专注用户交互和内容展示。两者通过 IPC 实现松耦合通信，同时通过安全机制（如预加载脚本）平衡功能与安全性[1,2,7,9](@ref)。

### 4.Electron 进程间通信与更新机制详解

#### 一、Electron 进程间通信（IPC）

#### 1. 基础通信模块

Electron 通过 `ipcMain`（主进程）和 `ipcRenderer`（渲染进程）模块实现进程间通信，支持单向和双向消息传递[1,2](@ref)。

#### （1）渲染进程 → 主进程

- **单向通信**  

  ```javascript
  // 渲染进程（使用预加载脚本）
  contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('msg-channel', message)
  });
  
  // 主进程
  ipcMain.on('msg-channel', (event, message) => {
    console.log('Received:', message);
  });
  ```

- 双向通信使用

  ```
  ipcRenderer.invoke
  ```

  与

  ```
  ipcMain.handle
  ```

   

  实现异步请求-响应模式javascript

  ```javascript
  // 渲染进程
  const result = await window.electronAPI.getData();
  
  // 主进程
  ipcMain.handle('get-data', async () => {
    return fetchDataFromDB();
  });
  ```

#### （2）主进程 → 渲染进程

通过 `webContents.send` 主动推送消息：

javascript

```javascript
// 主进程
win.webContents.send('update-notify', { status: 'ready' });

// 渲染进程
ipcRenderer.on('update-notify', (event, data) => {
  console.log('Update:', data.status);
});
```

#### 2. 高级通信场景

- 上下文隔离：通过预加载脚本（Preload）使用

  ```
  contextBridge
  ```

   安全暴露 API，避免直接暴露 Node.js 能力到渲染进程

- **多窗口通信**：主进程作为中介，转发不同渲染进程的消息。

------

### 5.Electron 应用更新机制

##### 1. 使用 `electron-updater` 实现自动化更新

###### （1）核心流程

1. 检查更新：应用启动时请求更新服务器，比对版本号（如

   ```
   semver库
   ```

2. 下载更新：支持全量更新（完整安装包）和增量更新（基于内容分块的差异下载）

3. **应用更新**：静默安装并重启应用。

###### （2）配置示例

javascript

```javascript
// 主进程配置
autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'my-app',
  owner: 'user'
});

autoUpdater.checkForUpdatesAndNotify();
```

###### （3）高级特性

- 灰度发布：通过 GUID 哈希控制部分用户优先更新。
- 安全验证：使用 SHA512 校验文件完整性，HTTPS 加密传输。
- 错误处理：网络重试、回滚机制、日志记录（如 Winston 库）

##### 2. 更新策略优化

- 增量更新：利用blockmap文件识别差异块，减少下载量（如 CDC 分块算法）。
- **CDN 加速**：将更新文件托管到云存储（如 AWS S3、阿里云 OSS）。
- CI/CD 集成：通过 GitHub Actions 或 Jenkins 实现自动构建和发布

------

##### 3.总结

|     模块     |                            关键点                            |
| :----------: | :----------------------------------------------------------: |
| **IPC 通信** | 使用 `ipcMain`/`ipcRenderer`，区分单向/双向通信，优先采用上下文隔离 |
| **自动更新** | 依赖 `electron-updater`，支持全量/增量更新，需处理错误和安全性 |
| **性能优化** |            增量更新减少带宽消耗，并行下载提升速度            |
| **安全实践** |            校验文件哈希，HTTPS 加密，避免降级攻击            |
