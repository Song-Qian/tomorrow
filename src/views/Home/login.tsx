/**
 * Developer  : SongQian
 * Time       : 2020-05-01
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 登陆页
 */
import { Component, Ref } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import "vue-tsx-support/enable-check"

import RESTFULAPI from "~/utils/RestfulApi"
import Keys from "~/utils/Keys-SHA-ES6"

@Component
export default class Login extends tsx.Component<any> {

    constructor() {
        super()
    }

    private user  = {
        username : '',
        password : ''
    }

    private userRules = {
        username : [
            {  required : true, message : "请输入社交称谓", trigger: 'blur' },
            {  min: 2, max : 8, message:  "社交称谓字符应在2-8个字符之间", trigger : 'blur' }
        ],
        password : [
            { required: true, message: '请输入社交密文', trigger: 'blur'},
            { min: 6, max: 18, message: '社交密文符字应在6-18个字符之间', trigger: 'blur'}
        ]
    }

    @Ref("loginForm") protected readonly loginForm;

    protected async login(e : MouseEvent) {
        if(this.$refs.loginForm) {
            let valid = await (this.$refs.loginForm as any).validate().catch(() => false);
            if(valid) {
                var keys = new Keys();
                let result = await this.$http.get(
                    (RESTFULAPI.injective.Api as any).User.find, 
                    { params : { userName : this.user.username, password :  keys.SHA(this.user.password, true) } },
                    { emulateHTTP: true, emulateJSON: false }
                );
                return;
            }
            this.$message.error("验证未能通过。");
            return;
        }
        this.$message.error("系统登陆状态异常。");
    }

    protected onInputHandler(value : string, form : string) {
        const me = this;
        me.user[form] = value;
    }

    protected render(): JSX.Element {
        return (
            <div class="home-login-bg">
                <div class="login-panel">
                    <div class="login-head"></div>
                    <el-form ref="loginForm" rules={ this.userRules } model={ this.user }>
                        <el-form-item prop="username">
                            <el-input placeholder="请输入社交称谓" name="username" style="overflow:hidden; border-radius: 20px;" value={ this.user.username } onInput={ (value : string) => this.onInputHandler(value, "username") }>
                                <template slot="prepend">
                                    <i class="el-icon-s-custom"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入社交密文" name="password" style="overflow:hidden; border-radius: 20px;"  value={ this.user.password } onInput={ (value : string) => this.onInputHandler(value, "password") } show-password>
                                <template slot="prepend">
                                    <i class="el-icon-key"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-tooltip class="item" effect="dark" content="感谢使用tomorrow平台，该应用不需要注册，请输入您喜欢的社交称谓和密文，系统自动完成登陆。" placement="right">
                                <el-button style="width: 100%;" type="primary" icon="el-icon-question" onClick={ this.login } round>
                                    登陆系统
                                </el-button>
                            </el-tooltip>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        )
    }
}