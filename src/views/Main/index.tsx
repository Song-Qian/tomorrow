/**
 * Developer    :   SongQian
 * Time         :   2020-07-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   首页宣传页面
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject } from 'vue-property-decorator'
 import { mapGetters } from 'vuex'
 import moment from 'moment'
 import RESTFULAPI from '~/utils/RestfulApi'

 import "vue-tsx-support/enable-check"
 import { UserModel } from '~/model/UserModel'
 import { PiazzaModel } from '~/model/PiazzaModel'
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

    private piazzaList : Array<PiazzaModel> = [];

    private hasSearch : boolean = false;

    private handlerOnSearch(e: string) {
        let me = this;
        me.search = e;
    }

    private handlerOnTabsChange(type: string) {
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

    protected stopSearchHidden(e : MouseEvent) {
        let me = this;
        let fn = () : void => { 
            return void 0;
        };
        Object.defineProperty(fn, '__proto__', {
            value : Function.prototype,
            enumerable : false
        })
        tsx.modifiers.stop(fn)(e);
    }

    protected async getUserList() : Promise<void> {
        const me = this;
        let result : any =  await me.$http.get(
            (RESTFULAPI.injective.Api as any).User, 
            { params : { page : 1,  limit :  999 } },
            { emulateHTTP: true, emulateJSON: false }
        );
        
        if(result.body.status && result.body.code === 200) {
            me.users = result.body.data;
        }
    }

    protected ToWalkieTalkie(e : MouseEvent, id : string) : void {
        let me = this;
        let fn = () : void => { 
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
        };
        Object.defineProperty(fn, '__proto__', {
            value : Function.prototype,
            enumerable : false
        })
        tsx.modifiers.stop(fn)(e);
    }

    protected handlerWalkieClose(id: any) {
        let me = this;
        me.walkies = me.walkies.filter(it => it !== id);
    }

    protected handlerOpenSearch(e : MouseEvent) : void {
        let me = this;
        let fn = () : void => { me.hasSearch = true };
        Object.defineProperty(fn, '__proto__', {
            value : Function.prototype,
            enumerable : false
        })
        tsx.modifiers.stop(fn)(e);
        
    }

    protected async getPiazzaList() {
        let me = this;
        let { "User/getUser" : user } = mapGetters(['User/getUser']);
        let u = user.apply(me);
        let result : any = await me.$http.get(
            (RESTFULAPI.injective.Api as any).Piazza,
            { params : { uid : u.id, page : 1,  limit :  999 } },
            { emulateHTTP: false, emulateJSON: false }
        )
        
        if(result.body.status && result.body.code === 200) {
            me.piazzaList = result.body.data;
        }
    }

    protected mounted() {
        let me = this;
        me.getUserList();
        me.getPiazzaList();
        document.onclick = (e) => {
            me.hasSearch = false;
        }
    }

    protected render(): JSX.Element {
        let me = this;
        let { 
                "User/getUser" : user, 
                'WalkieTalkie/getAllNewWalkieMessageSize' : getAllNewWalkieMessageSize, 
                "Sys/hasUserOnline" : hasUserOnline, 
                'Sys/getUserForUseranme' : getUserForUseranme,
                'WalkieTalkie/getNewWalkieMessageSize' : getNewWalkieMessageSize
        } = mapGetters(['User/getUser', 'Sys/hasUserOnline', 'Sys/getUserForUseranme', 'WalkieTalkie/getAllNewWalkieMessageSize', 'WalkieTalkie/getNewWalkieMessageSize']);
        let u = user.apply(me);
        let online = hasUserOnline.apply(me)('songqian');
        let admin = getUserForUseranme.apply(me)('songqian');
        let allNewMessageSize = getAllNewWalkieMessageSize.apply(me);
        let adminNewMessageSize = admin.length ? getNewWalkieMessageSize.apply(me)(admin[0].id.replace(/\-/g, '')) : 0;

        let userList = me.users.map(it => {
                let online = hasUserOnline.apply(me)(it.userName);
                let newMessageSize = getNewWalkieMessageSize.apply(me)(it.id.replace(/\-/g, ''));
                return (<div class="home-main-users-item">
                    <el-badge class='home-message-badge' value={ newMessageSize } max={99} hidden={ newMessageSize === 0 } >
                        <i class={[ 'tomorrow-avatar', `tomorrow-${it.avatar}-icon`, online ? '' : 'tomorrow-avatar-unline' ]}></i>
                    </el-badge>
                    <div class="home-main-user-info">
                        <span>{ it.trueName }</span>
                        <small>愿你前程似锦，未来可期​。</small>
                    </div>
                    <div class='home-main-user-action'>
                        <i class='el-icon-chat-dot-square' onClick={ (e) => me.ToWalkieTalkie(e, it.id) }></i>
                        <i class='el-icon-phone-outline' onClick={ () => me.$message({ type : "info", customClass : "tomorrow-message",  message : "功能正努力研发...",  }) }></i>
                    </div>
                </div>)
            }
        )
        let searchTrigger = ( me.hasSearch ? null : <li onClick={ me.handlerOpenSearch }><i class="el-icon-search"></i></li> );

        let walkieWindows = me.walkies.map(it => {
            return (
                <walkie id={ it } on-handler-window-close={ me.handlerWalkieClose } walkie-talkie-socket={ me.walkieTalkieSocket }></walkie>
            )
        })

        let ad_list = me.piazzaList.map((it : any) => (
                <el-card shadow="always" class="home-main-ad-card">
                    <el-row type="flex" justify="center" align="middle">
                        <el-col span={10}><i class={[ 'tomorrow-avatar', `tomorrow-${it.user.avatar}-icon` ]}></i><span style='margin-left: 20px; color: #fff;'>{ it.user.trueName }</span></el-col>
                        <el-col span={10}></el-col>
                        <el-col span={4} style="text-align: right; color: #fff;">{ moment(new Date(it.createTime / 1)).fromNow() }</el-col>
                    </el-row>
                    <el-row type="flex" justify="center" align="middle">
                        <el-col span={24}>
                            <p style='color: #fff;'>{ it.text }</p>
                        </el-col>
                    </el-row>
                    <div class="home-main-propagate" style={{ backgroundImage: `url(${ it.image })` }}></div>
                </el-card>
            )
        );

        return (
            <div>
                <div class="home-main-header">
                    <div class={ ['home-main-search', me.hasSearch ? 'hasSearch' : '' ] }>
                        <el-input placeholder="搜索" onInput={ me.handlerOnSearch } nativeOnClick={ me.stopSearchHidden }></el-input>
                    </div>
                    <ul class="home-main-pages">
                        <li class={ me.type === 'ad' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('ad') }>我的广场</li>
                        <li class={ me.type === 'user' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('user') }>
                            <el-badge class='home-message-badge' value={ allNewMessageSize } max={99} hidden={ allNewMessageSize === 0 } >用户</el-badge>
                        </li>
                        <li class={ me.type === 'article' ? 'active' : '' } onClick={ () => me.handlerOnTabsChange('article') }>话题</li>
                        { searchTrigger }
                    </ul>
                </div>
                <ul class={['home-main-content', me.type === 'user' ? 'users' : '']}>
                    <li class="home-main-ad">
                        { ad_list }
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
                        </el-card>
                    </li>
                    <li class="home-main-users">
                        <div class="home-main-users-item">
                            <el-badge class='home-message-badge' value={ adminNewMessageSize } max={99} hidden={ adminNewMessageSize === 0 } >
                                <i class={[ 'tomorrow-avatar', 'tomorrow-admin-icon', online ? '' : 'tomorrow-avatar-unline' ]}></i>
                            </el-badge>
                            <div class="home-main-user-info">
                                <span>宋骞（作者）</span>
                                <small>愿你前程似锦，未来可期​。</small>
                            </div>
                            <div class='home-main-user-action'>
                                <i class='el-icon-chat-dot-square' onClick={ (e) => me.ToWalkieTalkie(e, admin.length && admin[0].id || '') }></i>
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