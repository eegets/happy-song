<template>
  <div class="gos-hamburger" @click="toggleSideBar">
    <menu-unfold-outlined v-if="opened"/>
    <menu-fold-outlined v-else/>
<!--    <i class="hamburger-icon" :class="opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>-->
  </div>
</template>

<script>
export default {
  name: 'gos-hamburger',
  data() {
    return {}
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  methods: {
    toggleSideBar() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.gos-hamburger {
  line-height: 50px;
  height: 100%;
  padding: 0 15px;
  float: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .hamburger-icon {
    color: #333;
    font-size: 20px;

    &:hover {
      color: #000;
    }
  }
}
</style>
