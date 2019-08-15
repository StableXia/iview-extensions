<template>
  <div :class="['ac-toolbar__block', 'ac-layout', 'ac-layout--center-items', 'ac-layout__flex-none']"
    :style="{width: width ? (width + 'px') : 'auto'}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AcToolbarBlock',
  props: {
    width: Number,
  },
};
</script>
