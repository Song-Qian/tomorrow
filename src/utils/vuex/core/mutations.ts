import { MutationTree } from 'vuex'

/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 全局跟踪事件，此处禁止写异步函数，禁止写入非全局跟踪事件
 */
export default function<S>(): MutationTree<S> {
  return {
    delUser (state: S) {
      Reflect.set(state as any, 'id', '')
      Reflect.set(state as any, 'username', '')
      Reflect.set(state as any, 'password', '')
      Reflect.set(state as any, 'token', '')
      localStorage.setItem('id', '')
      localStorage.setItem('username', '')
      localStorage.setItem('password', '')
      localStorage.setItem('token', '')
    }
  }
}
