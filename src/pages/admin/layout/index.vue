<template>
  <a-layout class="app-layout">
    <sidebar />
    <a-layout class="app-content">
      <navigation-bar />
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

import Sidebar from "./sidebar";
import NavigationBar from "./navigation-bar";
export default {
  name: 'layout',
  components: {
    NavigationBar,
    Sidebar
  },
  computed: {

  },
  methods: {
    changeFront() {
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  .app-content {
    width: 100%;
  }
}
</style>
