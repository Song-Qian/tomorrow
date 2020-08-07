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
 import { AbstructService } from './AbstructService'
 import { UserModel } from '../model/UserModel'
 import { RepositoryIdentifier } from '../inject_type'
 import { User_Repository } from '~/repository/implements/User_Repository'
 import { IBusiness_UnitOfWorkRepositroy } from '~/repository/IBusiness_UnitRepositroy'
import Keys from '~/utils/Keys-SHA-ES6'

 @injectable()
 @Reflect.metadata('RequestMapping', '/users')
 export class UserService extends  AbstructService<UserModel> {
     
  @inject(RepositoryIdentifier.UserRepository) protected readonly model !: Model

  public async find (params?: Params | undefined): Promise<UserModel | UserModel[] | Paginated<UserModel>> {
      const me = this;
      me.raw = 200;
      let page = params?.query && params.query.page || 1;
      let limit = params?.query && params.query.limit || 50;
      const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository;
      const expression = () => {
        return {
          WhereNot : {
            userName: 'songqian'
          }
        }
      }
      let result = await repositroy.getConditionForPage(expression, page, limit);
      return result;
  }

  public async get (id: Id, params?: Params | undefined): Promise<UserModel> {
    const me = this
    me.raw = id === 'unknown' ? 2001 : 200;
    if(me.raw === 2001) {
      return Object.create({ userName : '', trueName : '来自远方的朋友', id : '', avatar : 'admin', createTime : 0 });
    }
    const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository
    const result = await repositroy.get(id)
    if(!result) {
      me.raw = 2002;
    }
    return result ? result : Object.create({ userName : '', trueName : '来自远方的朋友', id : '', avatar : 'default', createTime : 0 });
  }

  public async create (data: Partial<UserModel> | Partial<UserModel>[], params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

  public async update (id: Id, data: UserModel, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    let me = this;
    me.raw = 200;
    const repositroy: IBusiness_UnitOfWorkRepositroy<UserModel> =  me.model as User_Repository;
    let result : UserModel | null = await repositroy.get(id);
    if(result == null) {
      me.raw = 1002;
      return Object.create(null);
    }
    let keys = new Keys();
    data.id = result.id;
    // data.trueName = result.trueName;
    data.createTime = (result.createTime as Date).getTime();
    data.key = result.key;
    data.type = result.type;
    // data.avatar = result.avatar;
    data.password = data.password && keys.parse({ str : data.password, key : result.key }, true) || result.password;
    await repositroy.modify(data);
    data.key = '';
    data.password = '';
    return data;
  }

  public async patch (id: Id, data: Partial<UserModel>, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }

  public async remove (id: Id, params?: Params | undefined): Promise<UserModel | UserModel[]> {
    throw new Error('Method not implemented.')
  }
 }