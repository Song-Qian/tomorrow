/**
 * Developer    :   SongQian
 * Time         :   2019-09-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   广场数据
 */

 import 'reflect-metadata'
 import uuid from '~/utils/UUID'
import { UserModel } from './UserModel';

 export class PiazzaModel {
     
    constructor (id = uuid(), text = '', createTime = new Date().getTime(), image = '', uid = '') {
        this.id = id;
        this.text = text;
        this.createTime = createTime;
        this.image = image;
        this.uid = uid;
    }

    @Reflect.metadata('id', { type : 'string', maxLength : 50 })
        public id !: string

    @Reflect.metadata('text', { type : 'string', maxLength : 6000 })
        public text !: string;

    @Reflect.metadata('createTime', { type: 'timestamp', default : null })
        public createTime !: any

    @Reflect.metadata('image', { type: 'string', default : '' })
        public image !: string;

    @Reflect.metadata('uid', { type: 'string', maxLength : 50 })
        public uid !: string;

   @Reflect.metadata('user', { type : UserModel })
        public user !: UserModel;

 }