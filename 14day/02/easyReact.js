// 极简版React（仅演示核心思想）
function render(vnode, container) {
  // vnode -> dom
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.props) {
    Object.keys(vnode.props)
      .filter(key => key !== 'children')
      .forEach(key => dom[key] = vnode.props[key]);
  }

  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }

  container.appendChild(dom);
}

// 使用
const vdom = {
  tag: 'div',
  props: { id: 'app' },
  children: [
    'Hello ',
    { tag: 'b', children: ['World'] }
  ]
};
render(vdom, document.getElementById('root'));