import { h, ref } from "vue";
let Vue;
class VueRouter {
  constructor(options) {
    this.routes = options.routes;
    this.mode = options.mode || "hash";
    this.routePath = ref(options.current);
    this.init();
  }
  install(_vue) {
    const router = this
    Vue = _vue;
    Vue.config.globalProperties.$router = router;
    // 全局注册组件
    Vue.component("router-link", {
      props: {
        to: {
          type: String,
          require: true,
        },
      },
      render() {
        if (this.$router.mode ==='history') {
          return h(
            "a",{
              href:this.to,},
            this.$slots
          );
        }
        return h(
          "a",{
            href: "#" + this.to,},
          this.$slots
        );
      },
    });

    Vue.component("router-view", {
      render() {
        let current = this.$router.routePath.value;
        if (!current) {
          current = "/";
        }
        let routes = this.$router.routes;
        const route = routes.find((route) => {
          return current === route.path;
        });
        return h(route.component);
      },
    });
  }
  init() {
    if (this.mode === "hash") {
      window.addEventListener("load", () => {
        this.routePath.value = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.routePath.value = location.hash.slice(1);
      });
    }else{
      window.addEventListener("load", () => {
        this.routePath.value = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.routePath.value = location.pathname;
      });
    }
  }
}

export default VueRouter;
