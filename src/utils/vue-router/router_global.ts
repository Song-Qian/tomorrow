/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 全局路由动态加载入口
 */

import Vue from 'vue'
import VueRouter, { RouteConfig, Route, RawLocation } from 'vue-router'
import VueResource from 'vue-resource'
import { default as localRouter } from './router_config'
import { Store } from 'vuex'
import { HttpOptions } from 'vue-resource/types/vue_resource'

export default class RouterGlobal {
  Router!: RouteConfig[]
  $router!: VueRouter
  $store!: Store<any>

  constructor (router: Array<RouteConfig> = new Array<RouteConfig>(), store: Store<any>) {
    Vue.use(VueRouter)
    Vue.use(VueResource)
    this.Router = [...router, ...localRouter.getRouter()]
    this.$store = store
    this.$router = new VueRouter({ mode: 'history', routes: this.Router })
  }

  addRouter (router: RouteConfig) {
    if (router && this.$router) {
      this.Router = [...this.Router, router]
      this.$router.addRoutes([router])
    }
  }

  listenersRouter (to: Route, _from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) {
    try {
      // if (to.meta.requiredAuth && this.$store) {
      //   this.$store.dispatch('User/getToken').then(token => {
      //     if (!token) {
      //       next({ name : 'login', query: { redirect: to.fullPath } })
      //     } else {
      //       next()
      //     }
      //   }).catch(() => {
      //     next({ name : 'home', query: { redirect: to.fullPath } })
      //   })
      // } else {
      //   next()
      // }
      next();
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  registerSafetyAjax () {
    (Vue as any).http.interceptors.push((_request: HttpOptions, next: () => void) => {
      // this.$store.dispatch('getUserToken').then(token => {
      //     request.headers.set("Status-Tool-Auth_Token",token);
      //     next((response) => {
      //         if(response.body.rel == "2001"){
      //                 $("#modal-login").modal({backdrop:"static"})
      //         }else{
      //              return response;
      //          }
      //     })
      // }).catch(err => {
      //     next((response) => {
      //         response.body = { success : "fail", message : "store中发生未知脚本错误，本次请求放弃有效数据。", err };
      //         response.status = 201;
      //         return false;
      //     });
      // });
      next()
    })
  }

  start () {
    this.$router.beforeEach((to, form, next) => {
      this.listenersRouter.apply(this, [to, form, next])
    })
    const push = this.$router.push;
    VueRouter.prototype.push = function(location) {
      return (push.apply(this, [ location ]) as any).catch(error => error);
    }
    this.registerSafetyAjax()
    return this.$router
  }

  // tslint:disable-next-line: no-empty
  stop () { }
}
