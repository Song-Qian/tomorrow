/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 示例 User状态模块
 */
import { Getter, Action, Mutation, Module, GetterTree, MutationTree, ActionTree, Store, ActionContext } from 'vuex'

export default class User<S, R> implements Module<S, R> {

  get namespaced (): boolean {
    return true
  }

  get state (): any {
    return {
      id: '',
      username: '',
      password: '',
      token: ''
    }
  }

  get getters (): GetterTree<S, R> {
    return {
      getToken (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return Reflect.get(state as any, 'token')
      },
      getUsername (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return Reflect.get(state as any, 'username')
      },
      getPassword (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return Reflect.get(state as any, 'password')
      },
      getUser (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): S {
        return state
      },
      getUserId (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return Reflect.get(state as any, 'id')
      }
    }
  }

  get mutations (): MutationTree<S> {
    return {
      setUser (state: S, user: any) {
        Reflect.set(state as any, 'id', user.id, user)
        Reflect.set(state as any, 'username', user.username, user)
        Reflect.set(state as any, 'password', user.password, user)
        Reflect.set(state as any, 'token', user.token, user)
        localStorage.setItem('id', user.id)
        localStorage.setItem('name', user.name)
        localStorage.setItem('password', user.password)
        localStorage.setItem('token', user.token)
      },
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

  get actions (): ActionTree<S, R> {
    return {
      login ({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>, user: any) {
        commit('setUser', user)
      },
      out ({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>) {
        commit('delUser')
      },
      hasLogin ({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>) {
        let user = {
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password'),
          token: localStorage.getItem('token')
        }
        commit('setUser', user)
        return user.token
      }
    }
  }

}
