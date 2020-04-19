/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   封装数据库共公代码
 */

import { IBusiness_UnitOfWorkRepositroy } from '../IBusiness_UnitRepositroy'
import knex from 'knex'
import Objection, { Model, transaction, Pojo } from 'objection'
import { inject, injectable, named } from 'inversify'
import { RepositoryIdentifier } from '../../inject_type'

@injectable()
 // tslint:disable-next-line: class-name
 export abstract class Business_UnitRepositroy<T extends Pojo> extends Model implements IBusiness_UnitOfWorkRepositroy<T> {

  @inject(RepositoryIdentifier.knex)
    protected dbContext !: knex

  static tableName: string

  static idColumn: string

  static jsonSchema: any

  static relationMappings: any

  public async find (): Promise<T[]> {
    let trx !: Objection.Transaction
    let data: T[]
    try {
      trx = await transaction.start(this.dbContext)
      // tslint:disable-next-line: await-promise
      let result = await this.dbContext.select('*').from((this.constructor as any).tableName)
      // tslint:disable-next-line: await-promise
      await trx.commit()
      return result
    } catch (e) {
      // tslint:disable-next-line: await-promise
      await trx.rollback()
    }
    return new Array<T>()
  }

  public async get (id: string | number): Promise<T | null> {
    let trx !: Objection.Transaction
    try {
      trx = await transaction.start(this.dbContext)
      let result = await (this.constructor as any).query(trx).findById(id)
      // tslint:disable-next-line: await-promise
      await trx.commit()
      // tslint:disable-next-line: no-multi-spaces
      return  result as T
    } catch (e) {
      // tslint:disable-next-line: await-promise
      await trx.rollback()
    }
    return null
  }

  public async getCondition (expression: () => [[string, number]]): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  public async getConditionForPage (expression: () => [[string, number]], page: number, limit: number): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  public async getSingleModelForCondition (expression: () => [[string, number]]): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  public async getCount (): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async getCountForCondinate (expression: () => [[string, number]]): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async add (model: T): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  public async addList (models: T[]): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async modify (id: string | number): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  public async modifyCondition (expression: () => [[string, number]]): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async delete (id: string | number): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  public async deleteCondintion (expression: () => [[string, number]]): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async order (field: string, hasAsc: boolean): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  public async groupBy (fields: string[]): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

}
