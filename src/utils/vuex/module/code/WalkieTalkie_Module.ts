/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 点对点聊天对话框
 */

import { Getter, Module, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import Vue from 'vue'

export default class WalkieTalkie<S, R> implements Module<S, R> {

  get namespaced (): boolean {
    return true
  }

  get state (): S {
    return <any> {
        walkies : {}
    }
  }

  get getters (): GetterTree<S, R> {
    return {
      getWalkieTalkieSize (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): number {
        return Object.keys((<any>state).walkies).length;
      },
      getNewWalkieMessageSize(state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : (payload : string) => number {
        return (fromId : string) : number => {
            let walkieMeessages = (<any>state).walkies[fromId] || [];
            return walkieMeessages.filter(it => it.type === 'from' && !it.ready).length;
        }
      },
      getAllNewWalkieMessageSize(state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : number {
        let size = 0;
        for(let walkie of (<any>state).walkies) {
            size += walkie.filter(it => it.type === 'from' && !it.ready).length;
        }
        return size;
      },
      getWalkieMessages(state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : (payload: string) => Array<any> {
        return (fromId : string) : Array<any> => {
          return (<any>state).walkies[fromId] || [];
        }
      }
    }
  }

  get mutations (): MutationTree<S> {
    return {
      UpdateReady(state: S, payload : any) {
        let walkieMeessages = (<any>state).walkies[payload.fromId];
        walkieMeessages.forEach((walkie) => {
            walkie.ready = payload.ready;
        })
      },
      addNewWalkieMessage(state: S, payload : any) {
        let walkie = (<any>state).walkies[payload.fromId] || [];
        walkie.push({ ready : payload.ready, type : payload.type, message : payload.message });
        Vue.set((<any>state).walkies, payload.fromId, walkie);
      }
    }
  }

  get actions (): ActionTree<S, R> {
    return {
      readyWalkie({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>, fromId: string) {
          commit('UpdateReady', { ready : true, fromId });
      },
      commitNewWalkie({dispatch, commit, getters, rootGetters, rootState}, payload) {
        commit('addNewWalkieMessage', payload);
      }
    }
  }

}
