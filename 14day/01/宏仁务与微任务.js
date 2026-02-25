/** 
 * 宏仁务与微任务的区别
 * 宏仁务：setTimeout、setInterval、setImmediate、I/O、UI渲染
 * 微任务：Promise.then、MutationObserver、queueMicrotask、process.nextTick（Node）
 * 执行顺序：每轮事件循环先执行一个宏仁务、然后清空所有微任务，再进行渲染，再取下一个宏仁务
 */

console.log('1')
setTimeout(() => { console.log('2') }, 0);
Promise.resolve().then(() => { console.log('3') })
console.log('4');

// 1 4 3 2

// 铁律：同步 > 微任务 > 宏任务