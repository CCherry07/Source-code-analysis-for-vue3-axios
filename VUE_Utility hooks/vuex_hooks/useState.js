import { mapState, createNamespacedHelpers } from "vuex";
import useMapper from "./useMapper";
export default function useState(mapper, moduleName) {
  moduleName = moduleName.trim();
  if (typeof moduleName === "string" && moduleName.length > 0) {
    const { mapState } = createNamespacedHelpers(moduleName);
    return useMapper(mapState, mapper);
  } else {
    return useMapper(mapState, mapper);
  }
}
