import './assets/css/base.css'
import './assets/css/common.css'
// import './assets/css/index.css'
import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from "./router"
import axios from "axios"

let app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router).mount('#app')
