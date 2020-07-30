/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Repository 层实例注入配置 (异步方式)
 */

import { AsyncContainerModule, interfaces } from 'inversify'
import configuration from '@feathersjs/configuration'
import knex from 'knex'
import { IRepository } from '../IRepository'
import { User_Repository } from '../implements/User_Repository'
import { RepositoryIdentifier } from '../../inject_type'

export default class RepositoryAsyncRssesolverModule extends AsyncContainerModule {

  constructor () {
    super(async (): Promise<void> => void 0)
    this.registry = this.loader
  }

  private get loader (): interfaces.AsyncContainerModuleCallBack {
    return async (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): Promise<void> => {
      let conf = configuration()()
      bind<knex>(RepositoryIdentifier.knex).toDynamicValue((ctx: interfaces.Context) => {
        let conf = configuration()()
        return knex({ client : conf.mysql.client, connection : conf.mysql.connection, pool : conf.mysql.pool })
      }).inSingletonScope()

      bind<IRepository>(RepositoryIdentifier.UserRepository).to(User_Repository)
    }
  }
}
