<template>
  <div class="subScreen">
    <a-button type="primary" @click="openScreen">打开拓展屏</a-button>
    <div class="subMessage">
      <a-textarea
        v-model:value="state.message"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
      <a-button type="primary" :disabled="state.message.length === 0" @click="transferSub">中转发送</a-button>
      <a-button type="primary" :disabled="state.message.length === 0" @click="directSub">直接发送</a-button>
    </div>
    <div @click="next()">切歌</div>
    <div @click="muted">静音</div>
    <div @click="original">原唱</div>
    <div @click="fllow">伴唱</div>
    <div @click="again">重唱</div>
    <div @click="pause">暂停</div>
    <div @click="play">播放</div>
    <div @click="volDown">音量-</div>
    <div @click="volUp">音量+</div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
const { remote } = require('electron')

export default defineComponent({
  setup() {
    const state = reactive({
      open: true,
      message: ''
    })

    const songReact = {
      type: "",
      url: "",
    }

    const { proxy } = getCurrentInstance()
    const { $message } = proxy
    async function openScreen() {
      await window.ipcRenderer.invoke('win-subScreen', {
        open: state.open,
        path: '#/subScreen'
      })
      state.open = !state.open
    }
    function transferSub() {
      window.ipcRenderer.invoke('win-subScreen-message', state.message)
    }
    function directSub() {
      const subScreen = remote.getGlobal('sharedObject').subScreen
      if (subScreen) {
        window.ipcRenderer.sendTo(subScreen.webContents.id, 'main-subScree', state.message)
      }
    }
    //切歌
    function next() {
      songReact.type = "next"
      songReact.url = "/Users/wangkai/Downloads/mkv/746 这些年来 - 张国荣.mkv"

      sendSubScreen()
    }

    //静音
    function muted() {
      songReact.type = "muted"
    }

    //重唱
    function again() {
      songReact.type = "next"
      songReact.url = "/Users/wangkai/Downloads/mkv/746 这些年来 - 张国荣.mkv"

      sendSubScreen()
    }

    //暂停
    function pause() {
      songReact.type = "pause"

      sendSubScreen()
    }

    //播放
    function play() {
      songReact.type = "play"

      sendSubScreen()
    }

    //音量-
    function volDown() {
      songReact.type = "volDown"

      sendSubScreen()
    }

    //音量+
    function volUp() {
      songReact.type = "volUp"

      sendSubScreen()
    }

    function sendSubScreen() {
      const subScreen = remote.getGlobal('sharedObject').subScreen
      if (subScreen) {
        window.ipcRenderer.sendTo(subScreen.webContents.id, 'main-subScree', songReact)
      }
    }

    onMounted(() => {
      window.ipcRenderer.on('subScree-main', (_event, data) => {
        $message.success(data)
      })
    })
    onUnmounted(() => {
      window.ipcRenderer.removeAllListeners('subScree-main')
    })

    return {
      openScreen,
      transferSub,
      directSub,
      state,
      next,
      muted,
      again,
      pause,
      play,
      volDown,
      volUp,

    }
  }
})
</script>

<style lang="scss" scoped>
.subScreen {
  .subMessage {
    margin: 20px;
    button {
      margin-top: 20px;
      margin-right: 20px;
    }
  }
}
</style>
