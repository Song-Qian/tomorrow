/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 全局模块化状态器，自动加载各开发人员的模块状态。禁止对此类进行非框架性需求修改。
 */
// tslint:disable-next-line: no-multi-spaces
import * as  packages from '../module/module_imports'
import { ModuleTree } from 'vuex'

// tslint:disable-next-line: class-name
export default class modules<S, R> {

  modules: ModuleTree<R>

  constructor () {
    // tslint:disable-next-line: no-unused-expression
    this.modules = Object.create({})
    this.init()
  }

  init () {
    for (let module of Object.keys(packages)) {
      this.modules[module] = Reflect.construct(packages[module], []) || {}
    }
  }

  getModules (): ModuleTree<R> {
    return this.modules
  }

}
