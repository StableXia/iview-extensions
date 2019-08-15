import Vue from 'vue'
import MessageTip from './message-tip'

MessageTip.newInstance = (properties = {}) => {
  const Instance = new Vue({
    data: properties,
    render(h) {
      return h(MessageTip, {
        props: properties
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const messageTipComponent = Instance.$children[0]

  return {
    addMessageItem(messageItemProps) {
      messageTipComponent.add(messageItemProps)
    },

    removeMessageItem(messageItemName) {
      messageTipComponent.close(messageItemName)
    },

    component: messageTipComponent,

    destroy(name) {
      messageTipComponent.closeAll()
      setTimeout(function() {
        document.body.removeChild(document.getElementsByClassName(name)[0])
      }, 500)
    }
  }
}

export default MessageTip
