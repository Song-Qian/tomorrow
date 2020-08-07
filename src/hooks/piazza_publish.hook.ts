/** 
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   广场话题发布全局通知钩子
 */

 
import { Hook, HookContext } from '@feathersjs/feathers'

export default () : Hook => {
   return (context : HookContext) => {
       const { app, result, params } = context;
       if(result.status && result.code === 200 ) {
           let rootNsp = (app as any).io.of('/');
           rootNsp.emit('piazza_publish', result.data);
       }
       return context;
   }
}