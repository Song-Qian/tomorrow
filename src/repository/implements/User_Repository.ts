/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   用户表操作处理
 */
import { Business_UnitRepositroy } from './Business_UnitRepositroy'
import { UserModel } from '../../model/UserModel'
import { injectable } from 'inversify'

@injectable()
 // tslint:disable-next-line: class-name
 export class User_Repository extends Business_UnitRepositroy<UserModel> {

  static get tableName (): string {
    return 'users'
  }

  static get idColumn (): string {
    return 'id'
  }

  static get jsonSchema (): any {
    let entity = Reflect.construct(UserModel, [])
    let schema = {
      type : 'object',
      required : Object.getOwnPropertyNames(entity)
    }
    let properties = {}
    for (let key of Object.getOwnPropertyNames(entity)) {
      Reflect.defineProperty(this, key, { enumerable : true })
      properties = { ...properties, [key] : Reflect.getMetadata(key, entity, key) }
    }
    return { ...schema, properties }
  }

  static get relationMappings (): any {
    return {}
  }
}