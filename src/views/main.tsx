import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/vnode'

@Component
export default class extends Vue {

  // tslint:disable-next-line: no-multi-spaces
  name: String =  'SmartBox'

  msg: String = 'Welcome to Your Vue.js App'

  public alert (): void {
    console.log(this.msg)
  }

  protected render (): VNode {
    return (
      <div id='app'>
        <input type='text' v-model={this.msg} />
      </div>
    )
  }
}
