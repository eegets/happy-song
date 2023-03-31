import {createApp} from 'vue'
import App from '../pages/App'
import router from '../pages/router/index'
import store from '../pages/store/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as antIcons from '@ant-design/icons-vue'
// import api from '@/api'
// import '@/styles/index.scss'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

import { initTable } from "../db/db";
import { initOwnTable } from "../db/ownDb"

initTable()

initOwnTable()

const hls =require('videojs-contrib-hls')

const app = createApp(App)

Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
})

// app.config.globalProperties.$api = api
app.config.globalProperties.$antIcons = antIcons

app.config.globalProperties.$video = Video;

app.use(Antd)
    .use(store)
    .use(router)
    .use(hls)
    .mount('#app')
