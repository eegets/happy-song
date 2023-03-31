import Cookies from "js-cookie"

/**
 * 缓存容器 -> 管理状态、共享数据
 * 在vue中，store用于管理状态、共享数据以及在各个组件之间管理外部状态，store是vuex应用的核心，也就是一个容器，包含着应用中大部分的状态，更改store中的状态唯一方法是提交mutation。
 *
 * 解释文章
 * https://www.lacode.net/archives/162
 * https://www.php.cn/vuejs/489293.html
 */
const app = {
  state: {
    //获取 sidebar opened 为 true / false
    sidebar: {
      // `Cookies.get('gos-platform-sidebarStatus')`获取到的是数字 0 或者 1，!!+0表示：false, !!+1表示：true
      opened: Cookies.get("gos-sidebarStatus") ? !!+Cookies.get('gos-sidebarStatus') : true,
      // 动画效果
      withoutAnimation: false
    }
  },
  getters: {
  },

  mutations: {
    //切换 sidebar
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set("gos-sidebarStatus", 1)
      } else {
        Cookies.set("gos-sidebarStatus", 0)
      }
    },
    //关闭 Sidebar
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set("gos-sidebarStatus", 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },

  //处理异步任务
  actions: {
    toggleSideBar ({ commit }) {
      commit("TOGGLE_SIDEBAR")
    },

    closeSideBar ({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation)
    }
  }
}


export default app
