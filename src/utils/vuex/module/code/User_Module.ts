/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 示例 User状态模块
 */
import { Getter, Module, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'

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
      token: ''
    }
  }

  get getters (): GetterTree<S, R> {
    return {
      getToken (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
        return (<any>state).token;
      },
      getUser (state : S, getters : Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : any {
        return  state;
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
        // serialize("id", user.id, { maxAge : 0, path : "/", httpOnly : true,  expires : new Date() });
        // serialize("userName", user.userName, { maxAge : 0, path : "/", httpOnly : true,  expires : new Date() });
        // serialize("trueName", user.trueName, { maxAge : 0, path : "/", httpOnly : true,  expires : new Date() });
        // serialize("type", user.type, { maxAge : 0, path : "/", httpOnly : true,  expires : new Date() });
        // serialize("token", user.token, { maxAge : 0, path : "/", httpOnly : true,  expires : new Date() });
        
        if(!global.process) {
          sessionStorage.setItem('id', user.id)
          sessionStorage.setItem('userName', user.userName)
          sessionStorage.setItem('trueName', user.trueName)
          sessionStorage.setItem('type', user.type)
          sessionStorage.setItem('token', user.token)
        }
      },
      delUser (state: S) {
        (<any>state).id = '';
        (<any>state).userName = '';
        (<any>state).trueName = '';
        (<any>state).type = -1;
        (<any>state).token = '';
        if(!global.process) {
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('userName')
          sessionStorage.removeItem('trueName')
          sessionStorage.removeItem('type')
          sessionStorage.removeItem('token')
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
            token: sessionStorage.getItem('token')
          }
          commit('setUser', user)
        }
        return getters.getToken;
      }
    }
  }

}
