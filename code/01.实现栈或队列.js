/** 
 * 栈    先进后出  可以利用数组的 push 和 pop 实现
 * 队列  先进先出   可以利用数组的 push 和 unshift() 实现
 */

/** 栈
 *  栈是一种后进先出（LIFO）的数据结构。它的主要方法包括：
    push(item)：将一个元素添加到栈顶。
    pop()：移除栈顶元素，并返回该元素。
    peek()：返回栈顶元素，但不移除它。
    isEmpty()：检查栈是否为空。
    size()：返回栈中元素的数量。
 */
class Stack {
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    if (this.isEmpty()) throw new Error("pop from empty stack");
    this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      throw new Error("peek from empty stack");
    }
    return this.items[this.items.length - 1];
  }

  /** 查看栈的大小 */
  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0
  }
}

/** 
 *  队列（Queue）
    队列是一种先进先出（FIFO）的数据结构。它的主要方法包括：
    enqueue(item)：将一个元素添加到队列的末尾。
    dequeue()：移除队列的第一个元素，并返回该元素。
    front()：返回队列的第一个元素，但不移除它。
    back()：返回队列的最后一个元素，但不移除它。
    isEmpty()：检查队列是否为空。
    size()：返回队列中元素的数量。
 */

class Queue {
  constructor() {
    this.items = []
  }

  /** enqueue 入队 */
  enqueue(element) {
    this.items.push(element)
  }

  /** 移除队列的第一个元素 */
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("This Queue Is Empty")
    }
    return this.items.shift();
  }

  /** 返回队列第一个元素 */
  front() {
    if (this.isEmpty()) {
      throw new Error("This Queue Is Empty")
    }
    return this.items[0]
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.items[this.items.length - 1];
  }

  /** 检查队列是否为空 */
  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length
  }
}