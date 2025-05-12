class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 触发事件并调用所有监听器
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移出事件
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }

    // 如果没有了则删除该事件
    if (this.events[eventName].length === 0) {
      delete this.events[eventName]
    }
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      callback(...args)
    }
    this.on(eventName, wrapper)
  }
}
// 使用示例
const eventEmitter = new EventEmitter();

eventEmitter.on("event", (data) => console.log("on:", data));
eventEmitter.once("event", (data) => console.log("once:", data));
eventEmitter.emit("eventOnce", "Hello, World!"); // 输出: on: Hello, World! 和 once: Hello, World!
eventEmitter.emit("event", "Hello again!"); // 只输出: on: Hello again!
eventEmitter.emit("event", "Hello again!"); // 只输出: on: Hello again!
eventEmitter.emit("event", "Hello again!"); // 只输出: on: Hello again!
eventEmitter.emit("eventOnce", "Hello, World!"); // 输出: on: Hello, World! 和 once: Hello, World!
