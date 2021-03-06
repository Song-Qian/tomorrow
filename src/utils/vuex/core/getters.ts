import { Getter, GetterTree } from 'vuex'

/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 全局属性，非关键全局属性禁止写入此处
 */
export default function<S, R>(): GetterTree<S, R> {
  return {
    getUsername (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
      return Reflect.get(state as any, 'username')
    }
  }
}
