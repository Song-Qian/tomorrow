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
      name : 'tomorrowApp',
      path : '/',
      redirect : { name : 'login' },
    },
    {
      name : 'login',
      path : '/login',
      component : () => import('~/views/Home/login')
    },
    {
      name : 'home',
      path : '/home',
      component : () => import('~/views/Home/index'),
      meta : { requiredAuth : true },
      children : [
        { 
          name : 'main',
          path : 'main',
          component : () => import('~/views/Main/index'),
          meta : { requiredAuth : true }
        },
        {
          name : 'piazza',
          path : 'piazza',
          component : () => import('~/views/Ad/index'),
          meta : { requiredAuth : true }
        }
      ]
    },
    {
      name : 'unkown',
      path: '*',
      redirect: { name : 'tomorrowApp' }
    }
  ]
    return routers
  }

}
