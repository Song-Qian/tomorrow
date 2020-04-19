import { ActionContext, ActionTree } from 'vuex'

/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 全局动作函数写入此处,大家共同维护，此处禁止放入非全局状态
 */
export default function<S, R>(): ActionTree<S, R> {
  return {
    changeSys ({ commit, dispatch, state, getters }: ActionContext<S, R>, sys) {
      commit('trigger', sys)
    }
  }
}
