<template>
  <span :class="[{'ac-icon--bottom': bottomAlign, 'ac-icon--block': asBlock, 'ac-icon--middle': middleAlign, }]">
    <i :class="classes" :style="styles"></i>
  </span>
</template>

<script>
const prefixCls = "ac-icon";

export default {
  name: "AcIcon",
  data() {
    return {
      sizeMap: {
        xxsmall: 8,
        xsmall: 10,
        small: 14,
        medium: 18,
        large: 24,
        xlarge: 36,
        xxlarge: 48
      }
    };
  },
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      /** could be xxsmall, xsmall, small, medium, large, xlarge */
      type: String,
      default: 'medium'
    },
    color: String,
    custom: {
      type: String,
      default: ''
    },
    bottomAlign: {
      type: Boolean,
      default: false
    },
    middleAlign: {
      type: Boolean,
      default: false
    },
    asBlock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: this.type !== '',
          [`${this.custom}`]: this.custom !== ''
        }
      ];
    },
    styles() {
      const style = {
        'font-size': `${this.sizeMap[this.size]}px`,
      };
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  }
};
</script>
