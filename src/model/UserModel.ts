/**
 * Developer    :   SongQian
 * Time         :   2019-09-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   User数据库模型
 */

import 'reflect-metadata'

export class UserModel {

  constructor (id = '1', userName = '', password = '', trueName = '' , createTime = new Date().getTime(), type = 0, avatar = '', key  = '', token = '') {
    this.id = id
    this.userName = userName
    this.password = password
    this.trueName = trueName
    this.createTime = createTime;
    this.avatar = avatar;
    this.type = type
    this.key = key;
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

  @Reflect.metadata('createTime', { type: 'timestamp', default : null })
     public createTime !: any

  @Reflect.metadata('type', { type : 'integer', default : 1 })
     public type !: number

   @Reflect.metadata('key', { type : 'string', maxLength : 50, default : '' })
      public key !: string;

  @Reflect.metadata('token', { type : 'string', maxLength : 80 })
     public token !: string

   @Reflect.metadata('avatar', { type : 'string', maxlength : 20 })
      public avatar !: string;

}
