/** 
 * 手写 Promise
 * - Promise 是一个状态机：pending -> fulfilled / pending -> rejected
 * - 需要实现 then 方法的链式调用和值穿透
 * - 处理异步和多次调用
 */
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    // 创建新 Promise，实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {

      // 情况A：当前已是 fulfilled 状态
      if (this.state === 'fulfilled') {
        setTimeout(() => {  // 必须异步执行，保证 promise2 已创建
          try {
            const x = onFulfilled(this.value); // 执行回调，获取返回值
            resolvePromise(promise2, x, resolve, reject);  // 关键：决定 promise2 的命运
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // ... 类似处理rejected和pending状态
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle'));
  }
  // 判断x是promise还是普通值
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    let called;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}