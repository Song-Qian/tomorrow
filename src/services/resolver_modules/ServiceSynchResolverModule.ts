/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Server 层实例注入配置 (同步方式)
 */

import { ContainerModule, interfaces } from 'inversify'
import { UserService } from '../UserService'
import { UserModel } from '../../model/UserModel'
import { ServiceMethods } from '@feathersjs/feathers'
import { ServiceIdentifier } from '../../inject_type'

export default class ServiceSynchResolverModule extends ContainerModule {

  constructor () {
    // tslint:disable-next-line: no-empty
    super((): void => {})
    this.registry = this.loader
  }

  private get loader (): interfaces.ContainerModuleCallBack {
    return (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): void => {

      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserService).to(UserService)

    }
  }
}
