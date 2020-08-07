/**
 *  Developer   : SongQian
 *  Time        : 2017/10/10
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 此处存放项目所有Restful Api 访问地址
 */

class RestfulAddress {

    constructor(url : string, v : string){
        this.$baseUrl = url;
        this.$version = v;
    }

    private readonly $baseUrl : string;
    private readonly $version : string;

    get Api() : this {
        let me = this;
        const url = this.$baseUrl;
        const address = {
            UserLogin : `${url}/users/login`,
            User : `${url}/users`,
            Piazza : `${url}/piazza`
        }
        return Object.assign(me, address);
    }
}

export default {
    injective : new RestfulAddress(`http://localhost:3030/api`, "0.0.1")
}


