<template>
  <div class="aside-bar" :class="{close:isCollapse}">
    <a-layout-sider>

      <div class="gos-sidebar__logo" @click="onHome">
        <img :src="logo" class="gos-sidebar__logo-icon">
        <h1 class="gos-sidebar__logo-title">{{ name }} </h1>
      </div>

      <a-menu class="aside-bar-menu"
              :background-color="variables.sideBarBackgroundColor"
              :text-color="variables.sideBarTextColor"
              :active-text-color="variables.sideBarActiveTextColor"
              :default-openeds="['1', '2']"
              :default-active="onRoutes">

        <a-menu-item index="songs">
          <router-link class="menu-item-box" to="songs">
            <div>
              <wechat-outlined/>
              <a>歌曲管理</a>
            </div>
          </router-link>
        </a-menu-item>

        <a-menu-item index="stars">
          <router-link class="menu-item-box" to="stars">
            <div>
              <weibo-outlined/>
              <span>歌星管理</span>
            </div>
          </router-link>
        </a-menu-item>

        <a-menu-item index="subScreen">
          <router-link class="menu-item-box" to="subScreen">
            <div>
              <weibo-outlined/>
              <span>测试入口</span>
            </div>
          </router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

import variables from '../../styles/variables.scss'

export default {
  components: {},
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: '点歌后台'
    },
    logo: {
      type: String,
      default: 'https://gos-static.yqslmall.com/admin/merchant-logo.png'
    },
  },

  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      console.log(this.sidebar.opened)
      return this.sidebar.opened
    },
    onRoutes() {
      console.log(this.$route.path)
      let index = this.$route.path.replace("/admin", '')
      let title = this.$route.meta.title

      console.log("/admin" + index)

      //改变浏览器的title
      document.title = title
      return "/admin/" + index
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    variables() {
      return variables
    },
    onHome() {
      this.$router.push({
        path: '/admin/songs'
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables";

.aside-bar {
  background-color: $navBarBg;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.12); //阴影
  transition: width 0.28s;
  z-index: 4;
  overflow: hidden;
  width: 200px !important; //最大宽度

  .scrollbar-wrapper {
    height: calc(100vh - 50px) !important;

    .aside-bar-menu {
      border-right: 0 !important;

      .menu-item-box {
        text-decoration: none;
      }
    }
  }

  .gos-sidebar__logo {
    position: relative;
    height: 50px;
    line-height: 50px;
    background-color: #4784ff;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 22px;
    transition: all 0.3s;
    cursor: pointer;

    .gos-sidebar__logo-icon {
      width: 20px;
      height: 20px;
    }

    .gos-sidebar__logo-title {
      color: #fff;
      font-weight: 600;
      font-size: 19px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      margin: 0 0 0 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      transition: all 0.3s;
      opacity: 1;
    }
  }
}

.aside-bar.close {
  width: 64px !important; //最小宽堵
  .gos-sidebar__logo {
    padding-left: 22px;

    .gos-sidebar__logo-title {
      opacity: 0;
    }
  }
}
</style>
