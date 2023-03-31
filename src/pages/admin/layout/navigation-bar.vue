<template>
  <a-layout-header class="navbar">
    <hamburger id="hamburger-container" :opened="opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <a-button @click="changeFront">切换到前台</a-button>
    </div>
  </a-layout-header>
</template>

<script>

import { mapGetters } from 'vuex'
import Hamburger from "../../../components/Hamburger";
export default {
  name: "navigationBar",
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),

    opened() {
      return this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar")
    },
    changeFront() {
      this.$router.push("/")
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
.navbar {
  height: $navBarHeight !important;
  background-color: $navBarBg !important;
  padding: 0;
  width: 100%;
  position: relative;
  .hamburger-container {
    line-height: $navBarHeight;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .right-menu {
    display: flex;
    float: right;
    height: 100%;
  }
}
</style>
