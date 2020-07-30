/**
 * Developer  : SongQian
 * Time       : 2020-06-09
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 聊天主窗口
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject } from 'vue-property-decorator'
 import { mapGetters } from 'vuex'
 import "vue-tsx-support/enable-check"



 @Component
 export default class Home extends tsx.Component<any> {

    @Inject(Symbol.for('sys.io')) SysSocket;
    
    protected mounted() : void {
        let  me = this;
        let { 'User/getUser' : getUser } = mapGetters(['User/getUser']);
        let { 'User/getToken' : getToken } = mapGetters(['User/getToken']);
        let u = getUser.apply(me);
        let token = getToken.apply(me);
        if(token) {
            me.SysSocket.emit('sysRestoreAccout', u);
        }
    }

    protected render(): JSX.Element {
        let me = this;
        let { "User/getUser" : user } = mapGetters(['User/getUser']);
        let u = user.apply(me);
        return (
            <div class="home-main-bg">
                <div class="home-main-head">
                    <i class={[ 'tomorrow-avatar', `tomorrow-${u.avatar}-icon` ]}></i>
                    <span style='margin-left: 20px'>{ u.trueName }</span>
                </div>
                <div class="home-main-menu">
                    <el-menu mode="vertical" text-color="#fff" background-color="transparent" menu-trigger="click" style="border-right: 0px solid #fff;" router>
                        <el-menu-item class="home-main-item" index="/home/main">主页</el-menu-item>
                        <el-menu-item class="home-main-item" index="/home/ad">广场</el-menu-item>
                        <el-menu-item class="home-main-item"  nativeOnClick={ (e) => window.open('tencent://message/?uin=1172559463&Site=http://vps.shuidazhe.com&Menu=yes', '_blank') }>联系作者</el-menu-item>
                        <el-menu-item class="home-main-item" index="/home/settings">设置</el-menu-item>
                    </el-menu>
                </div>
                <router-view class="home-main-view"></router-view>
            </div>
        )
    }
 }