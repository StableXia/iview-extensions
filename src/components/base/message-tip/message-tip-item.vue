<template>
  <transition :name="transitionName">
    <div :class="classes">
      <template v-if="type === 'notice'">
        <div :class="[cssPrefix + '__inner', 'ac-layout']">
          <div :class="[cssPrefix + '__mark']"></div>
          <div>
            <div :class="[cssPrefix + '__header']">
              <div>{{ title }}</div>
              <ac-icon
                type="close"
                size="small"
                :class="[cssPrefix + '__close']"
                @click.native="close"
                v-if="closable"
              ></ac-icon>
            </div>
            <div :class="[cssPrefix + '__body']">{{ content }}</div>
          </div>
        </div>
      </template>

      <template v-if="type === 'message'">
        <div
          :class="[
            cssPrefix + '__inner',
            'ac-layout',
            'ac-layout--center-items'
          ]"
        >
          <ac-icon
            :type="tipType"
            size="small"
            :class="[
              cssPrefix + '__mark',
              cssPrefix + '__mark--' + tipType,
              'ac-layout-col-small'
            ]"
          ></ac-icon>
          <div class="ac-layout-col-small">{{ content }}</div>
          <ac-icon
            type="close"
            size="small"
            :class="[cssPrefix + '__close']"
            @click.native="close"
            v-if="closable"
          ></ac-icon>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AcBaseMessageTipItem',
  props: {
    cssPrefix: String,
    duration: {
      type: Number,
      default: 1.5
    },
    type: String,
    tipType: String,
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    className: String,
    name: {
      type: String,
      required: true
    },
    onClose: Function,
    transitionName: String
  },

  computed: {
    classes() {
      return [
        this.cssPrefix,
        'ac-layout-row-small',
        'ac-layout',
        { 'ac-layout--center-justify': this.type === 'message' }
      ]
    }
  },

  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    close() {
      this.clearCloseTimer()
      this.onClose()
      this.$parent.close(this.name)
    }
  },

  mounted() {
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
  }
}
</script>
