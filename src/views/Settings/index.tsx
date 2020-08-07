/**
 * Developer  : SongQian
 * Time       : 2020-08-07
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 用户信息配置
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject, Ref } from 'vue-property-decorator'
 import { mapGetters, mapActions } from 'vuex'

 import "vue-tsx-support/enable-check"
 import { UserModel } from '~/model/UserModel'
 import Keys from '~/utils/Keys-SHA-ES6'
 import RESTFULAPI from '~/utils/RestfulApi'

 @Component
 export default class Settings extends tsx.Component<any> {

    @Inject(Symbol.for('walkieTalkie.io')) walkieTalkieSocket;

    @Inject(Symbol.for('sys.io')) SysSocket;

    @Ref("form") private readonly form;

    private isEdit : boolean = false;

    private isChangeAvatar : boolean = false;

    private userForm : UserModel = {
        id : '', 
        userName : '',
        trueName : '', 
        password : '', 
        createTime : 0,
        type : 1, 
        key : '', 
        token : '',
        avatar : ''
    }

    private get userRules() {
        return {
            avatar : [
                { required : true, message : '请选择一个头像', trigger : 'blur'}
            ],
            username : [
                {  required : true, message : "请输入社交称谓", trigger: 'blur' },
                {  min: 2, max : 8, message:  "社交称谓字符应在2-8个字符之间", trigger : 'blur' }
            ],
            password : [
                { required: false, message: '', trigger: 'blur'},
                { min: 6, max: 18, message: '社交密文符字应在6-18个字符之间', trigger: 'blur'}
            ],
            trueName : [
                { required: true, message: '请输入社交姓名', trigger: 'blur'},
                { min: 2, max: 5, message: '社交姓名不能超过5个文字', trigger: 'blur'}
            ]
        }
    }

    protected async save(e : MouseEvent) {
        let me = this;
        if(me.isEdit) {
            let valid = await me.form.validate().catch(() => false);
            if(valid) {
                var keys = new Keys();
                me.userForm.password = me.userForm.password && keys.SHA(me.userForm.password, true) || '';
                let result : any = await me.$resource(`${(RESTFULAPI.injective.Api as any).User}{/id}`).update({ id : me.userForm.id }, me.userForm);
                if(result.body.status && result.body.code === 200) {
                    me.userForm = {  ...result.body.data };
                    let { 'User/login' : login } = mapActions(['User/login']);
                    login.apply(me, [result.body.data]);
                    me.SysSocket.emit('sysModifyUser', result.body.data);
                }
            }
        }

        me.isEdit = !me.isEdit;
    }

    protected quit(e : MouseEvent) {
        let me = this;
        let { 'User/out' : out } = mapActions(['User/out']);
        out.apply(me); 
        me.walkieTalkieSocket.close();
        me.SysSocket.close();
        me.$router.push({ name : 'login' });
    }

    protected mounted() {
        let me = this;
        let { "User/getUser" : user } = mapGetters(['User/getUser']);
        let u = user.apply(me);
        me.userForm = { ...u, password : '' };
    }

    protected render() : JSX.Element {
        let me = this;
        let avatarSlot = (<i class={[ 'tomorrow-avatar', `tomorrow-${me.userForm.avatar}-icon` ]} style="cursor: pointer;" onClick={ () => me.isChangeAvatar = true } ></i>);
        let userNameEl = me.isEdit ? <el-input placeholder="请输入用户名" suffix-icon="el-icon-edit el-input__icon" value={ me.userForm.userName } onInput={ (e) => me.userForm.userName = e } readonly></el-input> : <label>{ me.userForm.userName }</label>;
        let passwordEl = me.isEdit ? <el-input placeholder="请输入密文" suffix-icon="el-icon-edit el-input__icon" value={ me.userForm.password } onInput={ (e) => me.userForm.password = e } clearable></el-input> : <label>******</label>;
        let trueNameEl = me.isEdit ? <el-input placeholder="请输入姓名" suffix-icon="el-icon-edit el-input__icon" value={ me.userForm.trueName } onInput={ (e) => me.userForm.trueName = e } clearable></el-input> : <label>{ me.userForm.trueName }</label>;
        let avatarList = me.isEdit ? (
            <div class={[ 'tomorrow-avatar-list', me.isChangeAvatar ? 'active' : '' ]}>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-1-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-1', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-2-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-2', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-3-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-3', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-4-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-4', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-5-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-5', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-boy-6-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'boy-6', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-1-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-1', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-2-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-2', me.isChangeAvatar = false; } }></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-3-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-3', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-4-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-4', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-5-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-5', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-girl-6-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'girl-6', me.isChangeAvatar = false; } } ></i>
                <i class={[ 'tomorrow-avatar', `tomorrow-default-head-icon` ]} style="cursor: pointer;" onClick={ () => { me.userForm.avatar = 'default-head', me.isChangeAvatar = false; } } ></i>
            </div>
        ) : null;

        return (
            <div class="tomorrow-settings">
                <el-form ref="form"  class='settings-form' model={ me.userForm  } rules={ me.userRules } label-position="right" label-width="100px">
                    <el-form-item prop="avatar" label="头像" scopedSlots={{ label : () => avatarSlot }}>
                        <el-link icon="el-icon-s-home" style="float: right; margin-left:10px;" type="danger" underline={ false } onClick={ me.quit }>退出系统</el-link>
                        <el-link icon="el-icon-edit" style="float: right;" type="primary" underline={ false } onClick={ me.save }>{ me.isEdit ? '保存' : '编辑' }</el-link>
                        { avatarList }
                    </el-form-item>
                    <el-form-item label="用户名：" prop="userName">
                        { userNameEl }
                    </el-form-item>
                    <el-form-item label="密文：" prop="password">
                        { passwordEl }
                    </el-form-item>
                    <el-form-item label="姓名：" prop="trueName" >
                        { trueNameEl }
                    </el-form-item>
                </el-form>
            </div>
        )
    }

 }