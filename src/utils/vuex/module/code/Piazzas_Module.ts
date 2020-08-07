/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 广场话题列表
 */
 
import { Getter, Module, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'

export default class Piazzas<S, R> implements Module<S, R> {

    get namespaced (): boolean {
      return true
    }
  
    get state (): S {
      return <any> {
        list : [],
        isNewPublish : false
      }
    }
  
    get getters (): GetterTree<S, R> {
      return {
        hasNewPublish (state: S, getters: Getter<S, R>, rootState: R, rootGetters: Getter<S, R>): string {
          return (<any>state).isNewPublish;
        },
        getPiazzaList (state : S, getters : Getter<S, R>, rootState: R, rootGetters: Getter<S, R>) : any {
          (<any>state).isNewPublish = false;
          return (<any>state).list;
        }
      }
    }
  
    get mutations (): MutationTree<S> {
      return {
        pushPiazzaModel (state: S, model: any) {
          (<any>state).list = [ model, ...(<any>state).list];
          (<any>state).isNewPublish = true;
        },
        initPiazzaModels(state: S, models: Array<any>) {
          (<any>state).list = models;
          (<any>state).isNewPublish = false;
        }
      }
    }
  
    get actions (): ActionTree<S, R> {
      return {
        addNewPiazza ({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>, model: any) {
          commit('pushPiazzaModel', model);
        },
        resetPiazzas({ dispatch, commit, getters, rootGetters, rootState }: ActionContext<S, R>, models: Array<any>) {
          commit('initPiazzaModels', models);
        }
      }
    }
  
  }
  