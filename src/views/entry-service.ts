/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 服务端 Vue渲染入口
 */
import createRootFactory from './root-simple-factory'

let { ssr_vue, store, router } = createRootFactory()

export default (context: any) => {
  
  return new Promise((resolve, reject) => {

    const r = router.$router
    store.dispatch('User/login', context.user || {}).then(() => {
      r.push(context.url).catch(e => {
        console.log(e);
      })
    })

    r.onReady(() => {
      const matchedComponents = r.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents).then(() => {
        context.state = store.state
        resolve(ssr_vue)
      }).catch(reject)

    }, reject)
  })
}
