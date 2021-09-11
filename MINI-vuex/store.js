let defaultStore = "defaultStore";
import { getKeyValue } from "./util";
import { reactive } from "vue";
class Store {
  constructor(options) {
    this.state = reactive(options.state());
    let getters = options.getters;
    this.getters = {};
    // getters
    getKeyValue(getters, (key, value) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return value(this.state);
        },
      });
    });

    //mutations
    let mutations = options.mutations;
    this.mutations = {};
    getKeyValue(mutations, (key, value) => {
      this.mutations[key] = (data) => {
        return value(this.state, data);
      };
    });

    // actions
    let actions = options.actions;
    this.actions = {};
    getKeyValue(actions, (key, value) => {
      this.actions[key] = (data) => {
        return value(this, data);
      };
    });
  }
  commit = (key, data) => {
    this.mutations[key](data);
  };
  dispatch = (key, data) => {
    this.actions[key](data);
  };
  get = () => {
    return this.state;
  };
  install(app, key) {
    //给vue实例对象原型添加store对象
    app.config.globalProperties.$store = this;
    // 将store对象传入组件
    app.provide(key || defaultStore, this);
  }
}

export { defaultStore, Store };
