<template>
<div :class="['ac-scroll-view', 'ac-layout', 'ac-layout--column']">
  <div :class="['ac-layout__flex', 'ac-layout']">
    <div :class="['ac-scroll-view__view', 'ac-layout__flex']" :style="viewStyle">
      <div :class="['ac-scroll-view__view__cont']" ref="viewCont">
        <div class="ac-layout">
          <div class="ac-layout__flex">
            <div ref="slotWrapper"><slot></slot></div>
          </div>
          <div ref="contentHeightSensor"></div>
        </div>
      </div>
    </div>
    <div :class="['ac-scroll-view__vscroll', 'ac-layout__flex-none']">
      <div :class="['ac-scroll-view__vscroll__cont']">
        <ac-scroll-view-scrollbar
          v-show="showVScrollbar"
          ref="vScroll"
          for-vertical
          :theme="scrollbarTheme"
          :client-size="clientHeight"
          :scroll-size="scrollHeight"
          :z-index="scrollbarZIndex"
        />
      </div>
    </div>
    <div ref="viewContHeightSensor"></div>
  </div>
  <div :class="['ac-scroll-view__hscroll', 'ac-layout__flex-none']">
    <div :class="['ac-scroll-view__hscroll__cont']">
      <ac-scroll-view-scrollbar
        v-show="showHScrollbar"
        ref="hScroll"
        :theme="scrollbarTheme"
        :client-size="clientWidth"
        :scroll-size="scrollWidth"
        :z-index="scrollbarZIndex"
      />
    </div>
  </div>
  <div ref="viewContWidthSensor"></div>
</div>
</template>

<script>
import { globalAssistService } from '$src/utils';
import AcScrollViewScrollbar from './ac-scroll-view-scrollbar';

/**
 * @event content-dom-updated
 */
export default {
  name: 'AcScrollView',
  props: {
    /** Indicate if this modal is shown by parent (e.g. modal) on page or not, instead of showing or hiding the modal */
    visible: {
      type: Boolean,
      default: true,
    },
    nativeScrollbar: {
      type: Boolean,
      default: false,
    },
    scrollbarTheme: {
      type: String,
      default: 'dark',
    },
    scrollbarAutoHide: {
      type: Boolean,
      default: false,
    },
    scrollbarZIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollTop: 0,
      scrollLeft: 0,
      hideScrollbar: false,
      lockScrollbar: false,
      contentObserver: null,
    };
  },
  computed: {
    viewStyle() {
      return {
        marginRight: `${-1 * globalAssistService.dom.getScrollBarSize()}px`,
        marginBottom: `${-1 * globalAssistService.dom.getScrollBarSize()}px`,
      };
    },
    showVScrollbar() {
      return (this.scrollHeight > this.clientHeight) && (!this.effectiveHideScrollbar);
    },
    showHScrollbar() {
      return (this.scrollWidth > this.clientWidth) && (!this.effectiveHideScrollbar);
    },
    effectiveHideScrollbar() {
      return (!this.lockScrollbar && this.hideScrollbar);
    },
  },
  watch: {
    visible(val) {
      if (val === true) {
        this.updateSizes();
      }
    },
  },
  methods: {
    /** @public */
    reinit() {
      this.updateSizes();
    },
    /** @public */
    syncSizes() {
      const viewContEl = this.$refs.viewCont;
      if (!viewContEl) { return; }
      this.clientWidth = viewContEl.clientWidth;
      this.clientHeight = viewContEl.clientHeight;
      this.scrollWidth = viewContEl.scrollWidth;
      this.scrollHeight = viewContEl.scrollHeight;
      this.scrollTop = viewContEl.scrollTop;
      this.scrollLeft = viewContEl.scrollLeft;
    },
    updateSizes() {
      if (!this.$refs.viewCont) { return; }
      this.syncSizes();
      this.updateScrollbarPercentage();

      /** whenever we want to update the sizes, the scrollbars have to be shown so that they can
       * pick up these updated values to update the sizes of themselves.
       */
      if (this.scrollbarAutoHide && this.hideScrollbar) {
        this.hideScrollbar = false;
        this.$nextTick(() => {
          this.hideScrollbar = true;
        });
      }
    },
    updateScrollbarPercentage() {
      if (!this.$refs.vScroll && !this.$refs.hScroll) { return; }
      const { scrollTop, scrollLeft } = this.$refs.viewCont;

      if (this.$refs.vScroll && this.showVScrollbar) {
        this.$refs.vScroll.updatePosition(scrollTop / (this.scrollHeight - this.clientHeight));
      }
      if (this.$refs.hScroll && this.showHScrollbar) {
        this.$refs.hScroll.updatePosition(scrollLeft / (this.scrollWidth - this.clientWidth));
      }
    },
    updatePercentagePosition(percentagePos, forVertical) {
      if (!this.$refs.viewCont) { return; }
      const viewContEl = this.$refs.viewCont;
      if (forVertical) {
        viewContEl.scrollTop = percentagePos * (viewContEl.scrollHeight - viewContEl.clientHeight);
      } else {
        viewContEl.scrollLeft = percentagePos * (viewContEl.scrollWidth - viewContEl.clientWidth);
      }
    },
    /** @public imperatively set top/left */
    updatePosition(pos, forVertical) {
      if (!this.$refs.viewCont) { return; }
      const viewContEl = this.$refs.viewCont;
      if (forVertical) {
        viewContEl.scrollTop = pos;
        this.scrollTop = viewContEl.scrollTop;
      } else {
        viewContEl.scrollLeft = pos;
        this.scrollLeft = viewContEl.scrollLeft;
      }
    },
    onViewScroll(event) {
      this.syncSizes();
      this.updateScrollbarPercentage();
      this.$emit('scroll', event);
    },
    onMouseEnterView() {
      this.hideScrollbar = false;
    },
    onMouseLeaveView() {
      this.hideScrollbar = this.scrollbarAutoHide;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateSizes();
      this.$refs.viewCont.addEventListener('scroll', this.onViewScroll);
      globalAssistService.dom.onResize.on(this.$refs.contentHeightSensor, this.updateSizes);
      globalAssistService.dom.onResize.on(this.$refs.viewContWidthSensor, this.updateSizes);
      globalAssistService.dom.onResize.on(this.$refs.viewContHeightSensor, this.updateSizes);
      /** Since it is hard to make a generic sensor for content width, we are using MutationObserver
       * as an alternative way to monitor the size change of contained content.
       */
      this.contentObserver = globalAssistService.dom.setupMutationObserver(this.$refs.slotWrapper, null, () => {
        this.updateSizes();
        this.$emit('content-dom-updated');
      });

      if (this.scrollbarAutoHide) {
        this.$nextTick(() => {
          this.hideScrollbar = true;
          this.$el.addEventListener('mouseenter', this.onMouseEnterView);
          this.$el.addEventListener('mouseleave', this.onMouseLeaveView);
        });
      }
    });
  },
  beforeDestroy() {
    if (this.$refs.viewCont) {
      this.$refs.viewCont.removeEventListener('scroll', this.onViewScroll);
      this.$el.removeEventListener('mouseenter', this.onMouseEnterView);
      this.$el.removeEventListener('mouseleave', this.onMouseLeaveView);
      globalAssistService.dom.onResize.off(this.$refs.contentHeightSensor, this.updateSizes);
      globalAssistService.dom.onResize.off(this.$refs.viewContWidthSensor, this.updateSizes);
      globalAssistService.dom.onResize.off(this.$refs.viewContHeightSensor, this.updateSizes);
      if (this.contentObserver) {
        this.contentObserver.disconnect();
      }
    }
  },
  components: {
    AcScrollViewScrollbar,
  },
};
</script>
