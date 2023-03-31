<template>
  <a-layout class="ant-layout" direction="vertical">
    <a-layout class="layout">
      <a-layout-header>
        <div class="layout-go-home" @click="openSongsPage" >
          <a-button type="primary" class="layout-go-home-btn" v-show="!showSongs">回到首页</a-button>
        </div>
        <div class="layout-header">
          <a-button class="layout-change" @click="openSongsPage">搜索</a-button>
          <a-button class="layout-change" @click="changeFront">切换到后台</a-button>
        </div>
      </a-layout-header>
        <a-layout-content>
          <div class="layout-content"  v-if="showSongs">
            <div class="content-songs" @click="openSongsPage">
              <div class="content-songs-text">
                歌曲点歌
              </div>
            </div>
            <div class="content-right">
              <div class="content-seniority">
                <div class="content-seniority-text">
                  排行榜
                </div>
              </div>
              <div class="content-authors">
                <div class="content-authors-text">
                  歌星点歌
                </div>
              </div>
            </div>
          </div>

        </a-layout-content>
        <div class="layout-search" v-if="!showSongs">
          <Song @querySongCounts="query"/>
        </div>
      <a-layout-footer>
        <div class="layout-footer-bottom">
          <div class="layout-footer-bottom-item" @click="original">
            <AudioMutedOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">原唱</div>
          </div>
          <div class="layout-footer-bottom-item" @click="fllow">
            <AudioMutedOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">伴唱</div>
          </div>
          <div class="layout-footer-bottom-item" @click="again">
            <ReloadOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">重唱</div>
          </div>
          <div class="layout-footer-bottom-item" @click="volDown">
            <NotificationOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">音量-</div>
          </div>
          <div class="layout-footer-bottom-video-view">
            <VideoPlayer style="position: absolute;" :options="videoOptions" ref="refVideoPlayer" @playEnded="playEnded"/>
            <div style="position: absolute;" v-if="playRef" @click="play(false)">
              <PlayCircleOutlined :style="{fontSize: '45px', color:'#ffffff'}" />
            </div>
            <div style="position: absolute;" v-else @click="play(true)">
              <PauseCircleOutlined :style="{fontSize: '45px', color:'#ffffff'}" />
            </div>
          </div>
          <div class="layout-footer-bottom-item" @click="volUp">
            <SoundOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">音量+</div>
          </div>
          <div class="layout-footer-bottom-item" @click="next">
            <StepForwardOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">切歌</div>
          </div>
          <div class="layout-footer-bottom-item" v-if="mutedRef" @click="muted(false)">
            <AudioOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">放声</div>
          </div>
          <div class="layout-footer-bottom-item" v-else @click="muted(true)">
            <AudioMutedOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '30px'}" />
            <div class="layout-footer-bottom-item-title">静音</div>
          </div>
          <div class="layout-footer-bottom-item" @click="showDrawer">
            <a-badge :count="dotCounts">
              <div>
                <ShoppingOutlined :style="{fontSize: '25px', color:'#ffffff', width: '30px', height: '34px'}" />
                <div class="layout-footer-bottom-item-title">已点</div>
              </div>
            </a-badge>
          </div>
        </div>
      </a-layout-footer>
      <!--已点歌曲弹出框-->
      <a-drawer v-model:visible="visible" class="custom-class" style="color: red;" :width="600" title="已点歌曲" placement="right">
        <a-list item-layout="horizontal" :data-source="ownLists">
          <template #renderItem="{ item }">
            <div>
              <div style="height: 80px; margin-top:10px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between">
                <div style="display: flex; align-items: center;">
                  <div style="display: flex; align-items: center">
                    <a-image
                        :width="80"
                        :height="80"
                        :src="item.picUrl"
                        fallback="data:image/png;base64,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"/>
                  </div>
                  <div>
                    <div style="margin-left: 10px; font-size: 16px; color: black; font-weight: bold; text-align: left">
                      {{item.title}}
                    </div>
                    <div style="margin-left: 10px; margin-top: 20px; font-size: 14px; color: #666666; text-align: left">
                      {{item.author}}
                    </div>
                  </div>
                </div>
                <div>
                  <div style="align-items: center; display:flex; justify-content: flex-end; margin-right: 10px">
                    <a-button type="primary" @click="topSong(item)" v-if="item.isTop === '0'">置顶</a-button>
                    <div style="width: 10px;"></div>
                    <a-button type="danger" @click="deleteSongById(item.id)">删除</a-button>
                  </div>
                </div>
              </div>
              <div style="height: 1px; margin-right: 10px; background-color: #efefef"></div>
            </div>
          </template>
        </a-list>
      </a-drawer>
    </a-layout>
  </a-layout>
</template>

<script>
import {remote} from "electron";
import {defineComponent, getCurrentInstance, onMounted, onUnmounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import Song from "../song/Song";
import {
  deleteById, deleteByTop,
  getAllOwnSongs,
  getOneSong,
  queryTop,
  topOwnSong,
  updateOwnSong
} from "../../../db/ownDb";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";

//已点歌曲
const ownLists = ref([]);

export default defineComponent({
  components: {VideoPlayer, Song},
  setup() {

    const router = useRouter()

    const mutedRef = ref(false)

    const playRef = ref(true)

    const showSongs = ref(true)

    const visible = ref(false);

    //小红点
    const dotCounts = ref(0);

    //下一个资源
    const nextSource = ref('');

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
          src: "atom:///Users/wangkai/Downloads/mkv/711 试着了解 - 万芳.mkv",
          type: "video/mp4",
        }
      ]
    })

    //展示已点歌曲弹框
    function showDrawer() {
      visible.value = true;
      getOwnSongs()
    }

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

    //发送消息到副屏
    function sendSubScreen() {
      const subScreen = remote.getGlobal('sharedObject').subScreen
      if (subScreen) {
        window.ipcRenderer.sendTo(subScreen.webContents.id, 'main-subScree', songReact)
      }
    }

    //打开歌曲点歌页面
    function openSongsPage() {
      showSongs.value = !showSongs.value
    }

    //切换前台和后台
    function changeFront() {
      router.push("/admin/songs")
    }

    //查询所有已点歌曲
    function getOwnSongs() {
      getAllOwnSongs().then((res) => {
        ownLists.value = res
        dotCounts.value = ownLists.value.length
        console.log(ownLists.value.length, "已点歌曲数")
      })
    }

    //置顶
    function topSong(data) {
      topOwnSong(data)
      getOwnSongs()
    }

    //删除Id=xxx的一条
    function deleteSongById(id) {
      deleteById(id)
      getOwnSongs()
    }

    //删除置顶的一条
    function deleteSongByTop(isTop) {
      deleteByTop(isTop)
      getOwnSongs()
    }

    //查询歌曲列表、歌曲总数以及正在播放的歌曲
    function query() {
      //查询歌曲总数
      getAllOwnSongs().then((res) => {

        ownLists.value = res

        dotCounts.value = ownLists.value.length ?? 0

        console.log(dotCounts.value, "查询到的已点歌曲总数")
      })

      //查询正要播放的歌曲
      getOneSong().then((res) => {

        if (res.length > 0) {

          nextSource.value = res[0].filePath

          changeSource()

        }
      })
    }

    //当前播放的歌曲
    function changeSource() {
      refVideoPlayer.value.changeSource({
        type: "video/mp4",
        src: "atom://" + nextSource.value,
      })
    }

    onMounted(() => {
      query()
      getOwnSongs()

      // changeSource()

      window.ipcRenderer.on('subScree-main', (_event, data) => {
        $message.success(data)
      })
    })

    onUnmounted(() => {
      window.ipcRenderer.removeAllListeners('subScree-main')
    })

    return {
      next,
      muted,
      mutedRef,
      playRef,
      dotCounts,
      showSongs,
      visible,
      ownLists,
      videoOptions,
      refVideoPlayer,
      again,
      play,
      volDown,
      volUp,
      changeFront,
      openSongsPage,
      showDrawer,
      getOwnSongs,
      topSong,
      deleteSongById,
      deleteSongByTop,
      playEnded,
      query,
    }
  },
})
</script>

<style lang="scss" scoped>
.ant-layout {
  height: 100%;
  width: 100%;

  .layout {

    .layout-go-home {
      position: absolute;
      display: flex;
      align-items: center;
      height: 100px;
      .layout-go-home-btn {
        margin-left: 20px;
        width: 100px;
        height: 40px;
      }
    }
    .layout-header {
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .layout-change {
        width: 100px;
        height: 40px;
        margin-right: 20px;
      }
    }

    .layout-content {
      display: flex;
      padding-bottom: 70px;
      padding-right: 50px;
      padding-left: 50px;
      position: relative;
      z-index: 2;
      justify-content: flex-start;
      height: calc(100vh - 50px - 50px - 100px);

      .content-songs {
        width: 40%;
        height: calc(100vh - 100px - 70px - 100px);
        background-color: #999999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .content-songs-text {
          color: #2b86c5;
          flex: 1;
        }
      }
      .content-songs:active {
        width: 40%;
        height: calc(100vh - 100px - 70px - 100px);
        background-color: #999999;
        opacity: 0.6;    //这里重要，就是通过这个透明度来设置
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .content-songs-text {
          color: #2b86c5;
          flex: 1;
        }
      }

      .content-right {
        margin-left: 50px;
        width: 60%;

        .content-seniority {
          height: 30%;
          background-color: #666666;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .content-seniority-text {
            color: #2b86c5;
            flex: 1;
          }
        }
        .content-seniority:active {
          height: 30%;
          background-color: #999999;
          opacity: 0.6;    //这里重要，就是通过这个透明度来设置
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .content-seniority-text {
            color: #2b86c5;
            flex: 1;
          }
        }

        .content-authors {
          margin-top: 50px;
          height: calc(70% - 50px);
          background-color: #666666;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .content-authors-text {
            color: #2b86c5;
            flex: 1;
          }
        }
        .content-authors:active {
          margin-top: 50px;
          height: calc(70% - 50px);
          background-color: #999999;
          opacity: 0.6;    //这里重要，就是通过这个透明度来设置
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .content-authors-text {
            color: #2b86c5;
            flex: 1;
          }
        }
      }
    }

    .layout-search {
      position: absolute;
      z-index: 1;
    }

    .layout-footer-bottom {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      height: 120px;
      flex: 1;
      width: 100%;
      position: fixed;
      bottom: 0;
      z-index: 999;

      .layout-footer-bottom-item {
        background-color: #000000;
        width: 50px;
        padding-top: 30px;
        padding-bottom: 30px;
        flex: 1;
        height: 120px;
        .layout-footer-bottom-item-title {
          margin-top: 10px;
          color: white;
        }
        .layout-footer-bottom-item-dot {
          background: red;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          color: #fff;
          text-align:center;//水平居中
          line-height:30px;//跟高度一样
          position: absolute;
          margin-left: 58px;
          margin-top: -12px;
        }
      }

      .layout-footer-bottom-item:active {
        background-color: #333333;
        opacity: 0.6;    //这里重要，就是通过这个透明度来设置
        width: 50px;
        padding-top: 30px;
        padding-bottom: 30px;
        flex: 1;
      }
      .layout-footer-bottom-video-view {
        background-color: #333333;
        display:flex;
        width: 150px;
        justify-content:center;
        align-items:center;
      }
    }
  }
}
</style>
