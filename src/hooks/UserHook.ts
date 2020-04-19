/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   用户后台请求钩子函数
 */

export class UserHook {

  get before () {
    return {
      all : [],
      find : [],
      get : [],
      create : [],
      update : [],
      patch : [],
      remove : []
    }
  }

  get after () {
    return {
      all : [],
      find : [],
      get : [],
      create : [],
      update : [],
      patch : [],
      remove : []
    }
  }

  get error () {
    return {
      all : [],
      find : [],
      get : [],
      create : [],
      update : [],
      patch : [],
      remove : []
    }
  }
}
