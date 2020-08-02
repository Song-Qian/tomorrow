/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: App 应用入口
 */
import { Component, Provide } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { mapGetters, mapActions } from 'vuex'

import "vue-tsx-support/enable-check"
import io from 'socket.io-client'

import '~/assets/styles/index.scss'

@Component
export default class TomorrowApp extends tsx.Component<any> {

  constructor() {
    super()
    this.SysSocket.on("sysonline", this.handlerOnLineEvent.bind(this.SysSocket, this));
    this.SysSocket.on("sysunline", this.handlerUnLineEvent.bind(this.SysSocket, this));
  }

  private get SysSocketIO() {
    let me = this;
    let { 'User/getToken' : getToken, 'User/getUser' : getuser } = mapGetters(['User/getToken', 'User/getUser']);
    let token = getToken.apply(me) || '';
    let u = getuser.apply(me);
    // let id = u && u.id.replace(/\-/g, '') || '';
    return io(`ws://localhost:3029`, { forceNew : true, reconnectionDelay : 0, reconnectionDelayMax : 1000, transports : ["websocket"], query: { token } });
  }

  @Provide(Symbol.for('sys.io')) SysSocket = this.SysSocketIO;

  private handlerOnLineEvent(me, users) {
    let { 'Sys/updateUsers' : updateOnlineUsers } = mapActions(['Sys/updateUsers']);
    updateOnlineUsers.apply(me,[users]);
  }

  private handlerUnLineEvent(me, users) {
    let { 'Sys/updateUsers' : updateOnlineUsers } = mapActions(['Sys/updateUsers']);
    updateOnlineUsers.apply(me,[users]);
  }

  protected render (): JSX.Element {
    return (
      <div id='app'>
          <router-view />
      </div>
    )
  }
}
