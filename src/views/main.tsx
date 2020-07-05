/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: App 应用入口
 */
import { Component, Provide } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { mapActions } from 'vuex'

import "vue-tsx-support/enable-check"
import io from 'socket.io-client'

import '~/assets/styles/index.scss'

@Component
export default class TomorrowApp extends tsx.Component<any> {

  constructor() {
    super()
    this.socket.on("sysonline", this.handlerOnLineEvent.bind(this.socket, this));
    this.socket.on("sysunline", this.handlerOnLineEvent.bind(this.socket, this));
  }

  @Provide(Symbol.for('socket.io')) socket = io('ws://localhost:3029');

  private handlerOnLineEvent(me, users) {
    let { 'Sys/updateUsers' : updateOnlineUsers } = mapActions(['Sys/updateUsers']);
    updateOnlineUsers.apply(me, [users]);
  }

  protected render (): JSX.Element {
    return (
      <div id='app'>
          <router-view />
      </div>
    )
  }
}
