
function createDOM(node) {

    // 하위 요소가 태그일 땐 객체로 들어오는데
    // 태그가 아니면 그냥 문자열로 들어옴
    console.log("node",node)
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    
    // DOM을 만들기 위해서는 DOM API를 써야한다
    // 태그를 만드는 API는 document.createElement
    const element = document.createElement(node.tag);
  
    node.children
      .map(createDOM)
      .forEach(element.appendChild.bind(element));
  
    return element;
  }
  
const vdom = {
  tag: 'p',
  props: {},
  children: [
    {
      tag: 'h1',
      props: {},
      children: ["React 만들기"],
    },
    {
      tag: 'ul',
      props: {},
      children: [
        {
          tag: 'li',
          props: {},
          children: ["첫 번째 아이템"]
        },
        {
          tag: 'li',
          props: {},
          children: ["두 번째 아이템"]
        },
        {
          tag: 'li',
          props: {},
          children: ["세 번째 아이템"]
        },
      ]
    },
    {
      tag: 'h2',
      props: {},
      children: ["Seung Hyuk"],
    },
  ],
};

// 생성된 DOM객체를 UI에 꽂는다
document
  .querySelector('#root')
  .appendChild(createDOM(vdom));  
  
  