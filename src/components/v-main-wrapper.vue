<template>
  <!-- <div :class="isAdminPage ? 'w-4/5 ml-auto px-12 py-6 ' : 'v-main-wrapper mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'"> -->
  <div
    :class="
      isHomePage
        ? 'first__page'
        : isAdminPage
        ? 'w-4/5 ml-auto px-12 py-6'
        : 'v-main-wrapper mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'
    "
  >
    <vHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import "@/assets/tailwind.css";

import vHeader from "@/components/layouts/v-header";

export default {
  name: "v-main-wrapper",
  components: {
    vHeader,
  },
  props: {},
  data() {
    return {
      title: "Main wrapper",
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "isAuthenticated", "role", "user"]),

    isAdminPage() {
      return this.$route.path.includes("/admin");
    },
    isHomePage() {
      return this.$route.path === "/" || this.$route.path === "/home";
    },
    //     wrapperClass() {
    //   if (this.isAdminPage) {
    //     return 'w-4/5 ml-auto px-12 py-6';
    //   } else if (this.isHomePage) {
    //     return '';
    //   } else {
    //     return 'v-main-wrapper mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8';
    //   }
    // },
  },
  methods: {},
  watch: {},
  mounted() {},
};
</script>
<style lang="scss">
@import "@/assets/styles/style.scss";
</style>
