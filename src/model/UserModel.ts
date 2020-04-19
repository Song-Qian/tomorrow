/**
 * Developer    :   SongQian
 * Time         :   2019-09-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   User数据库模型
 */

import 'reflect-metadata'
import { Model } from 'objection'

export class UserModel extends Model {

  constructor (id = '1', userName = '', password = '', trueName = '', roleId = '', roleName = '', auth = '',
        authName = '', createTime = 0, status = 0, sequence = 0, type = 0, email = '', avatarUrl = '',
        loginType = 0, thirdlyId = '', passwordSalt = '') {
    super()
    this.id = id
    this.userName = userName
    this.password = password
    this.trueName = trueName
    this.roleId = roleId
    this.roleName = roleName
    this.auth = auth
    this.authName = authName
    this.createTime = createTime
    this.status = status
    this.sequence = sequence
    this.type = type
    this.email = email
    this.avatarUrl = avatarUrl
    this.loginType = loginType
    this.thirdlyId = thirdlyId
    this.passwordSalt = passwordSalt
  }

  @Reflect.metadata('id', { type : 'string', maxLength : 50 })
    public id !: string

  @Reflect.metadata('userName', { type : 'string', maxLength : 50 })
     public userName !: string

  @Reflect.metadata('password', { type : 'string', maxLength : 50, default : '' })
     public password !: string

  @Reflect.metadata('trueName', { type : 'string', maxLength : 1024, default : '' })
     public trueName !: string

  @Reflect.metadata('roleId', { type : 'string', maxLength : 1024, default : '' })
     public roleId !: string

  @Reflect.metadata('roleName', { type : 'string', maxLength : 1024, default : '' })
     public roleName !: string

  @Reflect.metadata('auth', { type : 'string', maxLength : 1024, default : '' })
     public auth !: string

  @Reflect.metadata('authName', { type : 'string', maxLength : 1024, default : '' })
     public authName !: string

  @Reflect.metadata('createTime', { type : 'integer', default : 'CURRENT_TIMESTAMP' })
     public createTime !: number

  @Reflect.metadata('status', { type : 'integer', default : 1 })
     public status !: number

  @Reflect.metadata('sequence', { type : 'integer', maxLength: 11, default : 0 })
     public sequence !: number

  @Reflect.metadata('type', { type : 'integer', default : 100 })
     public type !: number

  @Reflect.metadata('email', { type : 'string', maxLength : 45, default : '' })
     public email !: string

  @Reflect.metadata('avatarUrl', { type : 'string', maxLength : 500, default : '' })
     public avatarUrl !: string

  @Reflect.metadata('loginType', { type : 'integer', maxLength : 11, default : 0 })
     public loginType !: number

  @Reflect.metadata('thirdlyId', { type : 'string', maxLength : 100 })
     public thirdlyId !: string

  @Reflect.metadata('passwordSalt', { type : 'string', maxLength : 20 })
     public passwordSalt !: string

}
