/**
 * Developer    :   SongQian
 * Time         :   2019-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   同步注入依赖模块
 */

import DependencyResolver from './DependencyResolver'
import ServiceSynchResolverModule from '../services/resolver_modules/ServiceSynchResolverModule'
import RepositorySynchResolverModule from '../repository/resolver_modules/RepositorySynchResolverModule'

export default class SynchronousResolverNinject extends DependencyResolver {

  constructor () {
    super()
    this.AddSynchronousNinjectModels(new ServiceSynchResolverModule(), new RepositorySynchResolverModule())
  }

}
