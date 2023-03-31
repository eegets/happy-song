<template>
  <div class="content">
    <div>
      <div class="content-wrapper">
        <div v-for="item in dataRef" :key="item.id">
          <div class="content-wrapper-item" @click="addOwnSong(item)">
            <div style="display: flex; align-items: center;">
              <div style="display: flex; align-items: center">
                <a-image
                    :width="100"
                    :height="100"
                    :preview="false"
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
              <div style="align-items: center; justify-content: flex-end; margin-right: 10px; margin-top: 50px">
                <a-button type="primary" @click="addOwnSong(item)">点歌</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-pagination style="align-items: flex-end" v-model:current="currentPageRef" :defaultPageSize="limit" :total="totalRef" @change="pageChange"/>
    </div>

    <div class="content-key">
      <KeyBoard @searchResult="searchResult" />
    </div>
  </div>
</template>

<script>

import {defineComponent, onMounted, ref} from "vue";
import {getAllSongs, getSongs} from "../../../db/db";
import KeyBoard from "../../../components/KeyBoard/KeyBoard";
import {getAllOwnSongs, insertOwnSongs} from "../../../db/ownDb";

const dataRef = ref([])

const currentPageRef = ref(1)

const totalRef = ref()

const limit = 8

export default defineComponent({
  components: {KeyBoard},
  setup(props, context) {
    onMounted(() => {
      currentPageRef.value = 1
      pageChange()
      queryTotal()
    })

    //查询总数
    function queryTotal() {
      getAllSongs().then((res) => {
        totalRef.value = res.length

        context.emit("querySongCounts")

        console.log(totalRef.value, "总数")
      })
    }

    function pageChange() {
      console.log("query----------currentPageRef.value: " + currentPageRef.value)
      getSongs(currentPageRef.value, limit, null).then((res) => {
        dataRef.value = res
        console.log(dataRef.value, "查询出的数据")
      })
    }

    function searchResult(keys) {
      console.log(keys, "父布局接收到子布局的值")
      currentPageRef.value = 1
      getSongs(currentPageRef.value, limit, keys).then((res) => {
        dataRef.value = res
        console.log(dataRef.value, "查询出的数据")
      })
    }

    /**
     * 添加到已点歌曲
     */
    function addOwnSong(item) {
      queryTotal()
      getAllOwnSongs().then((res) => {
        if (res.length === 0) { //已点歌曲为空
          insertOwnSongs(item.picUrl, item.title, item.filePath, item.fileSize, item.author, item.english, item.width, item.height, item.createDate, "1")
        } else {
          insertOwnSongs(item.picUrl, item.title, item.filePath, item.fileSize, item.author, item.english, item.width, item.height, item.createDate, "0")
        }
      })
    }

    return {
      dataRef,
      currentPageRef,
      totalRef,
      limit,
      pageChange,
      queryTotal,
      searchResult,
      addOwnSong,
    }
  }
})
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    .content-wrapper {
      margin: 40px;
      /* 声明一个容器 */
      display: grid;
      /*  声明列的宽度  */
      grid-template-columns: repeat(2, calc(100vh - 430px));
      /*  声明行间距和列间距  */
      grid-gap: 25px;
      /*  声明行的高度  */
      grid-template-rows: 100px 100px 100px 100px;
      .content-wrapper-item {
        background-color: #efefef;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between
      }
      .content-wrapper-item:active {
        background-color: #999999;
        opacity: 0.6;    //这里重要，就是通过这个透明度来设置
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between
      }
    }
    .content-key {
      width: 420px;
    }
  }
</style>
