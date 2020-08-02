/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 示例 User状态模块
 */
import { Getter, Module, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import Vue from 'vue'

export default class User<S, R> implements Module<S, R> {

  get namespaced (): boolean {
    return true
  }

  get state (): S {
    return <any> {
      id: '',
      userName: '',
      trueName : '',
      type : -1,
      token: '', 
      avatar : '',
      createTime : 0,
    }
  }

  get getters (): GetterTree<S, R> {
    return {
      getToken (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return (<any>state).token;
      },
      getUser (state : S, getters : Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : any {
        if((<any>state).token) {
          return  <any>state;
        }
        return  null;
      }
    }
  }

  get mutations (): MutationTree<S> {
    return {
      setUser (state: S, user: any) {
        (<any>state).id = user.id;
        (<any>state).userName = user.userName;
        (<any>state).trueName = user.trueName;
        (<any>state).type = user.type;
        (<any>state).token = user.token;
        (<any>state).avatar = user.avatar;
        (<any>state).createTime = user.createTime;
        
        if(!global.process) {
          sessionStorage.setItem('id', user.id)
          sessionStorage.setItem('userName', user.userName)
          sessionStorage.setItem('trueName', user.trueName)
          sessionStorage.setItem('type', user.type)
          sessionStorage.setItem('token', user.token)
          sessionStorage.setItem('avatar', user.avatar)
          sessionStorage.setItem('createTime', user.createTime)
        }
      },
      delUser (state: S) {
        (<any>state).id = '';
        (<any>state).userName = '';
        (<any>state).trueName = '';
        (<any>state).type = -1;
        (<any>state).token = '';
        (<any>state).avatar = '';
        (<any>state).createTime = 0;
        if(!global.process) {
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('userName')
          sessionStorage.removeItem('trueName')
          sessionStorage.removeItem('type')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('avatar')
          sessionStorage.removeItem('createTime')
        }
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
        if(!global.process) {
          let user = {
            id: sessionStorage.getItem('id'),
            userName: sessionStorage.getItem('userName'),
            trueName: sessionStorage.getItem('trueName'),
            type: sessionStorage.getItem('type'),
            token: sessionStorage.getItem('token'),
            avatar: sessionStorage.getItem('avatar'),
            createTime : sessionStorage.getItem('createTime')
          }
          commit('setUser', user)
        }
        return getters.getToken;
      }
    }
  }

}
