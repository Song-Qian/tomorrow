/**
 * Developer    :   SongQian
 * Time         :   2019-12-20
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :
 */

export const ExpressFeathersSymbol = Symbol.for('ExpressFeathers')

export const ServiceIdentifier = {
  UserLoginService : Symbol.for('UserLoginService'),
  UserService : Symbol.for('UserService'),
  PiazzaService : Symbol.for('PiazzaService')
}

export const RepositoryIdentifier = {
  knex : Symbol.for('Knex'),
  UserRepository : Symbol.for('UserRepository'),
  PiazzaRepository : Symbol.for('PiazzaRepository')
}
