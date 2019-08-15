<template>
  <nav class="ac-toolbar ac-layout"
    :class="['ac-typo-'+fontSize, {'ac-toolbar--shadow': withShadow, 'ac-toolbar--for-app': forApp}]"
    :style="{height: height + 'px'}">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'AcToolbar',
  props: {
    height: {
      type: Number,
      default: 64,
    },
    fontSize: {
      type: String,
      default: 'sub-title',
    },
    forApp: {
      type: Boolean,
      default: false,
    },
    withShadow: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      toolbarParam: this.toolbarParam,
    };
  },
  data() {
    return {
      toolbarParam: {
        forApp: this.forApp,
      },
    };
  },
};
</script>
