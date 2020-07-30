/**
 * Developer    :   SongQian
 * Time         :   2020-07-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   首页宣传页面
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject } from 'vue-property-decorator'
 import { mapGetters, mapActions } from 'vuex'
 import moment from 'moment'
 import RESTFULAPI from '~/utils/RestfulApi'

 import "vue-tsx-support/enable-check"
 import { UserModel } from '~/model/UserModel'
 import Walkie from '~/views/Main/walkie'

 @Component({ components : { Walkie } })
 export default class HomeIndex extends tsx.Component<any> {

    constructor() {
        super();
        moment.locale('zh-cn');
    }
    
    @Inject(Symbol.for('walkieTalkie.io')) walkieTalkieSocket;

    private search : string = '';

    private type : string = 'ad';

    private users : Array<UserModel> = [];

    private walkies : Array<any> = [];

    private hasSearch : boolean = false;

    private handlerOnSearch(e) {
        let me = this;
        me.search = e;
    }

    private handlerOnTabsChange(type) {
        let me = this;
        if(type === 'article') {
            return me.$message({ 
                type : "info", 
                customClass : "tomorrow-message", 
                message : "功能正努力研发...", 
                dangerouslyUseHTMLString : true
            });
        }
        me.type = type;
    }

    protected async getUserList() : Promise<void> {
        const me = this;
        let result : any =  await me.$http.get(
            (RESTFULAPI.injective.Api as any).User.list, 
            { params : { page : 1,  limit :  10 } },
            { emulateHTTP: true, emulateJSON: false }
        );
        
        if(result.body.status && result.body.code === 200) {
            me.users = result.body.data;
        }
    }

    protected async ToWalkieTalkie(event : MouseEvent, id : string) : Promise<void> {
        let me = this;
        let { "User/getUser" : user } = mapGetters(['User/getUser']);
        let u = user.apply(me);
        
        if(u.id === id) {
            me.$message({  type : "error",  customClass : "tomorrow-message",  message : "系统拒绝你和自己聊天！",  dangerouslyUseHTMLString : true });
            return void 0;
        }
        if(me.walkies.indexOf(id) > -1) {
            me.$message({  type : "error",  customClass : "tomorrow-message",  message : "聊天窗口已打开！",  dangerouslyUseHTMLString : true });
            return void 0;
        }
        me.walkies.push(id);
    }

    protected receiveMessage(fromId: string, message: string, time : any) {
        let me = this;
        let { 'WalkieTalkie/commitNewWalkie' : commitNewWalkie } = mapActions(['WalkieTalkie/commitNewWalkie']);
        commitNewWalkie.apply(me, [{ fromId, type : 'from', message : message, ready : false }]);
    }

    protected handlerWalkieClose(id) {
        let me = this;
        me.walkies = me.walkies.filter(it => it !== id);
    }

    protected mounted() {
        let me = this;
        me.walkieTalkieSocket && me.walkieTalkieSocket.on('from', this.receiveMessage);
        me.getUserList();
        document.onclick = (e) => {
            me.hasSearch = false;
        }
    }

    protected render(): JSX.Element {
        let me = this;
        let searchTrigger = ( me.hasSearch ? null : <li onClick={ tsx.modifiers.stop(() => me.hasSearch = true) }><i class="el-icon-search"></i></li> );
        let { "User/getUser" : user } = mapGetters(['User/getUser']);
        let u = user.apply(me);
        let { "Sys/hasUserOnline" : hasUserOnline, 'Sys/getUserForUseranme' : getUserForUseranme } = mapGetters(['Sys/hasUserOnline', 'Sys/getUserForUseranme']);
        let online = hasUserOnline.apply(me)('songqian');
        let admin = getUserForUseranme.apply(me)('songqian');

        let userList = me.users.map(it => {
                let online = hasUserOnline.apply(me)(it.userName);
                return (<div class="home-main-users-item">
                    <i class={[ 'tomorrow-avatar', `tomorrow-${it.avatar}-icon`, online ? '' : 'tomorrow-avatar-unline' ]}></i>
                    <div class="home-main-user-info">
                        <span>{ it.trueName }</span>
                        <small>愿你前程似锦，未来可期​。</small>
                    </div>
                    <div class='home-main-user-action'>
                        <i class='el-icon-chat-dot-square' onClick={ tsx.modifiers.stop((e) => { me.ToWalkieTalkie(e, it.id) })  }></i>
                        <i class='el-icon-phone-outline' onClick={ () => me.$message({ type : "info", customClass : "tomorrow-message",  message : "功能正努力研发...",  }) }></i>
                    </div>
                </div>)
            }
        )

        let walkieWindows = me.walkies.map(it => {
            return (
                <walkie id={ it } on-handler-window-close={ me.handlerWalkieClose } walkie-talkie-socket={ me.walkieTalkieSocket }></walkie>
            )
        })
        return (
            <div>
                <div class="home-main-header">
                    <div class={ ['home-main-search', me.hasSearch ? 'hasSearch' : '' ] }>
                        <el-input placeholder="搜索" onInput={ me.handlerOnSearch }></el-input>
                    </div>
                    <ul class="home-main-pages">
                        <li class={ me.type === 'ad' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('ad') }>我的广场</li>
                        <li class={ me.type === 'user' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('user') }>用户</li>
                        <li class={ me.type === 'article' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('article') }>话题</li>
                        { searchTrigger }
                    </ul>
                </div>
                <ul class={['home-main-content', me.type === 'user' ? 'users' : '']}>
                    <li class="home-main-ad">
                        <el-card shadow="always" class="home-main-ad-card">
                            <el-row type="flex" justify="center" align="middle">
                                <el-col span={10}><i class={[ 'tomorrow-avatar', `tomorrow-${u.avatar}-icon` ]}></i><span style='margin-left: 20px; color: #fff;'>{ u.trueName }</span></el-col>
                                <el-col span={10}></el-col>
                                <el-col span={4} style="text-align: right; color: #fff;">{ moment(new Date(u.createTime / 1)).fromNow() }</el-col>
                            </el-row>
                            <el-row type="flex" justify="center" align="middle">
                                <el-col span={24}>
                                    <p style='color: #fff;'>愿你前程似锦，未来可期​。</p>
                                </el-col>
                            </el-row>
                            <div class="home-main-propagate" style={{ backgroundImage: "url(/assets/images/tomorrow.jpg)" }}></div>
                            {/* <el-row type="flex" justify="center" align="middle">
                                <el-col span="24">
                                    <i class="el-icon-star-off" style='margin-left: 10px; cursor: pointer;' />
                                    <i class="el-icon-position" style='margin-left: 10px; cursor: pointer;' />
                                    <i class="el-icon-chat-dot-square" style='margin-left: 10px; cursor: pointer;' />
                                </el-col>
                            </el-row> */}
                        </el-card>
                    </li>
                    <li class="home-main-users">
                        <div class="home-main-users-item">
                            <i class={[ 'tomorrow-avatar', `tomorrow-admin-icon`, online ? '' : 'tomorrow-avatar-unline' ]}></i>
                            <div class="home-main-user-info">
                                <span>宋骞（作者）</span>
                                <small>愿你前程似锦，未来可期​。</small>
                            </div>
                            <div class='home-main-user-action'>
                                <i class='el-icon-chat-dot-square' onClick={ tsx.modifiers.stop((e) => { me.ToWalkieTalkie(e, admin.length && admin[0].id || '') }) }></i>
                                <i class='el-icon-phone-outline'></i>
                            </div>
                        </div>
                        { userList }
                    </li>
                </ul>
                { walkieWindows }
            </div>
        )
    }
 }