import { computed } from "vue";
import { useStore } from "vuex";
export default function useMapper(mapType, mapper) {
  const store = useStore();
  const storeFns = mapType(mapper);
  let mapStore = {};
  Object.keys(storeFns).forEach((keys) => {
    const fn = storeFns[keys].bind({ $store: store });
    mapStore[keys] = computed(fn);
  });
  if (Object.keys[mapper].length === 1) {
    return mapStore[mapper];
  }
  return mapStore;
}
