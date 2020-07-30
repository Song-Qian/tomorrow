/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Server 层实例注入配置 (同步方式)
 */

import { ContainerModule, interfaces } from 'inversify'
import { UserLoginService } from '../UserLoginService'
import { UserService } from '../UserService'
import { UserModel } from '../../model/UserModel'
import { ServiceMethods } from '@feathersjs/feathers'
import { ServiceIdentifier } from '../../inject_type'

export default class ServiceSynchResolverModule extends ContainerModule {

  constructor () {
    /**
     * this.registry 与 super(params) 都是初始化AsyncContainerModuleCallBack类型回调函数
     * 因为super()中不能使用 this关键字
     * 因此 () : void => void 0 是一句敷衍语句
     */
    super(() : void => void 0)
    this.registry = this.loader
  }

  private get loader (): interfaces.ContainerModuleCallBack {
    return (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): void => {

      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserLoginService).to(UserLoginService)
      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserService).to(UserService)

    }
  }
}
