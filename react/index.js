const React = {
  createElement,
  render
}

// 1. createElement
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        typeof child == "object" ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// 2. render
function render(element, container) {
  // element가 TEXT_ELEMENT인 경우 텍스트 노드를 생성하고, 그렇지 않은 경우 element.type에 해당하는 HTML 요소를 생성
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });

  // 자식 요소들을 재귀적으로 render 함수를 호출하여 DOM 요소에 추가
  element.props.children.forEach(child => render(child, dom));

  container.appendChild(dom);
}

export default React;