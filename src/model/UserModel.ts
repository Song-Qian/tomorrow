/**
 * Developer    :   SongQian
 * Time         :   2019-09-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   User数据库模型
 */

import 'reflect-metadata'
import { Model } from 'objection'

export class UserModel extends Model {

  constructor (id = '1', userName = '', password = '', trueName = '' , createTime = 0, type = 0, token = '') {
    super()
    this.id = id
    this.userName = userName
    this.password = password
    this.trueName = trueName
    this.createTime = createTime
    this.type = type
    this.token = token
  }

  @Reflect.metadata('id', { type : 'string', maxLength : 50 })
    public id !: string

  @Reflect.metadata('userName', { type : 'string', maxLength : 50 })
     public userName !: string

  @Reflect.metadata('password', { type : 'string', maxLength : 50, default : '' })
     public password !: string

  @Reflect.metadata('trueName', { type : 'string', maxLength : 1024, default : '' })
     public trueName !: string

  @Reflect.metadata('createTime', { type : 'integer', default : 'CURRENT_TIMESTAMP' })
     public createTime !: number

  @Reflect.metadata('type', { type : 'integer', default : 1 })
     public type !: number

  @Reflect.metadata('token', { type : 'string', maxLength : 80 })
     public token !: string

}
