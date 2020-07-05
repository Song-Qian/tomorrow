/** 
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   安全验证以及状态保持功能
 */

 import { Hook, HookContext } from '@feathersjs/feathers'
 import { parse } from 'cookie'

 export default () : Hook => {
    return (context : HookContext) => {
        const { app, result, params } = context;
        if(result.status && result.code === 200 ) {
            let users : Map<string, any> = app.get("userLists");
            let rootNsp = (app as any).io.of('/');
            let cookie = params.headers?.cookie ? parse(params.headers?.cookie) : {};
            if(!users.has(cookie.io)) {
                users.set(cookie.io, result.data);
            }
            rootNsp.emit('sysonline', [...users.values()]);
        }
        return context;
    }
 }