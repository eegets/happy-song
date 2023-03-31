
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20cb6b50b89241558bb3ca5e8c37a8e1~tplv-k3u1fbpfcp-watermark.image?)

# 初衷

最近家里买了一台可以在院里子看电影的投影仪，正好家里也有一台搁置许久的Windows电脑，看电影的同时每隔一段时间喝点小酒会在晚上吃完饭的时间和家人一起高歌几曲，之前用的是酷狗音乐，每次点歌都需要一个人专门在电脑跟前操作等着搜索切换下一首，而且有的歌曲还没有伴唱功能，简直不能忍，另外吐槽一下国内的这些个软件，要不就是在线的收会员费，要不就是需要买一台点歌机上千块。找来找去网上一直没有一个好的可以运行在电脑端的免费的点歌软件(有一个叫[阿蛮歌霸](http://www.amanktv.cn/)点歌软件)，但是安装上之后各种问题，果断放弃。 一次哥几个一起唱歌，有人说你不是搞技术的吗?自己不能写一个点歌软件吗？想想也对，于是乎第二天立马就开始着手干了。

# 歌曲从哪里来
歌曲很简单, 打开尘封已久的拼夕夕软件搜索一番，太好了，果然有歌曲打包售卖， 最终和商家的软磨硬泡下花了十八块大洋在拼夕夕上买了10万首歌在线歌曲，果断全部下载到电脑上，现在歌曲已有，只等待点歌软件开发完成。

# 技术选型很重要


### Flutter选型失败

Flutter大神别喷我

本人是Android出身，又知道Flutter是跨平台的， 所以在没有调研的情况下果断选择Flutter了开始搞，之前对Flutter也是没怎么了解过,所以就是边学习边做，看的最多的文章就是 [《Flutter实战·第二版》](https://book.flutterchina.club/)，花了一个月的时间开发了Flutter版本的点歌系统，基本实现了点歌机的所有的功能，包括播放、数据库增删改查、切歌、重唱等, 但是忽略了最最重要的一点`拓展投屏`，因为Flutter官宣支持Windows不久，所以想要实现电脑和投影之间的扩展屏幕就需要自行编写调用Windows的相关API，但是我对Windows开发是完完全全的不懂，导致Flutter的实现被迫终止。

点歌软件最终没实现，但也不是一无所获，对于Flutter的技术栈有了一些了解。Flutter相关代码我也上传到了[Github](https://github.com/eegets/hanppy_sing)，代码写的可能很Low 有大神可以用Flutter实现扩展屏的话请一定一定留个言，告诉我实现方式。因为相比于js我更喜欢用Flutter实现😄，有机会还会完善FLutter版本，Windows开放API该学还是要学啊。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bbfd5abb7bc42b3acfd5c4e04496d08~tplv-k3u1fbpfcp-watermark.image?)

### Electron+Vue选型成功

无意间在网上看到 [Electron](https://electronjs.org/zh/docs/latest/tutorial/quick-start) 能实现Windows和Mac的桌面应用的开发，就又硬着头皮学习Electron+Vue。

Vue以及  [ Ant Design](https://antdv.com/index-cn)，Vue+Electron这一套在开发期间还是遇到了很多坑(可能对于我这个小白来说是坑)，这次学聪明了，先验证了electron的投屏的可行性以及数据库等操作，发现基本上能满足要求，最后在一点点爬坑的基础上花了近一个月的时间终于完成了点歌系统的1.0版本(初版很low,基础功能能用就行)，但是还是要给自己点个赞。

先来一波图：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5e40d3645545c8bcc1c35a3eb9d1b0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a95bb93b3b3941c282385b7be5bb888f~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74bd2887001d48499072cfb4fdf0cbfd~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56253984cd9846c18bb5113433c60def~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95c7b2d4dc6047e082c871c23d854c97~tplv-k3u1fbpfcp-watermark.image?)

# 开始搞起来

### 基础配置

项目工程结构借鉴 [vue-cli-electron](https://github.com/xuxingeren/vue-cli-electron) 脚手架。

开发工具
```
MacOS Ventura(`该版本python兼容性有问题`) 
WebStorm: 2021.3
```


node版本
```
 v16.13.0 
```

sqlite

```
"sqlite3": "^5.1.4",
```

Electron

```
"electron": "^12.0.0",
"electron-devtools-installer": "^3.2.0",
"electron-icon-builder": "^2.0.1",
"electron-updater": "^4.3.8",
"electron-builder": "^23.0.0",
```

Vue

```
"vue": "^3.0.7",
"vue-request": "^2.0.0-rc.4",
"vue-router": "^4.0.5",
"vuex": "^4.0.0",
```

脚本
```
"electron:serve": "vue-cli-service electron:serve",
"build:prod:win64": "vue-cli-service electron:build --mode prod --win --x64",
"build:prod:mac": "vue-cli-service electron:build --mode prod --mac",

```
运行项目
```
npm run electron:serve

npm run build:prod:win64 or build:prod:mac
```

## Electron实现扩展屏幕

屏幕创建用的是 [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/) 脚手架

```
function createWindow(devPath, prodPath) {
  //创建浏览器窗口
  let window = new BrowserWindow({ width: 800, height: 600 })
  //判断开发环境
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    //开发模式使用 http://localhost:xxx
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    //打开调试工具
    if (!process.env.IS_TEST) window.webContents.openDevTools()
  } else {
    // 加载public下的 `prodPath` html文件
    window.loadURL(`app://./${prodPath}`)
  }
  //窗口关闭回调监听  
  window.on('closed', () => { window = null })
  return window
}
```

#### 封装创建窗口

创建`createWindows.js`文件在index.js里边调用
```
import { BrowserWindow } from 'electron'

function createWindow(winConfig, devPath, prodPath) {
  const win = new BrowserWindow(winConfig)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
  } else {
    // createProtocol('app')
    win.loadURL(`app://./${prodPath}`)
  }
  console.log(prodPath, "prodPath")
  return win
}
//导出createWindow
export default createWindow
```
#### 创建vue.config.js文件

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载，不存在我们创建一个即可。在`vue.config.js`文件中配置`electronBuilder`，用于加载我们的进程的index.js。

```
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: {preload: 'src/renderer/preload/ipcRenderer.js', webviewPreload: 'src/renderer/preload/webview.js'},
      mainProcessFile: 'src/main/index.js',//加载创建窗口的配置文件
      mainProcessWatch: ['src/main'],
      builderOptions: {
        appId: process.env.VUE_APP_APPID,
        productName: process.env.VUE_APP_PRODUCTNAME,
        extraMetadata: {
          name: process.env.VUE_APP_APPID.split('.').pop(),
          version: process.env.VUE_APP_VERSION
        },
        asar: true,
        directories: {
          output: "dist_electron",
          buildResources: "build",
          app: "dist_electron/bundled"
        },
      }
    }
  }
}
```
#### 创建拓展屏

拓展屏的创建我们使用electron的进程通信来操作

我们通过`window`的 `ipcRenderer` 发送异步消息给到主进程

```
async function openScreen() {
  await window.ipcRenderer.invoke('win-subScreen', {
    open: state.open,
    path: '#/subScreen'
  })
  state.open = !state.open
}
```
如上代码，我们通过`window`的 `ipcRenderer`发射器 发送异步`win-subScreen`消息给到主进程，告知主进程我现在要打开一个新的窗口，新的窗口是 `subScreen`。

主进程在接收到消息后执行创建动作

```
import { ipcMain } from 'electron'
...
ipcMain.handle('win-subScreen', (_, data) => {
  if (data.open) {
    const displays = screen.getAllDisplays()
    const mainBounds = win.getNormalBounds()
    const externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
    })
    if (externalDisplay) {
      if (global.sharedObject.subScreen) {
        global.sharedObject.subScreen.show()
      } else {
        global.sharedObject.subScreen = createWindow({
          frame: false,
          show: false,
          parent: win, // win是主窗口
          // fullscreen: true,
          webPreferences: {
            webSecurity: false,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            plugins: true,
            preload: path.join(__dirname, 'preload.js'),
            devTools: false
          },
          x: mainBounds.x < 0 && Math.abs(mainBounds.x) > (win.getContentSize()[0] / 2) ? 0 : externalDisplay.bounds.x,
          y: externalDisplay.bounds.y
        }, data.path, `index.html${data.path}`)
        global.sharedObject.subScreen.once('ready-to-show', () => {
          global.sharedObject.subScreen.show()
        })
        global.sharedObject.subScreen.on('closed', () => {
          global.sharedObject.subScreen = null
        })
      }
    } else {
      console.log('未检测到拓展屏')
    }
  } else {
    global.sharedObject.subScreen && global.sharedObject.subScreen.destroy()
  }
})
```
如上代码，主进程在接收到 `ipcRenderer`发射器发送过来的消息`win-subScreen`，此时主进程通过`createWindow`创建一个新的拓展窗口，窗口的路径就是我们传过来的path，在项目里就是我们创建的`subScreen/index.vue`文件。如图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eced94eb904944cfa2898e506a539d3b~tplv-k3u1fbpfcp-watermark.image?)

#### 主屏和拓展屏通信

创建完主屏和拓展屏后肯定要进行通信，`切歌、重唱、音量+-、本地歌曲地址等`动作都需要主屏通过发送消息给拓展屏，拓展屏再根据相应的消息做相应的处理。

* 主屏发送消息给拓展屏
```
<template>
  <div class="subScreen">
    <a-button type="primary" @click="openScreen">打开拓展屏</a-button>
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
      
      sendSubScreen()
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
    //发送消息类型给拓展屏
    function sendSubScreen() {
      const subScreen = remote.getGlobal('sharedObject').subScreen
      if (subScreen) {
        window.ipcRenderer.sendTo(subScreen.webContents.id, 'main-subScree', songReact)
      }
    }
    
    onMounted(() => {
      //监听拓展屏的回传消息
      window.ipcRenderer.on('subScree-main', (_event, data) => {
        $message.success(data)
      })
    })
    onUnmounted(() => {
      //移除监听
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
```
* 拓展屏接收主屏消息

```
<template>
  <div class="subScreen">消息类型：{{songReact.type }}</div>
  <div class="subScreen">链接：{{songReact.url }}</div>
  <div>我是扩展屏幕</div>
  <!--播放器-->
  <video-player :options="videoOptions" ref="refVideoPlayer"/>

</template>

<script>
import {defineComponent, reactive, onMounted, onUnmounted, ref} from 'vue'
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
const { remote } = require('electron')

export default defineComponent({
  components: {VideoPlayer},
  setup() {
    //消息
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
      autoplay: true,  //是否自动播放
      // controls: true,
      width: 1000, //播放器宽度
      height: 800, //播放器高度
      preload: "auto", 
      sources: [
        {
          src: "atom:///Users/wangkai/Downloads/mkv/711 试着了解 - 万芳.mkv",
          type: "video/mp4",
        }
      ]
    })

    onMounted(() => {
      //时刻接收主屏发送的消息并做相应逻辑处理  
      window.ipcRenderer.on('main-subScree', (_event, data) => {
        songRef.value = data
        if ("volUp" === songReact.value.type) {
          if (volume < 1) {
            volume = volume + 0.1
          }
          refVideoPlayer.value.setVolume(volume)
        } else if ("volDown" === songReact.value.type) {
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
```
经过上述步骤，我们就可以初步实现创建主屏及扩展屏以及主屏和拓展屏的通信.。 也就是实现了电脑上点歌、切歌等操作,投影上展示对应的MV视频。

## VideoJs播放MKV和MP4等视频

### 为什么选择Video.js？

[Video.js](https://videojs.com/) 是一个为 HTML5 世界从头开始构建的网络视频播放器。它支持 HTML5 视频和现代流媒体格式，以及 YouTube、Vimeo 甚至 Flash（通过插件，稍后会详细介绍）。

它支持在桌面和移动设备上播放视频。

Video.js 的核心优势在于它装饰了一个[标准的`<video>`元素](http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element)并模拟了它的相关[事件和 API](https://www.w3.org/2010/05/video/mediaevents.html)，同时提供了一个可定制的基于 DOM 的 UI。

Video.js 支持`<video>`元素的所有属性（如`controls`，`preload`等），但它也支持[它自己的选项](http://docs.videojs.com/tutorial-setup.html#options)。有两种方法可以创建 Video.js 播放器并传递选项，但它们都以具有属性`class="video-js"`的标准`<video>`元素开头。

### 如何使用Video.js？

video.js是一个很好的视频播放插件，但是如果移植到vue上相信很多小伙伴很苦恼，是不是网上搜了一堆，发现不好使，我也是踩坑了，后来发现官方文档上就有，好尴尬，建议以后学习先看看官方文档，会有惊喜的。 1.首先安装video.js，然后在main.js中引入

```js
import Video from 'video.js'
import 'video.js/dist/video-js.css'

//这册到全局对象中
app.config.globalProperties.$video = Video;
```

这里因为我用的vue3，所以通过 `app.config.globalProperties` 将Video注册到全局属性对象中，能够使应用内所有组件都可以访问。

我们自动了一个组件 `VideoPlayer`，说明一下在使用video.js组件时需要在 `beforeDestroy` 增加一个`dispose()`方法，来销毁它，这样就可以解决重复载入报错问题了。

首先在mounted中获取VideoJs的实例，代码如下

```js
<template>
  <div>
    <video id="videoId" ref="videoPlayer" data-setup='{}' class="video-js"></video>
  </div>
</template>
<script>
import videojs from 'video.js';

export default {
  name: "VideoPlayer",
  
  data() {
    return {
      player: null,
      volumeProps: 0.5,
    }
  },
  
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    })
  }
}
</script>
```

##### 播放

```
setPlay() {
  this.player.play()
},
```

##### 暂停

```
setPause() {
  this.player.pause()
},
```

**静音**

```
setMuted(isMuted) {
  this.player.muted(isMuted)
},
```

**调整音量大小**

```
setVolume(volume) {
  this.volumeProps = volume
  this.player.volume(this.volumeProps)
},
```

**重复播放**

```
setRestart() {
  this.player.currentTime(0);
  this.setPlay()
},
```

**切换下一首歌曲**

```
changeSource(src) {
  this.player.pause();
  this.player.currentTime(0);

  this.player.src(src);

  this.player.ready(function () {
    this.one('loadeddata', videojs.bind(this, function () {
      this.currentTime(0);
    }));

    this.load();
    this.play();
  });
}
```

完整代码如下：

```
<template>
  <div>
    <video id="videoId" ref="videoPlayer" data-setup='{}' class="video-js"></video>
  </div>
</template>
<script>
import videojs from 'video.js';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      player: null,
      volumeProps: 0.5,
    }
  },

  methods: {
    //设置音量大小
    setVolume(volume) {
      this.volumeProps = volume
      this.player.volume(this.volumeProps)
    },

    //设置是否静音
    setMuted(isMuted) {
      this.player.muted(isMuted)
    },

    //设置暂停
    setPause() {
      this.player.pause()
    },

    //设置播放
    setPlay() {
      this.player.play()
    },

    //重复播放
    setRestart() {
      this.player.currentTime(0);
      this.setPlay()
    },

    //获取player对象
    getCusPlayer() {
      return this.player
    },

    /**
     * 切换歌曲
     * @param src
     */
    changeSource(src) {
      this.player.pause();
      this.player.currentTime(0);

      this.player.src(src);

      this.player.ready(function() {
        this.one('loadeddata', videojs.bind(this, function() {
          this.currentTime(0);
    }));

    this.load();
    this.play();
  });
}
  },

  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    })

    this.player.volume(this.volumeProps)

    //监听视频在开始播放时触发
    this.player.on('playing', (event) => {
      console.log(event, "视频已经在开始播放时触发")
    })

    //监听视频播放进度
    this.player.on('timeupdate', (event) => {
      // 用秒数来显示当前播放进度
      // let timeDisplay = parseInt(this.currentTime()); //当前时间
      console.log(event, "实时监听进度")
    })

    //监听视频结束时触发
    this.player.on('ended', (event) => {
      console.log(event, "视频结束时触发")
    })
  },

  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>
```

调用方式
```
<template>
  <div>
    ...
    <VideoPlayer style="position: absolute;" :options="videoOptions" ref="refVideoPlayer" @playEnded="playEnded"/>
  </div>
</template>

<script>
import {remote} from "electron";
import {defineComponent, getCurrentInstance, onMounted, onUnmounted, reactive, ref} from "vue";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";

//已点歌曲
const ownLists = ref([]);

export default defineComponent({
  components: {VideoPlayer},
  setup() {

    const mutedRef = ref(false)

    const playRef = ref(true)

    const {proxy} = getCurrentInstance()
    const {$message} = proxy

    // 定义一个对象关联上子组件的 ref 值（注意：这里的属性名必须跟子组件定义的 ref 值一模一样，否者会关联失效）
    const refVideoPlayer = ref(null)

    const songReact = {
      type: "",
      url: "",
    }
    const videoOptions = reactive({
      //自动播放属性, muted: 静音播放，
      autoplay: true,
      // controls: true,
      width: 150,
      height: 120,
      muted: true,
      preload: "auto",
      poster: "//vjs.zencdn.net/v/oceans.png",
      sources: [
        {
          src: "atom:///Users/XXX/Downloads/mkv/711 试着了解 - 万芳.mkv",
          type: "video/mp4",
        }
      ]
    })

    /**
     * 切歌
     * 1：删除 isOpening = 1 正在播放的歌曲
     * 2：查询最新的一条数据将 isOpening 设置为 1
     */
    function next() {

      deleteSongByTop(1)

      queryTop().then((res) => {
        if (res.length === 0) {
          console.log("没有歌曲了")
        } else {
          updateOwnSong(1)

          songReact.type = "next"
          songReact.url = res.filePath

          sendSubScreen()
        }
      })
    }

    //是否静音
    function muted(isMuted) {
      songReact.type = isMuted ? "muted" : "sound"
      mutedRef.value = isMuted

      sendSubScreen()
    }

    //重唱
    function again() {
      refVideoPlayer.value.setRestart()

      songReact.type = "again"
      // songReact.url = "/Users/wangkai/Downloads/mkv/746 这些年来 - 张国荣.mkv"

      sendSubScreen()
    }

    //播放 或 暂停
    function play(isPlay) {
      songReact.type = isPlay ? "play" : "pause"
      playRef.value = isPlay

      if (isPlay) {
        refVideoPlayer.value.setPause()
        refVideoPlayer.value.setMuted(true)
      } else {
        refVideoPlayer.value.setPlay()
        refVideoPlayer.value.setMuted(false)
      }

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

    //监听到播放完毕的回调
    function playEnded() {
      refVideoPlayer.value.getCusPlayer().on('ended', (event) => {
        console.log(event, "我播放完毕了，等待下一步指示")
      })
    }

    //当前播放的歌曲
    function changeSource() {
      refVideoPlayer.value.changeSource({
        type: "video/mp4",
        src: "atom://" + nextSource.value,
      })
    }
    //发送消息到副屏
    function sendSubScreen() {
      const subScreen = remote.getGlobal('sharedObject').subScreen
      if (subScreen) {
        window.ipcRenderer.sendTo(subScreen.webContents.id, 'main-subScree', songReact)
      }
    }

    return {
      next,
      muted,
      mutedRef,
      playRef,
      videoOptions,
      refVideoPlayer,
      again,
      play,
      volDown,
      volUp,
      playEnded,
    }
  },
})
```

这里注意几点：

1. 播放MKV视频必须要设置`source`的`type=='video/mp4'`，同时`source`的src要链接要添加`atom`，否则将无法播放mkv视频，如下代码所示：

```
const videoOptions = reactive({
  ...
  sources: [
    {
      src: "atom:///Users/XXX/Downloads/mkv/711 试着了解 - 万芳.mkv",
      type: "video/mp4",
    }
  ]
})
```
2. 基础的videoJs播放器上有底部导航栏，如果想去掉导航栏，则需要设置 `controls: false`。

`这里遗留了一个问题， MV歌曲有时候要实现原声和伴唱的切换，这个切换方案暂时没有好的方案。`

## 文件/文件夹添加遍历

我们将之前拼夕夕上下载下来的10万首歌曲存放到电脑的某一个地方，接着我们需要读取这些文件的详细信息，将这些信息以及文件地址最终保存在数据库中，供点歌的时候进行增删改查。

这里分几个步骤

> 1: 配置文件夹路径
>
> 2: 递归便利文件夹中的歌曲
>
> 3: 获取文件信息
>
> 4: 最后通过数据库存储歌曲信息。

文件操作用的是Node的文件操作类 `fs`，该 `fs/promises` API 提供了返回 promise 的异步的文件系统方法。

### 读取文件

```
fs.readdir(path[, options], callback)
```
读取目录的内容。 回调有两个参数 `(err, files)`，其中 `files` 是目录中文件名的数组，不包括 `'.'` 和 `'..'`。


### 获取文件属性

```
fs.stat(path[, options], callback)
```

有关更多详细信息，请参阅 POSIX [`readdir(3)`](http://url.nodejs.cn/QvrbKw) 文档。

> 注意：
>
> Promise API 使用底层的 Node.js 线程池在事件循环线程之外执行文件系统操作。 这些操作不是同步的也不是线程安全的。  对同一文件执行多个并发修改时必须小心，否则可能会损坏数据。

### 实例封装

这里我们封装了一个用于遍历和读取文件的封装类，代码如下：
```
import _path from "path";
import fs from "fs";

export function fileDisplay(filePath) {
    return statsPromise(filePath).then(data => {
        if (data.isFile) {
            return [data]
        } else {
            return readdirPromise(filePath).then(paths => {
                return Promise.all(paths.map(mapPath => {
                    return fileDisplay(_path.resolve(filePath, mapPath))
                }))
            }).then((res) => {
                return [].concat(...res)
            })
        }
    })
}

/**
 * 获取文件属性
 * @param filePath
 * @returns {Promise<unknown>}
 * 字段信息如下链接：
 * https://juejin.cn/post/6955011872298893319
 */
function statsPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (error, stats) => {
            if (error) reject(error)
            const  data = {filePath: filePath, size: stats.size, isFile: stats.isFile()}
            console.log(JSON.stringify(data), "statsPromise")
            resolve(data)
        })
    })
}

//读取文件
function readdirPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (error, datas) => {
            if (error) reject(error)
            console.log(JSON.stringify(datas), "readdirPromise")
            resolve(datas)
        })
    })
}
```
通过调用上述封装类就可以完成文件遍历及读取，代码如下
```
function addFolder() {
  fileDisplay("/Users/xxx/Downloads/mkv").then(datas => {
    console.log(datas, "遍历到的文件")
    datas.forEach(data => {

      if (data.filePath !== null && data.filePath.includes(".m")) {

        console.log(data.filePath, "遍历到的文件")

        const fileSplit = data.filePath.split(" - ");
        const songName = fileSplit[0].split(" ")[1];
        const songAuthor = fileSplit[1].split(".")[0];

        //下一步将文件信息存储到数据即可
      }
    })
  })
}
```
以上方式我们就可以完成文件的遍历和读取文件信息，接下来就是操作数据库了。

## Sqlite数据库增删改查

既然我们要实现本地视频播放，那肯定绕不开对数据库的操作，js的数据库我这里选择的是 `sqlite3`，版本是`5.1.4`，我们在package.json中添加sqlite依赖包

```
"dependencies": {
  "sqlite3": "^5.1.4"
},
```
首先连接数据库，数据库名为`songs.db`
```
const sqlite3 = require('sqlite3').verbose()

let db

//连接数据库
function conn() {
    if (!db || !db.open) {
        db = new sqlite3.Database('songs.db')
    }
    return db
}
```

其次创建两张表，分别是：已点歌曲表 `ownSongs` 和 本地歌曲表 `songs`。

代码如下：
```

export const initTable = () => {
    return new Promise(() => {
        let db = conn()
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS songs (' +
                ' id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                ' picUrl TEXT,' +
                ' title TEXT,' +
                ' filePath TEXT,' +
                ' fileSize TEXT,' +
                ' author TEXT,' +
                ' english TEXT,' +
                ' width TEXT,' +
                ' height TEXT,' +
                ' createDate DATE)')
        })
    })
}

export const initOwnTable = () => {
    return new Promise(() => {
        let db = conn()
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS ownSongs (' +
                ' id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                ' picUrl TEXT,' +
                ' title TEXT,' +
                ' filePath TEXT,' +
                ' fileSize TEXT,' +
                ' author TEXT,' +
                ' english TEXT,' +
                ' width TEXT,' +
                ' height TEXT,' +
                ' createDate DATE,' +
                ' isTop TEXT)')
        })
    })
}

```

因为本地歌曲表的增删改查简单，所以我们这里看一下`已点歌曲的数据表操作`这里我们直接看简单的封装，代码如下：

```
/**
 * 已点歌曲
 */
const sqlite3 = require('sqlite3').verbose()

let db

//连接数据库
function conn() {
    if (!db || !db.open) {
        db = new sqlite3.Database('songs.db')
    }
    return db
}

export const initOwnTable = () => {
    return new Promise(() => {
        let db = conn()
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS ownSongs (' +
                ' id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                ' picUrl TEXT,' +
                ' title TEXT,' +
                ' filePath TEXT,' +
                ' fileSize TEXT,' +
                ' author TEXT,' +
                ' english TEXT,' +
                ' width TEXT,' +
                ' height TEXT,' +
                ' createDate DATE,' +
                ' isTop TEXT)')
        })
    })
}

/**
 * 插入数据
 * @param picUrl 封面图
 * @param title 标题
 * @param filePath 路径
 * @param fileSize 大小
 * @param author 作者
 * @param english 英文
 * @param width 宽度
 * @param height 长度
 * @param createDate 创建事件
 * @param isTop 是否正在播放 1: 最置顶的一条数据，0: 普通的数据
 * @param callback 回调
 */
export const insertOwnSongs = function (picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop) {
    return new Promise(() => {
        let db = conn()
        const query = "INSERT INTO ownSongs (picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop]
        db.run(query, values, function (error) {
            console.log(error)
            // callback(error, this.lastID)
        })
    })
}

/**
 * 获取所有数据
 * 按照倒序
 * @returns {Promise<unknown>}
 */
export function getAllOwnSongs(params) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        db1.all("SELECT * FROM ownSongs order by id desc", params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 获取正要播放的歌曲
 * isTop = 1 表示正在播放的一条
 * @returns {Promise<unknown>}
 */
export function getOneSong() {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        db1.all("SELECT * FROM ownSongs where isTop=?", [1], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 获取最顶部一条
 */
export function queryTop() {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "SELECT * FROM ownSongs ORDER BY ID DESC LIMIT ?"
        db1.run(query, [1], (err, data) => {
            if (err) {
                reject(err)
            } else {
                console.log("获取最顶部一条")
                console.log(data)
                resolve(data)
            }
        })
    })
}

/**
 * 删除某一条
 * @param isTop 置顶的一条
 */
export function deleteById(id) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "DELETE FROM ownSongs WHERE id = ?"
        const values = [id]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 删除置顶的一条
 * @param isTop 置顶的一条
 */
export function deleteByTop(isTop) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "DELETE FROM ownSongs WHERE isTop = ?"
        const values = [isTop]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 更新已点歌曲中正在播放的一条
 * @param id: 置顶id的这一条
 */
export function updateOwnSong(id) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = `UPDATE ownSongs SET isTop = ? WHERE id = ?`
        const values = [1, id]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


/**
 * 置顶某一条
 */
export function topOwnSong(song) {
    deleteById(song.id)
    insertOwnSongs(song.picUrl, song.title, song.filePath, song.fileSize, song.author, song.english, song.width, song.height, song.createDate)
}
```
使用

在main.js中声明处db
```
import { initTable } from "../db/db";
import { initOwnTable } from "../db/ownDb"

initTable()

initOwnTable()
```
然后在需要操作数据的地方调用相应数据表中的方法即可。

### [项目地址](https://github.com/eegets/happy-song)
