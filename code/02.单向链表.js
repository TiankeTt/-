/**  
 * 单向链表，新增/删除节点
 * A > B > C > D
 * 想新增，则把新节点放到 D.next 中即可
 * 例如想删除 B，则把 节点 A 的 next 指向 C 即可
 */
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // 新增节点
  append(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.size++;
      return
    }
    // 遍历找到最后一个 next 为null 的节点
    let current = this.head;
    while (current.next) {
      current = current.next
    }
    current.next = node;
    this.size++
  }

  // 删除节点
  remove(value) {
    if (!this.head) return
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--
      return
    }
    let current = this.head
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--
        return
      }
      current = current.next
    }
  }
}