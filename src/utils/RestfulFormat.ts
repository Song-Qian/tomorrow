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
        
        [1001, "用户不存在，请重新确认社交称谓、密文!"],
        [1002, "用户不存在!"],
        [1003, "用户正在上线，DEMO程序暂不支持强制使对方下线!"],
        
        [2001, "用户未注册，无法获取用户信息!"],
        [2002, "非法用户，系统来到未知的区域!"],

        [3001, "创建的广场话题非法提交，请重新登陆尝试!"],
        [3002, "非法广场话题，系统丢失用户ID。"]
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