// 实现h函数创建vNode
const h = (tag, props, children) => {
  return {
    tag,
    props,
    children,
  };
};

const mount = (vNode, container) => {
  // 创建元素
  const el = (vNode.el = document.createElement(vNode.tag));
  if (vNode.props) {
    // 处理props
    for (const key in vNode.props) {
      const value = vNode.props[key];
      // 以on开头的字符串 startsWith 是否on开头的字符串
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      }
      el.setAttribute(key, value);
    }
  }
  // 处理children
  if (typeof vNode.children === "string") {
    el.textContent = vNode.children;
  } else {
    vNode.children.forEach((item) => {
      mount(item, el);
    });
  }
  // 挂载到 container
  container.appendChild(el);
};

const patch = (n1, n2) => {
  // 判断新旧vnode类型
  if (n1.tag !== n2.tag) {
    const n1Elparent = n1.el.parentElement;
    console.log(n1Elparent);
    n1Elparent.removeChild(n1.el);
    mount(n2, n1Elparent);
  } else {
    const el = (n2.el = n1.el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        }
        el.setAttribute(key, newValue);
      }
    }
    // 删除旧的props
    // for (const key in oldProps) {
    //   if (!Object.hasOwnProperty.call(newProps, key)) {
    //     if (key.startsWith("on")) {
    //       const value = oldProps[key];
    //       el.removeEventListener(key.slice(2).toLowerCase(), value);      
    //     } else {
    //       el.removeAttribute(key);
    //     }
    //   }
    // }

    // 2.2.删除旧的props
    for (const key in oldProps) {
      if (key.startsWith("on")) { // 对事件监听的判断
        const value = oldProps[key];
        el.removeEventListener(key.slice(2).toLowerCase(), value)
      } 
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // 处理children

    const oldChildren = n1.children || {};
    const newChildren = n2.children || {};
    // 情况一 children是string
    if (typeof newChildren === "string") {
      if (newChildren !== oldChildren) {
        el.textContent = newChildren;
      }
      el.innerHTML = newChildren;
    } else {
      // 情况: children是array
      // 1.oldChildren是string
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((item) => {
          mount(item, el);
        });
      } else {
        // 2.oldChildren是array
        const minLength = Math.min(oldChildren.length, newChildren.length);
        console.log(minLength);
        for (let i = 0; i < minLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // oldChildren.length与newChildren.length不同
        // 挂载新的vnode
        if (oldChildren.length < newChildren.length) {
          newChildren.slice(minLength).forEach((item) => {
            mount(item, el);
          });
        } else {
          // 卸载oldChildren多的el
          oldChildren.slice(minLength).forEach((item) => {
            el.removeChild(item.el);
          });
        }
      }
    }
  }
};
