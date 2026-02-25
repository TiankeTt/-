/** 
 * React Hooks 为什么不能写在条件语句中？
 * - React 内部用链表存储 Hooks 状态。
 * - 每个组件的 Fiber 节点上的 memoizedState 属性指向 Hooks 链表。
 * - 每次渲染时，按照顺序读取 Hooks，如果写在条件语句中，可能导致顺序错乱，后续 Hooks 取到错误的值。
 */

// Hooks存储结构
const fiberNode = {
  memoizedState: {
    value: '第一个useState的值',
    next: {
      value: "第二个useState的值",
      next: '...'
    }
  }
}

/** 
 * setState是同步还是异步？
 * - 取决于执行环境：
 *   - 异步：在 React 合成事件和生命周期中，开启批量处理（isBatchingUpdates = true）, 多个 setState 合并一次更新
 *   - 同步：在原生事件 (addEventListener)、setTimeout、Promise 中，无法进入批量处理，会同步更新
 * 
 * React 18中，使用 createRoot 后，默认所有更新都会自动批处理（包括 setTimeout内）
 */

// React 性能优化方法
// - 避免不必要的渲染：
// - - React.memo （函数组件）
// - - PureComponent （类组件，浅比较props 和 state）
// - - shouldComponentUpdate 手动控制

// - 使用不可变数据：方便浅比较
// - 列表使用key：且key要稳定唯一
// - 懒加载：React.lazy + Suspense
// - 使用 useMemo/useCallback：缓存计算结果和函数引用
// - 虚拟化长列表：react-window 或 react-virtualized