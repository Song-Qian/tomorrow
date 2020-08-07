/**
 * Developer  : SongQian
 * Time       : 2020-06-09
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: 聊天主窗口
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject, Provide } from 'vue-property-decorator'
 import { mapGetters, mapActions } from 'vuex'
 import "vue-tsx-support/enable-check"
 
 import io from 'socket.io-client'


 @Component
 export default class Home extends tsx.Component<any> {

    @Provide(Symbol.for('walkieTalkie.io')) walkieTalkieSocket = this.WalkieTalkieIO;

    @Inject(Symbol.for('sys.io')) SysSocket;

    private get WalkieTalkieIO() {
        let me = this;
        let { 'User/getToken' : getToken, 'User/getUser' : getuser } = mapGetters(['User/getToken', 'User/getUser']);
        let token = getToken.apply(me);
        let u = getuser.apply(me);
        let id = u && u.id.replace(/\-/g, '') || '';
        return io(`ws://localhost:3029/WalkieTalkie-${id}`, { reconnectionDelay : 0, reconnectionDelayMax : 1000, transports : ["websocket"], query: { token }});
    }

    protected receiveMessage(fromId: string, message: string, time : any) {
        let me = this;
        let { 'WalkieTalkie/commitNewWalkie' : commitNewWalkie } = mapActions(['WalkieTalkie/commitNewWalkie']);
        commitNewWalkie.apply(me, [{ fromId, type : 'from', message : message, ready : false }]);
    }
    
    protected mounted() : void {
        let  me = this;
        let { 'User/getUser' : getUser, 'User/getToken' : getToken } = mapGetters(['User/getUser', 'User/getToken']);
        let u = getUser.apply(me);
        let token = getToken.apply(me);
        me.walkieTalkieSocket && me.walkieTalkieSocket.on('from', this.receiveMessage);
        if(token) {
            me.SysSocket.emit('sysRestoreAccout', u);
        }
    }

    protected render(): JSX.Element {
        let me = this;
        let { "User/getUser" : user, "Piazzas/hasNewPublish" : hasNewPublish } = mapGetters(['User/getUser', 'Piazzas/hasNewPublish']);
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
                        <el-menu-item class="home-main-item" index="/home/piazza"><el-badge class="home-message-badge" hidden={ !hasNewPublish.apply(me) } is-dot>广场</el-badge></el-menu-item>
                        <el-menu-item class="home-main-item"  nativeOnClick={ (e) => window.open('tencent://message/?uin=1172559463&Site=http://vps.shuidazhe.com&Menu=yes', '_blank') }>联系作者</el-menu-item>
                        <el-menu-item class="home-main-item" index="/home/settings">设置</el-menu-item>
                    </el-menu>
                </div>
                <router-view class="home-main-view"></router-view>
            </div>
        )
    }
 }