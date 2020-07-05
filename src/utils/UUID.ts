/**
 *  Developer   : SongQian
 *  Time        : 2019/03/17
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : UUID生成算法
 */

 export default function() : string {
     function S4() {
         return (((1+Math.random()) * 0x10000)|0).toString(16).substring(1);
     }
     return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
 }