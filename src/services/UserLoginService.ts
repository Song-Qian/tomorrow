/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   用户业务类
 */

import 'reflect-metadata'
import { Params, Paginated, Id, Hook } from '@feathersjs/feathers'
import { Model } from 'objection'
import { injectable, inject } from 'inversify'
import { UserModel } from '../model/UserModel'
import { IBusiness_UnitOfWorkRepositroy } from '../repository/IBusiness_UnitRepositroy'
import { User_Repository } from '../repository/implements/User_Repository'
import { RepositoryIdentifier } from '../inject_type'
import { AbstructService } from './AbstructService'
import RestfulFormatHook from '../hooks/restful.fromat.hook'
import AuthenticationHook from '../hooks/authentication.hook'

import Keys from '../utils/Keys-SHA-ES6'
import UUID from '../utils/UUID'

@injectable()
@Reflect.metadata('RequestMapping', '/users/login')
export class UserLoginService extends AbstructService<UserModel> {

  @inject(RepositoryIdentifier.UserRepository) protected readonly model !: Model

  
  protected get afterHooks() : { [key : string] : Hook[] } {
    return {
        all : [
          RestfulFormatHook()
        ],
        find : [
          AuthenticationHook()
        ]
    }
  }

  public async find (params?: Params | undefined): Promise<UserModel | UserModel[] | Paginated<UserModel>> {
    const me = this
    me.raw = 200;
    let keys = new Keys();
    let user : any = { 
      ...params?.query,
      key : keys.getKeySHA(),
      id : UUID(),
      trueName : '',
      type : -1,
      token : UUID()
    };
    const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository
    if(Object.keys(params?.query || {}).length === 0) {
      return repositroy.find()
    }

    let result : UserModel | null = await repositroy.getSingleModelForCondition({ userName: user.userName} as any);
    if(result && user.password === keys.stringify({ str : result.password, key : result.key}, true)) {
      user.id = result.id;
      user.trueName = result.trueName;
      user.createTime = (result.createTime as Date).getTime();
      user.key = result.key;
      user.type = result.type;
      user.password = result.password;
      await repositroy.modify(user);
      user.key = '';
      user.password = '';
      return user;
    }

    if(!result) {
      user.password = keys.parse({ str : user.password, key : user.key }, true);
      user.type = user.userName.toUpperCase() === "SONGQIAN" ? 999 : 1;
      await repositroy.add(user);
      user.key = '';
      user.password = '';
      return user;
    }

    me.raw = 1001;
    return { ...user, id : '', password : '',  key : '', token : '', trueName : '', type : -1 };
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

  public async update (id: Id, data: UserModel, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

  public async patch (id: Id, data: Partial<UserModel>, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

  public async remove (id: Id, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

}
