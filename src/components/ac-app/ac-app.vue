<template>
  <div :class="['ac-app', 'ac-layout', 'ac-layout--column', 'ac-typo-body']">
    <div class="ac-app__header ac-layout__flex-none">
      <slot name="header"></slot>
    </div>
    <div
      class="ac-layout__flex ac-layout__flex--with-hidden ac-layout"
      :class="['ac-layout--row']"
    >
      <div class="ac-app__nav ac-layout__flex-none">
        <slot name="nav"></slot>
      </div>
      <div class="ac-app__content ac-layout__flex">
        <slot></slot>
      </div>
    </div>
    <div class="ac-app__footer ac-layout__flex-none">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcApp'
}
</script>
