<!--
https://cloud.tencent.com/developer/article/1843663?from=15425&areaSource=102001.1&traceId=d-ZGmSl3E5IOlZ4du4fYG
-->
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

      this.player.ready(function () {
        this.one('loadeddata', videojs.bind(this, function () {
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

  //截取视频第一帧作为播放前默认图片
  findVideoCover(url, file) {
    const video = document.getElementById("upvideo"); // 获取视频对象
    // const video = document.createElement("video") // 也可以自己创建video
    video.src = url; // url地址 url跟 视频流是一样的
    const canvas = document.getElementById("mycanvas"); // 获取 canvas 对象
    const ctx = canvas.getContext("2d"); // 绘制2d
    video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
    video.currentTime = 1; // 第一帧
    video.oncanplay = () => {
      canvas.width = video.clientWidth; // 获取视频宽度
      canvas.height = video.clientHeight; //获取视频高度
      // 利用canvas对象方法绘图
      ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
      // 转换成base64形式
      this.imgsrc = canvas.toDataURL("image/png"); // 截取后的视频封面

      file.url = this.imgsrc;
    }
  }
}
</script>
