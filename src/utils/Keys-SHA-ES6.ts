/**
 * Developer    :   SongQian
 * Time         :   2017-9-17
 * email        :   onlylove1172559463@vip.qq.com
 * description  :   此工具类用于加密解密重要数据字符, 此接口为ES6语法，外部依赖请使用Keys-SHA.js
 */
export default class Keys {

    private getHex() : string{
        let getRandomSHA = function(min, max){
            return Math.floor( Math.random() * (max - min + 1)) + min;
        }

        let n = 0;
        for(let i = 4; i > 0; i--)
            n = (getRandomSHA(0, 1) << i - 1) + n;
        return n.toString(16);
    }

    public getKeySHA() : string{
        let key : Array<string> = [];
        for(let i = 0; i < 40; i++)
            key.push(this.getHex());
        return key.join("");
    }

    public SHA(charts, cases = false) : string {

        let core_sha1 = function(blockArray){
            let x = blockArray;
            var w = Array(80);
            let a = 1732584193;
            let b = -271733879;
            let c = -1732584194;
            let d = 271733878;
            let e = -1009589776;
            for(let n = 0; n < x.length; n += 16)
            {
                let olda = a;
                let oldb = b;
                let oldc = c;
                let oldd = d;
                let olde = e;
                for(let j = 0; j < 80; j++)
                {
                    if(j < 16)
                        w[j] = x[n + j];
                    else
                        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w [j - 14] ^ w[j - 16], 1);
                    let t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return new Array(a, b, c, d, e);
        };

        let sha1_ft = function(t, b, c, d){
            if(t < 20)
                return (b & c) | ((~b) & d);
            if(t < 40)
                return b ^ c ^ d;
            if(t < 60)
                return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        };

        let sha1_kt = function(t){
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        };

        let safe_add = function(x, y){
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };

        let rol = function(num, cnt){
            return (num << cnt) | (num >>> (32 - cnt));
        };

        let AlignSHA1 = function(str){
            let nblk = ((str.length + 8) >> 6) + 1,
                blks = new Array(nblk * 16);
            let i = 0;
            for(i = 0; i < nblk * 16; i++)
                blks[i] = 0;
            for(i = 0; i < str.length; i++)
                blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
            blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
            blks[nblk * 16 - 1] = str.length * 8;
            return blks;
        };

        let binb2hex = function(binarray, hexcase){
            let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            let str = "";
            for(let i = 0; i < binarray.length * 4; i++)
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            return str;
        };

        return binb2hex(core_sha1(AlignSHA1(charts)), cases)
    }

    public parse({str, key}, cases = false) : string {

        if(!key || key.length !== 40 || !/^[0-9a-zA-Z]{1,40}$/.test(key))
            throw new Error("加密key不符合使用要求，无法对字符串进行加密运算！");

        if(str.length > key.length)
            throw new Error("加密字符串超出加密运算长度，请检查str长度是否在40位以内！");

        // let newStr = this.SHA(str);          //需要屏蔽
        let newStr = str;
        let newKey = key;
        let result : Array<string> = [];
        for(let len = 0, n = newKey.length; len < n; len++)
        {
            const char = parseInt(newStr.substr(len, 1), 16);
            const k = parseInt(newKey.substr(len, 1), 16);
            result.push((char ^ k).toString(16));
        }
        return cases ? result.join('').toUpperCase() : result.join('');
    }

    public stringify({str, key}, cases = false) : string {
        if(!key || key.length !== 40 || !/^[0-9a-zA-Z]{1,40}$/.test(key))
            throw new Error("加密key不符合使用要求，无法对字符串进行加密运算！");

        if(str.length > key.length)
            throw new Error("加密字符串超出加密运算长度，请检查str长度是否在40位以内！");

        let result : Array<string> = [];
        let newKey = key;
        let newStr = str;
        for(let len = 0, n = newKey.length; len < n; len ++)
        {
            const char = parseInt(newStr.substr(len, 1), 16);
            const k = parseInt(newKey.substr(len, 1), 16);
            result.push((char ^ k).toString(16));
        }
        return cases ? result.join('').toUpperCase() : result.join('');
    }

}