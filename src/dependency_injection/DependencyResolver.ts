/**
 * Developer    :   SongQian
 * Time         :   2019-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   依赖注入容器
 */
import { Container, ContainerModule, AsyncContainerModule, interfaces } from 'inversify'
import { ServiceIdentifier } from '../inject_type'

export default class DependencyResolver {

  private readonly Ikernel: Container = new Container({ autoBindInjectable: true })

  protected AddSynchronousNinjectModels (..._modules: ContainerModule[]): void {
    this.Ikernel.load(..._modules)
  }

  protected async AddAsynchronousModules (..._modules: AsyncContainerModule[]): Promise<void> {
    await this.Ikernel.loadAsync(..._modules)
  }

  protected clearAllNinjectModules (): void {
    this.Ikernel.unbindAll()
  }

  protected clearNinjectModules (..._modules: ContainerModule[] | AsyncContainerModule[]): void {
    this.Ikernel.unload(..._modules)
  }

  public GetService<T> (serviceIdentifier: interfaces.ServiceIdentifier<any>): T {
    return this.Ikernel.get<T>(serviceIdentifier)
  }

  public GetServices<T> (): T[] {
    return Object.values(ServiceIdentifier).map(it => {
      return this.Ikernel.get<T>(it)
    })
  }

}
