/**
 * Developer    :   SongQian
 * Time         :   2020-07-09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   私聊界面
 */

import * as tsx from 'vue-tsx-support'
import { Component, Prop, Emit, Ref } from 'vue-property-decorator'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import RESTFULAPI from '~/utils/RestfulApi'

import "vue-tsx-support/enable-check"
import { UserModel } from '~/model/UserModel'

@Component
export default class Walkie extends tsx.Component<any> {
    
    constructor() {
        super();
    }

    @Prop({ default : 'unknown' }) readonly id;

    @Prop({ default : null }) readonly walkieTalkieSocket;

    @Ref('walkieWindow') protected readonly walkieWindow;

    @Ref('walkieMessageBox') protected readonly walkieMessageBox;

    private user : UserModel = Object.create(null);

    private hasOpen = true;

    private drapdown = false;

    private message : string = '';

    private relatively = { x : 0, y : 0 };
    private offset = { x : 'calc((100% - 1080px) * 0.5)', y : '20%' };

    protected sendMessage(e) {
        let me = this;
        // let toMessage = document.createElement("div");
        // toMessage.setAttribute('class', 'wt-to-message');
        // toMessage.innerText = me.message;
        // document.body.appendChild(toMessage);
        let { 'WalkieTalkie/commitNewWalkie' : commitNewWalkie } = mapActions(['WalkieTalkie/commitNewWalkie']);
        commitNewWalkie.apply(me, [{ fromId : me.id.replace(/\-/g, ''), type : 'to', message : me.message, ready : true }]);
        me.walkieTalkieSocket.emit('to', me.id.replace(/\-/g, ''), me.message);
        me.message = "";
    }

    protected emptyUserMessage() {
        let me = this;
        let span = document.createElement("span");
        span.setAttribute('class', 'wt-empty-message');
        span.innerText = '用户不在线，暂无法收到您的消息';
        span.addEventListener('animationend', () => me.walkieMessageBox.removeChild(span));
        me.walkieMessageBox.appendChild(span);
    }

    private async getUserInfo() {
        let me = this;
        let result : any =  await me.$resource(`${(RESTFULAPI.injective.Api as any).User}{/id}`).get({ id : me.id }, { emulateHTTP : false, emulateJSON : false });
        if(result.body.status && result.body.code === 200) {
            me.user = result.body.data;
            return void 0;
        }
        me.$message({  type : "error",  customClass : "tomorrow-message",  message : result.body.message,  dangerouslyUseHTMLString : true });
    }

    @Emit('handler-window-close')
    protected onHandlerWindowClose() {
        let me = this;
        me.hasOpen = false;
        let callback = () => { 
            me.walkieWindow.removeEventListener('animationend', callback);
            me.$emit('handler-window-close', me.id) 
        };
        me.walkieWindow.addEventListener('animationend', callback);
    }

    protected onWalkieDrapMove(e : MouseEvent) {
        let me = this;
        me.drapdown = true;
        me.relatively.x = e.clientX - me.walkieWindow.offsetLeft;
        me.relatively.y = e.clientY - me.walkieWindow.offsetTop;
    }

    protected updated() {
        let me = this;
        me.$nextTick(() => {
            me.walkieMessageBox.scrollTop  = me.walkieMessageBox.scrollHeight;
        })
    }

    protected mounted() {
        let me = this;
        me.walkieTalkieSocket && me.walkieTalkieSocket.on('empty user', me.emptyUserMessage);
        me.getUserInfo();

        let mouseUp = (e : MouseEvent) => { me.drapdown = false };
        let mouseMove = (e : MouseEvent) => {
            if(me.drapdown) {
                let x = e.clientX;
                let y = e.clientY;
                me.offset.x = `${x - me.relatively.x}px`;
                me.offset.y = `${y - me.relatively.y}px`;
            }
        };
        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('mousemove', mouseMove);
        me.$once("hook:beforeDestroy", () => {
            document.removeEventListener('mouseup', mouseUp);
        })
    }

    protected render(): JSX.Element {
        let me = this;
        let { "Sys/hasUserOnline" : hasUserOnline, 'Sys/getUserForUseranme' : getUserForUseranme } = mapGetters(['Sys/hasUserOnline', 'Sys/getUserForUseranme']);
        let online = hasUserOnline.apply(me)(me.id);
        let { 'WalkieTalkie/getWalkieMessages' : getWalkieMessages } = mapGetters(['WalkieTalkie/getWalkieMessages']);
        let messages = getWalkieMessages.apply(me)(me.id.replace(/\-/g, ''));
        return (
            <div ref='walkieWindow' class={ ['wt-window ', me.hasOpen ? 'visibility' : 'hide'] }  style={{ top : me.offset.y, left : me.offset.x }}>
                <div class="wt-window-header" onMousedown={ tsx.modifiers.stop(me.onWalkieDrapMove) }>
                    <i class={[ 'tomorrow-avatar', `tomorrow-${me.user && me.user.avatar || 'default-head'}-icon`, online ? '' : 'tomorrow-avatar-unline' ]}></i>
                    <div class="wt-window-user-info">
                        <span>{ me.user && me.user.trueName || '来自远方的朋友' }</span>
                        <small>愿你前程似锦，未来可期​。</small>
                    </div>
                    <div class="wt-window-action">
                        <i class="el-icon-close" onClick={ me.onHandlerWindowClose }></i>
                    </div>
                </div>
                <div class="wt-window-body" ref="walkieMessageBox">
                    { messages.map(it => (<div class={[`wt-${it.type}-message`]}><div class="wt-message__content">{ it.message }</div></div>)) }
                </div>
                <div class="wt-window-footer">
                    <input type="text" class="wt-message-box" name="message" value={ me.message } onInput={ (e : any) => me.message = e.target.value }  onKeydown={ tsx.modifiers.enter(me.sendMessage)  }/><button type="button" class="wt-message-send" onClick={ me.sendMessage }><i class="el-icon-s-promotion"></i>发送</button>
                </div>
            </div>
        )
    }
}