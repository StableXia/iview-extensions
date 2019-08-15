<template>
  <button
    :disabled="disabled"
    :class="[
      'ac-action__block',
      'ac-layout-col',
      { 'ac-action__block--highlight': highlighting }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AcActionBlock',
  props: {
    highlighting: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
