import { inject } from "vue";
import { defaultStore, Store } from "./store";
function createStore(options) {
  return new Store(options);
}
function useStore(key = null) {
  return inject(key || defaultStore);
}

export { createStore, useStore };
