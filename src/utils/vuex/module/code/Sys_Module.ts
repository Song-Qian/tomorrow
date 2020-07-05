/**
 *  Developer   : SongQian
 *  Time        : 2020/06/27
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : App应用状态管理
 */
import { Getter, Module, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
 
export default class Sys<S, R> implements Module<S, R> {
    
  get namespaced (): boolean {
    return true
  }

  get state (): S {
    return <any> {
        users : []
    }
  }
  
  get getters (): GetterTree<S, R> {
    return {
        getOnlineUser(state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) {
            return (state as any).users
        }
    }
  }

  
  get mutations (): MutationTree<S> {
    return {
        setUsers(state: S, users: Array<any>) {
            (state as any).users = users;
        }
    }
  }

  get actions (): ActionTree<S, R> {
    return {
        updateUsers({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>, users : Array<any>) {
            commit('setUsers', users )
        }
    }
  }

}