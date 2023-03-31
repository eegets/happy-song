<template>
  <div class="subScreen">类型：{{songReact.type }}</div>
  <div class="subScreen">链接：{{songReact.url }}</div>
  <div>我是扩展屏幕</div>
  <div>我是扩展屏幕新版</div>

  <video-player :options="videoOptions" ref="refVideoPlayer"/>

</template>

<script>
import {defineComponent, reactive, onMounted, onUnmounted, ref} from 'vue'
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
const { remote } = require('electron')

export default defineComponent({
  components: {VideoPlayer},
  setup() {
    const state = reactive({
      message: ''
    })

    const songRef = ref({
      type: "",
      url: "",
    })
    // 定义一个对象关联上子组件的 ref 值（注意：这里的属性名必须跟子组件定义的 ref 值一模一样，否者会关联失效）
    const refVideoPlayer = ref(null)

    //存储当前声音，每次加减0.1, 不能超过1.0
    let volume = 0.0

    const videoOptions = reactive({
      //自动播放属性, muted: 静音播放，
      autoplay: true,
      // controls: true,
      width: 10,
      height: 5,
      preload: "auto",
      sources: [
        {
          src: "atom:///Users/wangkai/Downloads/mkv/711 试着了解 - 万芳.mkv",
          type: "video/mp4",
        }
      ]
    })

    onMounted(() => {
      const win = remote.getGlobal('sharedObject').win
      window.ipcRenderer.on('renderer-subScreen-message', (_event, data) => {
        state.message = data
        window.ipcRenderer.sendTo(win.webContents.id, 'subScree-main', '我收到了中转发送信息')
      })
      // window.ipcRenderer.on('main-subScree', (_event, data) => {
      //   state.message = data
      //   window.ipcRenderer.sendTo(win.webContents.id, 'subScree-main', '我收到了直接发送信息')
      // })
      window.ipcRenderer.on('main-subScree', (_event, data) => {
        songRef.value = data
        if ("volUp" === songRef.value.type) {
          if (volume < 1) {
            volume = volume + 0.1
          }
          refVideoPlayer.value.setVolume(volume)
        } else if ("volDown" === songRef.value.type) {
          if (volume > 0.1) {
            volume = volume - 0.1
          }
          refVideoPlayer.value.setVolume(volume)
        } else if ("muted" === songRef.value.type) {
          refVideoPlayer.value.setMuted(true)
        } else if ("sound" === songRef.value.type) {
          refVideoPlayer.value.setMuted(false)
        } else if ("pause" === songRef.value.type) {
          refVideoPlayer.value.setPause()
        } else if ("play" === songRef.value.type) {
          refVideoPlayer.value.setPlay()
        } else if ("again" === songRef.value.type) {
          refVideoPlayer.value.setRestart()
        }
        window.ipcRenderer.sendTo(win.webContents.id, 'subScree-main', "我收到了直接发送信息")
      })
    })
    onUnmounted(() => {
      window.ipcRenderer.removeAllListeners('renderer-subScreen-message')
      window.ipcRenderer.removeAllListeners('main-subScree')
    })
    return {
      state,
      videoOptions,
      songRef,
      refVideoPlayer,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
