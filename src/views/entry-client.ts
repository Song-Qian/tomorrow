/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 客户端 Vue渲染入口
 */
import createRootFactory from './root-simple-factory'
import { Component } from 'vue-router/types/router'

let { ssr_vue, store, router } = createRootFactory()

router.$router.onReady(() => {
  router.$router.beforeResolve((to, from, next) => {
    const matched : Array<Component> = router.$router.getMatchedComponents(to)
    const prevMatched : Array<Component> = router.$router.getMatchedComponents(from)
    let diffed : boolean = false
    const activated: Array<Component> = matched.filter((c: Component, i: number) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }

    Promise.all(activated).then(() => {
      next()
    }).catch(next)
  })
  ssr_vue.$mount('#app')
})

// if (Reflect.has(window, '__INITIAL_STATE__')) {
//   store.replaceState(Reflect.get(window, '__INITIAL_STATE__'))
// }