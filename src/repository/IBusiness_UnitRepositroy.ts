/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   数据库粒度单位业务表
 */

import { IRepository } from './IRepository'

// tslint:disable-next-line: class-name
export interface IBusiness_UnitOfWorkRepositroy<T> extends IRepository {

  find (): Promise<T[]>

  get (id: number | string): Promise<T | null>

  getCondition (t : T): Promise<T[]>

  getConditionForPage (expression: () => { [key: string]: any }, page: number, limit: number): Promise<T[]>

  getSingleModelForCondition (t : T): Promise<T | null>

  getCount (): Promise<number>

  getCountForCondinate (expression: () => { [key: string]: any }): Promise<number>

  add (model: T): Promise<T | null>

  addList (models: T[]): Promise<number>

  modify (t : T): Promise<T | null>

  modifyCondition (expression: () => { [key: string]: any }): Promise<number>

  delete (id: number | string): Promise<T | null>

  deleteCondintion (expression: () => { [key: string]: any }): Promise<number>

  order (field: string, hasAsc: boolean): Promise<T[]>

  groupBy (fields: string[]): Promise<T[]>

}
