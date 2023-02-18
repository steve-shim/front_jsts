
export function createDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value));

  node.children
    .map(createDOM)
    .forEach(element.appendChild.bind(element));

  return element;
}

export function createElement(tag, props, ...children) {
  // props에 null이 들어왔을 때 방어코드
  props = props || {};
  console.log("{ tag, props, children }",{ tag, props, children })
  return { tag, props, children };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));  
}
