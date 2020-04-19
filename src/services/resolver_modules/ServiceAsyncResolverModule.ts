/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Server 层实例注入配置 (异步方式)
 */

import { AsyncContainerModule, interfaces } from 'inversify'
import { UserModel } from '../../model/UserModel'
import { UserService } from '../UserService'
import { ServiceMethods } from '@feathersjs/feathers'
import { ServiceIdentifier } from '../../inject_type'

export default class ServiceAsyncResolverModule extends AsyncContainerModule {

  constructor () {
    super(async (): Promise<void> => void 0)
    this.registry = this.loader
  }

  private get loader (): interfaces.AsyncContainerModuleCallBack {
    return async (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): Promise<void> => {

      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserService).to(UserService)

    }
  }
}
