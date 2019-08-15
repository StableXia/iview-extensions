<template>
  <div :class="cssPrefix" :style="styles">
    <ac-base-message-tip-item
      v-for="item in messageItemList"
      :key="item.name"
      :type="item.type"
      :content="item.content"
      :duration="item.duration"
      :closable="item.closable"
      :name="item.name"
      :transition-name="item.transitionName"
      :on-close="item.onClose"
      :cssPrefix="item.cssPrefix"
      :tipType="item.tipType"
    >
    </ac-base-message-tip-item>
  </div>
</template>

<script>
import AcBaseMessageTipItem from './message-tip-item'

let count = 0
const now = Date.now()

export default {
  name: 'AcBaseMessageTip',

  components: { AcBaseMessageTipItem },

  data() {
    return {
      messageItemList: []
    }
  },

  props: {
    styles: Object,
    cssPrefix: String
  },

  methods: {
    getUuid() {
      return `ac-message__item-${now}-${count++}`
    },

    add(messageItemProps = {}) {
      const name = messageItemProps.name || this.getUuid()
      const _messageItemProps = Object.assign(
        {
          content: '',
          duration: 1.5,
          closable: false,
          name: name
        },
        messageItemProps
      )

      this.messageItemList.push(_messageItemProps)
    },

    close(name) {
      const messageItemList = this.messageItemList
      for (let i = 0; i < messageItemList.length; i++) {
        if (messageItemList[i].name === name) {
          this.messageItemList.splice(i, 1)
          break
        }
      }
    },

    closeAll() {
      this.messageItemList = []
    }
  }
}
</script>
