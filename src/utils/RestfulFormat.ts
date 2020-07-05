/**
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   封装所有异常、请求等数据体，返回前端统一格式数据，用于标准数据交互。
 */

 type JsonOutPut  = {
    code : number
    message : string
    status : boolean
    data : any
 }

 export default class {

    private static readonly messageMap : Map<number, string> = new Map<number, string>([
        [200, "Ok"],
        [400, "Bad Request."],
		[404, "not found"],
		[401, "NotAuthorization."],
		[405, "Method Not Allowed."],
		[406, "Not Acceptable."],
        [500, "Server Error."],
        
        [1001, "用户不存在，请重新确认社交称谓、密文!"]
    ]);

    

    public static restFromat(code : number, data : any, ...args) : JsonOutPut {
        let output : JsonOutPut = { code : 200, message : '', status : true, data : null };
        output.code = code;
        if(this.messageMap.has(code)) {
            output.message = this.messageMap.get(code) || '';
            output.status = code === 200;
            output.data = data;
        }
        return output;
    }

 }