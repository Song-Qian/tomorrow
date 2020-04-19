/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 创建vue 根实例对象
 */
import Vue from 'vue'
import VueStore from '../utils/vuex/Store'
import VueGlobal from '../utils/vue-router/router_global'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'

// import 'elemeent-ui/lib/theme-chalk/index.css'

import App from './main'

export default function () {

  Vue.use(ElementUI)
  const store = new VueStore().store
  const router = new VueGlobal(void 0, store)
  sync(store, router.$router)
  // tslint:disable-next-line: variable-name
  const ssr_vue = new Vue({
    store,
    router : router.start(),
    render : h => h(App)
  })
  return { ssr_vue, store, router }
}
