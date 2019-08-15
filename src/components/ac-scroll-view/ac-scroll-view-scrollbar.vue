<template>
<div :class="[`${cssPrefix}`,
  {
    [`${cssPrefix}--vertical`]: forVertical,
    [`${cssPrefix}--horizontal`]: !forVertical,
  }]"
  :style="{zIndex: zIndex}"
>
  <div :class="[`${cssPrefix}__track`, `${cssPrefix}__track--${theme}`]">
    <div :class="[`${cssPrefix}__track__thumb`]" :style="thumbStyle" @mousedown="onDragThumb"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AcScrollViewScrollbar',
  props: {
    forVertical: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    clientSize: {
      type: Number,
      required: true,
    },
    scrollSize: {
      type: Number,
      required: true,
    },
    zIndex: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      cssPrefix: 'ac-scroll-view-scrollbar',
      readyToShow: false,
      percentagePos: 0,
    };
  },
  computed: {
    thumbMetrics() {
      if (!this.readyToShow || !this.scrollSize) { return null; }
      const selfSize = this.forVertical ? this.$el.offsetHeight : this.$el.offsetWidth;
      const thumbSize = Math.floor((selfSize * this.clientSize) / this.scrollSize);
      return {
        trackSize: selfSize,
        size: thumbSize,
        pos: (selfSize - thumbSize) * this.percentagePos,
      };
    },
    thumbStyle() {
      if (!this.thumbMetrics) { return null; }
      return {
        [this.forVertical ? 'height' : 'width']: `${this.thumbMetrics.size}px`,
        [this.forVertical ? 'top' : 'left']: `${this.thumbMetrics.pos}px`,
      };
    },
  },
  methods: {
    updatePosition(percentagePos) {
      this.percentagePos = percentagePos;
    },
    onDragThumb(event) {
      event.preventDefault();

      const startPoint = this.forVertical ? event.clientY : event.clientX;
      const startPos = this.thumbMetrics.pos;
      const self = this;

      this.$parent.lockScrollbar = true;

      function onMouseMove(e) {
        e.preventDefault();
        const curPoint = self.forVertical ? e.clientY : e.clientX;
        let curPercentage = (startPos + (curPoint - startPoint)) / (self.thumbMetrics.trackSize - self.thumbMetrics.size);
        curPercentage = Math.max(Math.min(curPercentage, 1), 0);
        self.percentagePos = curPercentage;
        self.$parent.updatePercentagePosition(curPercentage, self.forVertical);
      }

      function onMouseUp(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        self.$parent.lockScrollbar = false;
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  },
  mounted() {
    this.readyToShow = true;
  },
};
</script>

