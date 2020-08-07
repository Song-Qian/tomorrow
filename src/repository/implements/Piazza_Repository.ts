/**
 * Developer    :   SongQian
 * Time         :   2020-08-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   广场数据操作处理
 */

import { Business_UnitRepositroy } from './Business_UnitRepositroy'
import { PiazzaModel } from '../../model/PiazzaModel'
import { injectable } from 'inversify'
import Objection, { QueryContext, transaction } from 'objection'
import { User_Repository } from './User_Repository';

@injectable()
export class Piazza_Repository extends Business_UnitRepositroy<PiazzaModel> {

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
        return 'piazza'
    }

    static get idColumn (): string {
        return 'id'
    }

    static get jsonSchema (): any {
        let entity = Reflect.construct(PiazzaModel, [])
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
        return {
            users: {
                relation : this.BelongsToOneRelation,
                modelClass: User_Repository,
                join: {
                    from: 'piazza.uid',
                    to : 'users.id'
                }
            }
        }
    }

    public async getConditionForPage (expression: () => { [key: string]: any }, page: number, limit: number): Promise<PiazzaModel[]> {
        let trx !: Objection.Transaction;
        try {
          trx = await transaction.start(this.dbContext);
          let andWhere = expression().andWhere;
          let orWhere = expression().orWhere;
          let WhereNot = expression().WhereNot;
          let orWhereNot = expression().orWhereNot;
          let orderBy = expression().orderBy;
          let queryBuilder = (this.constructor as any).query(trx).alias('p').select([
            "p.*",
            "u.id as uid",
            "u.userName as userName",
            "u.password as password",
            "u.trueName as trueName",
            "u.createTime as ctime",
            "u.type as type",
            "u.key as key",
            "u.token as token",
            "u.avatar as avatar"
          ]).joinRelated('users', { alias: 'u' });
          if(andWhere) {
            queryBuilder = queryBuilder.andWhere(andWhere);
          }
    
          if(orWhere) {
            queryBuilder = queryBuilder.orWhere(orWhere);
          }
    
          if(WhereNot) {
            queryBuilder = queryBuilder.orWhereNot(WhereNot);
          }
    
          if(orWhereNot) {
            queryBuilder = queryBuilder.orWhereNot(orWhereNot);
          }
    
          if(orderBy) {
            for(let [field, order] of orderBy) {
              queryBuilder = queryBuilder.orderBy(field, order || 'asc');
            }
          }
          let result = await queryBuilder.limit(limit).offset((page - 1) * limit);
          return result as PiazzaModel[];
        } catch(e) {
          console.error(e);
          await trx.rollback();
        }
        return new Array<PiazzaModel>();
    }

    $afterGet(queryContext : QueryContext) {
      (this as any).user = {
        id : (this as any).uid,
        userName : (this as any).userName,
        password : '',
        trueName : (this as any).trueName,
        createTime : ((this as any).ctime as Date).getTime(),
        type : (this as any).type,
        key : '',
        token : (this as any).token,
        avatar : (this as any).avatar
      };
      (this as any).createTime = ((this as any).createTime as Date).getTime();
      delete (this as any).uid;
      delete (this as any).userName;
      delete (this as any).password;
      delete (this as any).trueName;
      delete (this as any).ctime;
      delete (this as any).type;
      delete (this as any).key;
      delete (this as any).token;
      delete (this as any).avatar;
      return super.$afterGet(queryContext);
    }

    $beforeInsert(queryContext : QueryContext) {
        (this as any).createTime = (this.constructor as any).fn.now();
        return super.$beforeInsert(queryContext);
    }

}