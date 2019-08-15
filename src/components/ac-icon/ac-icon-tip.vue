<template>
  <span class="ac-icon-tip" :class="classes">
    <ac-icon
      :type="type"
      :size="size"
      :color="color"
      :bottom-align="bottomAlign"
    ></ac-icon>
    <span v-if="tip" class="ac-icon-tip__text">{{ tip }}</span>
  </span>
</template>

<script>

export default {
  name: 'AcIconTip',
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    size: {
      /** could be xxsmall, xsmall, small, medium, large, xlarge */
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: '',
    },
    bottomAlign: {
      type: Boolean,
      default: false,
    },
    asBlock: {
      type: Boolean,
      default: false,
    },
    tip: String,
  },
  computed: {
    classes() {
      return [
        'ac-layout--center-items',
        {
          'ac-layout': this.asBlock,
          'ac-layout--inline': !this.asBlock,
        },
      ];
    },
  },
};
</script>
