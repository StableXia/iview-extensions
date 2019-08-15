<template>
  <div :class="['ac-demo', 'ac-layout', { 'ac-layout--column': vertical }]" :id="title">
    <div ref="case" :class="['ac-demo__case', { 'ac-layout__flex': !vertical }]">
      <div :class="['ac-demo__case__top']">
          <slot name="demo"></slot>
      </div>

      <div :class="['ac-demo__case__middle', 'ac-layout', 'ac-layout--center-items']">
        <span class="ac-demo__case__middle__split ac-demo__case__middle__split--fix-width"></span>
        <span class="ac-demo__case__middle__title ac-typo-title">{{ title }}<a :href="`#${title}`">#</a></span>
        <span class="ac-demo__case__middle__split ac-layout__flex "></span>
      </div>

      <div :class="['ac-demo__case__bottom']">
          <slot name="desc"></slot>
      </div>
    </div>

    <div :class="['ac-demo__split']" :style="{[vertical ? 'height' : 'width']: '1px'}"></div>

    <div ref="code" :class="['ac-demo__code', { 'ac-layout__flex': !vertical }]" :style="codeWrapStyle">
      <div :style="codeStyle" :class="['ac-demo__code__content']">
        <slot name="code"></slot>
      </div>

      <div :class="['ac-demo__code__actions', 'ac-layout', 'ac-layout--center-justify']" v-if="showMore">
        <ac-action>
          <ac-action-block  @click.native="showCode = !showCode">
            <ac-icon-tip
              :type="showCode ? 'up' : 'down'"
              :tip="hideCode && !showCode ? '显示代码' : ''"
            ></ac-icon-tip>
          </ac-action-block>
        </ac-action>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AcDemo',
  data() {
    return {
      showCode: false,
      showMore: true,
      demoHeight: 0,
      codeHeight: 0,
      ready: false,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    hideCode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    codeWrapStyle() {
      const style = {};

      if (this.ready) {
        if (this.showCode) {
          style.height = `${this.codeHeight}px`;
        } else {
          style.height = `${this.demoHeight}px`;
        }
      }

      return style;
    },
    codeStyle() {
      const style = {
        opacity: 1,
      };
      if (this.hideCode && !this.showCode) {
        style.opacity = 0;
      }
      return style;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const demoHeight = this.$refs.case.offsetHeight;
      const codeHeight = this.$refs.code.scrollHeight;

      this.codeHeight = codeHeight;

      if (codeHeight <= demoHeight && !this.hideCode) {
        this.showMore = false;
      }

      this.demoHeight = this.hideCode ? 30 : demoHeight;
      this.ready = true;
    });
  },
};
</script>
