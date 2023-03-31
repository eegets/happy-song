<template>
  <div>
    <a-button @click="addFile">添加文件</a-button>
    <a-button @click="addFolder">添加文件夹并添加到数据库</a-button>

    <a-button @click="queryDB">查询数据库内容</a-button>

    <a-table :columns="columns" :data-source="data">
      <template v-slot:bodyCell="{ column, record}">
        <template v-if="column.dataIndex === 'picUrl'">
          <a-image :width="200" :src="record.picUrl" /> <!--不展示，原因待查-->
        </template>
        <template v-else-if="column.dataIndex === 'fileSize'">
          <div> {{ record.fileSize / 1024 }}</div>
        </template>
      </template>
    </a-table>

  </div>
</template>

<script>

import { defineComponent, ref } from 'vue';

import {getAllSongs, insertSongs} from "../../../../db/db";

import {fileDisplay} from "../../../utils/files";

const pinyin = require('js-pinyin');

const columns = [ {
  title: 'ID',
  dataIndex: 'id',
  width: 50,
  fixed: 'left',
  id: 0
},{
  title: '缩略图',
  dataIndex: 'picUrl',
  width: 150,
  fixed: 'left',
  id: 1
}, {
  title: '标题',
  width: 100,
  dataIndex: 'title',
  key: 'title',
  id: 2,
}, {
  title: '文件路径',
  width: 100,
  dataIndex: 'filePath',
  key: 'filePath',
  id: 3,
}, {
  title: '文件大小',
  dataIndex: 'fileSize',
  key: 'fileSize',
  width: 150,
  id: 4,
}, {
  title: '作者',
  dataIndex: 'author',
  key: 'author',
  width: 150,
  id: 5,
}, {
  title: '英文',
  dataIndex: 'english',
  key: 'english',
  width: 150,
  id: 6,
}, {
  title: '宽度',
  dataIndex: "with",
  key: 'with',
  width: 100,
  id: 7,
}, {
  title: '高度',
  dataIndex: "height",
  key: 'height',
  width: 100,
  id: 8,
}, {
  title: '创建时间',
  dataIndex: "createDate",
  key: 'createDate',
  width: 100,
  id: 9,
}, {
  title: 'Action',
  key: 'operation',
  width: 100,
  fixed: 'right',
  id: 10,
}];

let data = ref([]);

const videoOptions = {
  //自动播放属性, muted: 静音播放，
  autoplay: true,
  controls: true,
  muted: true,
  width: 110,
  height: 5,
  preload: "auto",
  poster: "//vjs.zencdn.net/v/oceans.png",
  sources: [{
      // src: "//vjs.zencdn.net/v/oceans.mkv",
      // src: "/Users/wangkai/Downloads/mkv/744 总有爱 - beyond.mkv",
      // src: "static/sjsjs.mp4",
      src: "atom:///Users/wangkai/Downloads/mkv/744 总有爱 - beyond.mkv",
      type: "video/mp4",
      // src: "atom:////Users/wangkai/Downloads/oceans.mp4",
      // type: "video/mp4"
    }
  ]
}

export default defineComponent({
  components: {
  },
  setup() {

    return {
      data,
      columns,
      addFile,
      addFolder,
      queryDB,
      videoOptions,
    };

    function addFile() {
      // ipcRenderer.send("open-video-file")
    }

    /**
     * @param title 标题
     * @param filePath 路径
     * @param fileSize 大小
     * @param thumbNail 封面图
     * @param author 作者
     * @param english 英文
     * @param width 宽度
     * @param height 长度
     * @param createDate 创建事件
     * @param callback 回调
     */
    function addFolder() {
      fileDisplay("/Users/wangkai/Downloads/mkv").then(datas => {
        console.log(datas, "遍历到的文件")
        datas.forEach(data => {

          if (data.filePath !== null && data.filePath.includes(".m")) {

            console.log(data.filePath, "遍历到的文件")

            const fileSplit = data.filePath.split(" - ");
            const songName = fileSplit[0].split(" ")[1];
            const songAuthor = fileSplit[1].split(".")[0];

            // videoPlayer.findVideoCover(data.filePath, {url:''})

            insertSongs("https://p3-passport.byteimg.com/img/user-avatar/ab910053abc3c264a7b1365ce1d64496~100x100.awebp",
                songName,
                data.filePath,
                data.size,
                songAuthor,
                pinyin.getCamelChars(songName),
                "100",
                "100",
                Date.now(),
                (error, lastID) => {
                  console.log(error)
                  console.log(lastID)
                }
            )
          }
        })
      })
    }

    function queryDB() {
      getAllSongs().then((res) => {
        data.value = res
        console.log(data.value, "查询出的数据")
      })
    }
  }
});
</script>

<style lang="scss" scoped>
.video {
  width: 200px;
  height: 140px;
}
</style>
