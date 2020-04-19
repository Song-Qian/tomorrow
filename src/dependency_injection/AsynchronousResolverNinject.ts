/**
 * Developer    :   SongQian
 * Time         :   2019-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   同步注入依赖模块
 */

import DependencyResolver from './DependencyResolver'
import ServiceAsyncResolverModule from '../services/resolver_modules/ServiceAsyncResolverModule'
import RepositoryAsyncResolverModule from '../repository/resolver_modules/RepositoryAsyncResolverModule'

export default class AsynchronousResolverNinject extends DependencyResolver {

  constructor () {
    super()
    // tslint:disable-next-line: no-floating-promises
    this.AddAsynchronousModules(new ServiceAsyncResolverModule(), new RepositoryAsyncResolverModule())
  }

}
