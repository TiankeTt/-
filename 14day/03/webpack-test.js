// Webpack 热更新原理
// 核心流程：
// 1. 启动阶段： Webpack Compile 打包构建，生成 HMR Runtime 注入到浏览器
// 2. 文件变化： Webpack 监听到文件变化，重新编译，通知 HMR Server
// 3. 通知浏览器：通过 WebSocket 发送 hash 和 ok 事件
// 4. 请求更新：浏览器发送 [hash].hot-update.json 和 [hash].hot-update.js 请求
// 5. 模块替换：HMR Runtime 接手新模块，执行 hot.accept 回调，更新代码
// 关键点：不刷新页面，只替换变化的模块，保持应用状态。

// Vite 为啥比 Webpack 快
// 1. 利用 ES 模块：开发环境无需打包，浏览器直接请求模块，按需编译
// 2. esbuild预加载