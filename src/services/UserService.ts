/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   用户业务类
 */

import 'reflect-metadata'
import { Params, Paginated, Id, ServiceMethods } from '@feathersjs/feathers'
import { Model } from 'objection'
import { injectable, inject } from 'inversify'
import { UserModel } from '../model/UserModel'
import { IBusiness_UnitOfWorkRepositroy } from '../repository/IBusiness_UnitRepositroy'
import { User_Repository } from '../repository/implements/User_Repository'
import { RepositoryIdentifier } from '../inject_type'

@injectable()
@Reflect.metadata('RequestMapping', '/users')
export class UserService implements ServiceMethods<UserModel> {

  @inject(RepositoryIdentifier.UserRepository)
    protected readonly model !: Model

  public async find (params?: Params | undefined): Promise<UserModel[] | Paginated<UserModel>> {
    const me = this
    const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository
    return repositroy.find()
  }

  public async get (id: Id, params?: Params | undefined): Promise<UserModel> {
    const me = this
    const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository
    const result = repositroy.get(id)
    return result ? Object.create(null) : result
  }

  public async create (data: Partial<UserModel> | Partial<UserModel>[], params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

  public async update (id: Id, data: UserModel, params?: Params | undefined): Promise<UserModel> {
    throw new Error('Method not implemented.')
  }

  public async patch (id: Id, data: Partial<UserModel>, params?: Params | undefined): Promise<UserModel> {
    throw new Error('Method not implemented.')
  }

  public async remove (id: Id, params?: Params | undefined): Promise<UserModel> {
    throw new Error('Method not implemented.')
  }

}
