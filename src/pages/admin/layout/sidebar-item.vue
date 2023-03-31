<template>
  <div class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <a-menu-item :index="resolvePath(onlyOneChild.path)">
        <i :class="onlyOneChild.meta.icon"></i>
        <span slot="title">{{onlyOneChild.meta.title}}</span>
      </a-menu-item>
    </template>
    <a-sub-menu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <template v-for="child in item.children">
        <template v-if="child.children && child.children.length>0">
          <sidebar-item :item="child" :key="child.name" :base-path="resolvePath(child.path)" />
        </template>
        <template v-else>
          <a-menu-item :index="resolvePath(child.path)" :key="child.name">
            <i :class="child.meta.icon"></i>
            <span slot="title">{{child.meta.title}}</span>
          </a-menu-item>
        </template>
      </template>
    </a-sub-menu>
  </div>
</template>

<script>

import path from 'path'
import { isExternal } from '../../../utils'

export default {
  name: 'SidebarItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      // When there is only one child router, the child router is displayed by default
      if (children.length === 1) {
        this.onlyOneChild = children[0]
        return true
      }
      // Show parent if there are no child router to display
      if (children.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink (routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
