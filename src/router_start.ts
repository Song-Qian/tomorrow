/**
 * Developer    :   SongQian
 * Time         :   2019-12-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   应用服务跟由启动配置相关
 */

import { Application } from './declarations'
import DependencyResolver from './dependency_injection/DependencyResolver'
import AsynchronousResolverNinject from './dependency_injection/AsynchronousResolverNinject'
import SynchronousResolverNinject from './dependency_injection/SynchronousResolverNinject'
import { ServiceMethods } from '@feathersjs/feathers'
import { join } from 'path'

export default function (app: Application) {

  const { async } = app.get('ninject')
  const { target } = app.get('proxy')
  // tslint:disable-next-line: variable-name
  let dependency_injection: DependencyResolver = async ? new AsynchronousResolverNinject() : new SynchronousResolverNinject()
  let services = dependency_injection.GetServices<any>()
  services.forEach((it: ServiceMethods<any>, index) => {
    // tslint:disable-next-line: variable-name
    let http_net_path = Reflect.getMetadata('RequestMapping', it.constructor)
    app.use(join(target, http_net_path).replace(/[\\]+/g, '/'), it)
    let service = app.service(join(target, http_net_path).replace(/[\\]+/g, '/'))
    service.hooks({ after : it.afterHooks || [], before : it.beforeHooks || [], error : it.errorHooks || [] })
  })
  return app
}
