import { mapGetters, createNamespacedHelpers } from "vuex";
import useMapper from "./useMapper";
export default function useGetters(mapper, moduleName) {
  moduleName = moduleName.trim();
  if (
    typeof moduleName === "string" &&
    moduleName.length > 0 &&
    moduleName !== null
  ) {
    const { mapGetters } = createNamespacedHelpers(moduleName);
    return useMapper(mapGetters, mapper);
  } else {
    return useMapper(mapGetters, mapper);
  }
}
