class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}
let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const targetMap = new WeakMap();
function getDep(target, key) {
  //  WeakMap的key是一个对象，target是一个对象
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  // 根据依赖对象获取对应的dep
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

// vue3数据劫持
function reactive(raw) {
  return new Proxy(raw, {
    // target 就是raw
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return target[key];
    },
    set(target, key, newValue) {
      const dep = getDep(target, key);
      target[key] = newValue;
      dep.notify();
    },
  });
}

// c测试代码
// const dep = new Dep();
const info = reactive({ counter: 100, name: "why" });
const foo = reactive({ height: 1.88 });

// watchEffect1
watchEffect(function () {
  console.log("effect1:", info.counter * 2, info.name);
});

// watchEffect2
watchEffect(function () {
  console.log("effect2:", info.counter * info.counter);
});

// watchEffect3
watchEffect(function () {
  console.log("effect3:", info.counter + 10, info.name);
});

watchEffect(function () {
  console.log("effect4:", foo.height);
});

// info.counter++;
// info.name = "why";

foo.height = 2;
