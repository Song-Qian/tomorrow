/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   用户表操作处理
 */
import { Business_UnitRepositroy } from './Business_UnitRepositroy'
import { UserModel } from '../../model/UserModel'
import { injectable } from 'inversify'
import { QueryContext, ModelOptions } from 'objection';

@injectable()
 // tslint:disable-next-line: class-name
 export class User_Repository extends Business_UnitRepositroy<UserModel> {

  constructor() {
    super();
    // this.dbContext.schema.createTableIfNotExists('users', table => {
    //   console.log("create tables %s", 'users');
    //   table.increments('id');
    //   table.string('text');
    //   table.boolean('complete');
    //   table.timestamp('createdAt');
    //   table.timestamp('updatedAt');
    // })
  }

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

  $beforeInsert(queryContext : QueryContext) {
    (this as any).createTime = (this.constructor as any).fn.now();
    (this as any).type = (this as any).userName.toUpperCase() === "SONGQIAN" ? 999 : 1;
    (this as any).trueName = (this as any).userName.toUpperCase() === "SONGQIAN" ? "宋骞（作者）" : '';
    return super.$beforeInsert(queryContext);
  }

  $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    (this as any).createTime = (this.constructor as any).raw("FROM_UNIXTIME(? / 1000)", (this as any).createTime);
    (this as any).type = (this as any).userName.toUpperCase() === "SONGQIAN" ? 999 : 1;
    (this as any).trueName = (this as any).userName.toUpperCase() === "SONGQIAN" ? "宋骞（作者）" : '';
    return super.$beforeUpdate(opt, queryContext);
  }
}
