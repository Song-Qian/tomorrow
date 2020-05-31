/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: App 应用入口
 */
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import "vue-tsx-support/enable-check"

import '~/assets/styles/index.scss'

@Component
export default class TomorrowApp extends tsx.Component<any> {

  constructor() {
    super()
  }

  protected render (): JSX.Element {
    return (
      <div id='app'>
          <router-view />
      </div>
    )
  }
}
