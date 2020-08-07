/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Server 层实例注入配置 (异步方式)
 */
import { AsyncContainerModule, interfaces } from 'inversify'
import { UserModel } from '../../model/UserModel'
import { PiazzaModel } from '~/model/PiazzaModel'
import { UserLoginService } from '../UserLoginService'
import { PiazzaService } from '../PiazzaService'
import { UserService } from '../UserService'
import { ServiceMethods } from '@feathersjs/feathers'
import { ServiceIdentifier } from '../../inject_type'

export default class ServiceAsyncResolverModule extends AsyncContainerModule {

  constructor () {
    /**
     * this.registry 与 super(params) 都是初始化AsyncContainerModuleCallBack类型回调函数
     * 因为super()中不能使用 this关键字
     * 因此 async () => void  0 是一句敷衍语句
     */
    super(async (): Promise<void> => void 0)
    this.registry = this.loader
  }

  private get loader (): interfaces.AsyncContainerModuleCallBack {
    return async (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind): Promise<void> => {

      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserLoginService).to(UserLoginService)
      bind<ServiceMethods<UserModel>>(ServiceIdentifier.UserService).to(UserService)
      bind<ServiceMethods<PiazzaModel>>(ServiceIdentifier.PiazzaService).to(PiazzaService)

    }
  }
}
