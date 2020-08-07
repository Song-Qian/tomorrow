/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Repository 层实例注入配置 (同步方式)
 */

import { ContainerModule, interfaces } from 'inversify'
import knex from 'knex'
import configuration from '@feathersjs/configuration'
import { IRepository } from '../IRepository'
import { User_Repository } from '../implements/User_Repository'
import { Piazza_Repository } from '../implements/Piazza_Repository'
import { RepositoryIdentifier } from '../../inject_type'

export default class RepositorySynchResolverModule extends ContainerModule {

  constructor () {
    // tslint:disable-next-line: no-empty
    super(() => {})
    this.registry = this.loader
  }

  private get loader (): interfaces.ContainerModuleCallBack {
    return (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): void => {

      bind<knex>(RepositoryIdentifier.knex).toDynamicValue((ctx: interfaces.Context) => {
        let conf = configuration()()
        return knex({ client : conf.mysql.client, connection : conf.mysql.connection, pool : conf.mysql.pool })
      }).inSingletonScope()

      bind<IRepository>(RepositoryIdentifier.UserRepository).to(User_Repository)
      bind<IRepository>(RepositoryIdentifier.PiazzaRepository).to(Piazza_Repository)
    }
  }
}
