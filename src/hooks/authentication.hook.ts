/** 
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   安全验证以及状态保持功能
 */

 import { Hook, HookContext } from '@feathersjs/feathers'
import RestfulFormat from '~/utils/RestfulFormat';

 export default () : Hook => {
    return (context : HookContext) => {
        const { app, result, params } = context;
        if(result.status && result.code === 200 ) {
            let users : Map<string, any> = app.get("userLists");
            let rootNsp = (app as any).io.of('/');
            //这里可以让正在线上的用户强制下线，但这里DEMO程序没必要这么做，暂时不上用户上线。
            if([...users.values()].some(user => user.id === result.data.id)) {
                const newData = RestfulFormat.restFromat(1003, { ...result.data, id : '', password : '',  key : '', token : '', trueName : '', type : -1 });
                context.result = newData;
                return context;
            }
            // let cookie = params.headers?.cookie ? parse(params.headers?.cookie) : {};
            // if(!users.has(cookie.io)) {
            //     users.set(cookie.io, result.data);
            // }
            rootNsp.emit('sysonline', [...users.values()]);
        }
        return context;
    }
 }