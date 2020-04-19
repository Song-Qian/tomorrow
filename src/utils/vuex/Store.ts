/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 所有的全局状态属性存储器
 */
import Vue from 'vue'
import Vuex, { Store as VuexStore } from 'vuex'
import stateGlobal from './core/state'
import gettersGlobal from './core/getters'
import mutationsGlobal from './core/mutations'
import actionsGlobal from './core/actions'
import modulesGlobal from './core/modules'

export default class Store {

  // tslint:disable-next-line: typedef-whitespace
  store!: VuexStore<{
    [key: string]: any
  }>

  constructor () {
    Vue.use(Vuex)
    type S = { [key: string]: any }
    type R = { [key: string]: any }
    let modules = new modulesGlobal<S, R>()
    this.store = new VuexStore({
      state: stateGlobal<S>(),
      getters: gettersGlobal<S, R>(),
      actions: actionsGlobal<S, R>(),
      mutations: mutationsGlobal<S>(),
      modules: modules.getModules(),
      // 在生产环境开启vuex Store严格模式，控制开发人员的代码质量
      strict: process.env.NODE_ENV !== 'production'
    })
  }

  // tslint:disable-next-line: no-empty
  startHot () {}

}
