<template>
  <div class="key-content-wrapper">
    <div>
      <a-input-search
          v-model:value="keyRef"
          placeholder="请输入搜索内容"
          class="key-content-wrapper-search"
          allowClear="true"
          @search="onSearch()"
      />
    </div>
    <div class="key-content-wrapper-key">
      <div v-for="key in keys" :key="key">
        <div class="key-content-wrapper-key-item" @click="clickKey(key)">
          <div class="key-content-wrapper-item-code">{{key}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {defineComponent, onMounted, ref} from "vue";

const keys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

const keyRef = ref("")

export default defineComponent({
  setup(props, context) {

    onMounted(() =>{
      keyRef.value = ""
    })

    function onSearch() {
      context.emit("searchResult", keyRef.value)
      console.log(keyRef.value, "点击了Key")
    }

    function clickKey(key) {
      keyRef.value += key.toUpperCase()
      context.emit("searchResult", keyRef.value)
      console.log(keyRef.value, "点击了Key")
    }

    return {
      keys,
      keyRef,
      clickKey,
      onSearch,
    }
  }
})

</script>

<style lang="scss" scoped>
  .key-content-wrapper {
    margin-top: 40px;
    .key-content-wrapper-search {
      width: 395px;
      height: 50px;
      display: flex;
      align-content: flex-start;
    }
    .key-content-wrapper-key {
      margin-top: 20px;
      /* 声明一个容器 */
      display: grid;
      /*  声明列的宽度  */
      grid-template-columns: repeat(6, 49px);
      /*  声明行间距和列间距  */
      grid-gap: 20px;
      /*  声明行的高度  */
      grid-template-rows: repeat(6, 49px);
      .key-content-wrapper-key-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 55px;
        background-color: #f0f2f5;
        text-align: center;
        border-radius: 5px;
        .key-content-wrapper-item-code {
          font-weight: bold;
        }
      }
      .key-content-wrapper-key-item:active {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 55px;
        background-color: #999999;
        opacity: 0.6;    //这里重要，就是通过这个透明度来设置
        text-align: center;
        border-radius: 5px;
        .key-content-wrapper-item-code {
          font-weight: bold;
        }
      }
    }
  }

</style>
