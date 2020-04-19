/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 页面路径配置写在此处即可
 */

import { RouteConfig } from 'vue-router'

export default class {

  public static getRouter (): RouteConfig[] {
    let routers: RouteConfig[] = [{
      name : 'Innocence',
      path : '/'
    },
      // {
      //   name : 'home',
      //   path : '/home',
      //   components : {
      //     'home' : () => import('../../View/Home/Home.vue')
      //   },
      //   children: [
      //     {
      //       name: 'sys',
      //       path: 'sys',
      //       components: {
      //         // (r: NodeRequire) => { require.ensure([], () => { r(require('../../View/Sys/Index.vue')) }, 'sys/index') }
      //         'sys': () => import('../../View/Sys/Index.vue')
      //       },
      //       meta : {
      //         requiredAuth : true
      //       }
      //     }
      //   ]
      // },
      {
        name : 'unkown',
        path: '*',
        redirect: { name : 'Innocence' }
      }]
    return routers
  }

}
