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

    @Inject(Symbol.for('socket.io')) socket;
    
    protected mounted() : void {
        let  me = this;
        let { 'User/getUser' : getUser } = mapGetters(['User/getUser']);
        let { 'User/getToken' : getToken } = mapGetters(['User/getToken']);
        let u = getUser.apply(me);
        let token = getToken.apply(me);
        if(token) {
            me.socket.emit('sysRestoreAccout', u);
        }
    }

    protected render(): JSX.Element {
        let me = this;
        let { "Sys/getOnlineUser" : users } = mapGetters(['Sys/getOnlineUser']);
        let liEls = users.apply(me).map(it => <li>{ it.userName }</li>)
        return (
            <div>
                <p>hollow index</p>
                <ul>
                    { liEls }
                </ul>
            </div>
        )
    }
 }