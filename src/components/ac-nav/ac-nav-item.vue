<template>
	<li
    :class="['ac-nav-item', 'ac-layout', {'ac-nav-item--selected': isSelected}, `ac-nav-item--${navParam.theme}`]"
    @click="onClick"
  >
    <ac-tooltip :class="['ac-layout__flex']" :content="tooltip" placement="right" :disabled="!isCollapsed || !tooltip">
      <div
        :class="['ac-nav-item__inner', {'ac-nav-item__inner--collapsed': isCollapsed},
          'ac-layout', 'ac-layout--center-items', 'ac-layout__flex', {'ac-layout--center-justify': isCollapsed}]"
        :style="[offsetLevelStyle]"
      >
        <div
          :class="['ac-nav-item__icon', 'ac-layout', 'ac-layout--center-items', {'ac-layout--center-justify': isCollapsed},
            'ac-layout__flex-none']"
        >
          <slot name="icon"></slot>
        </div>
        <div
          :class="['ac-nav-item__content', 'ac-layout', 'ac-layout--center-items', 'ac-layout__flex']"
          v-if="!isCollapsed"
        >
          <slot></slot>
        </div>
        <div
          :class="['ac-nav-item__action', 'ac-layout', 'ac-layout--center-items', 'ac-layout__flex-none']"
          v-if="!isCollapsed"
        >
          <slot name="action"></slot>
        </div>
      </div>
    </ac-tooltip>
	</li>
</template>

<script>
import { AcTooltip } from '../ac-tooltip';

export default {
  name: 'AcNavItem',
  components: {
    AcTooltip,
  },
  props: {
    navId: {
      type: String,
      required: true,
    },
    asGroupTitle: {
      type: Boolean,
      default: false,
    },
    /** take effective only when asGroupTitle is true */
    active: {
      type: Boolean,
      default: false,
    },
    offsetLevel: {
      type: Number,
      default: 0,
    },
    tooltip: {
      type: String,
    },
  },
  inject: ['navParam', 'claimSelectNavItem'],
  computed: {
    isSelected() {
      if (this.asGroupTitle) {
        return this.active;
      }
      return this.navParam.selectedHierarchy.findIndex(e => e === this.navId) >= 0;
    },
    isCollapsed() {
      return this.navParam.internalCollapsed;
    },
    offsetLevelStyle() {
      const style = {};
      if (this.offsetLevel > 0) {
        let useLevel = this.offsetLevel;
        if (!this.$slots.icon || this.$slots.icon.length <= 0) {
          useLevel -= 1;
        }
        if (!this.navParam.internalCollapsed) {
          style.paddingLeft = `${16 + (8 * useLevel)}px`;
        }
      }
      return style;
    },
  },
  methods: {
    onClick() {
      this.$emit('select');
      if (!this.asGroupTitle) {
        this.claimSelectNavItem(this.navId);
      }
    },
  },
};
</script>
