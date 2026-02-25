/** 防抖：触发后等待一段时间再执行，期间再次触发则重新计时 */
const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

/** 节流: 固定时间间隔内只执行一次 */

/** 时间戳版本（首执行） */
const throttle = (fn, delay) => {
  let last = 0;
  return function (...args) {
    const now = new Date();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args)
    }
  }

}

// 定时器版（尾执行）
const throttleTime = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  }
}


// | 场景               | 推荐版本 | 原因            |
// | :--------------- | :--- | :------------ |
// | **搜索框实时搜索**      | 时间戳版 | 用户输入立即响应，快速反馈 |
// | **按钮防重复提交**      | 时间戳版 | 立即反馈点击，防止狂点   |
// | **滚动加载更多**       | 定时器版 | 确保滚动停止后再加载    |
// | **窗口 resize 调整** | 定时器版 | 调整结束后才计算布局    |
// | **鼠标移动 tooltip** | 时间戳版 | 跟随鼠标，不能延迟     |
