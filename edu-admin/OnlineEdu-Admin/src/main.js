import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import '@/plugins/vcharts' // echarts

import Verify from '@/components/verify'
import { download } from '@/utils/request'
import Pagination from "@/components/Pagination";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.component('Pagination', Pagination)
Vue.use(ElementUI)

Vue.use(mavonEditor)
// 验证码
Vue.prototype.$verify = Verify

Vue.config.productionTip = false

Vue.prototype.baseUrl = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : ''

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
