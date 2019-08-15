<template>
  <li :class="['ac-nav-group', {'ac-nav-group--selected': isSelected}, `ac-nav-group--${navParam.theme}`]">
    <ul :class="['ac-nav-group__title']">
      <ac-nav-item
        :nav-id="navId + '_group_title'"
        :as-group-title="true"
        :active="isSelected && !isExpanded"
        @select="onClickTitle"
        @mouseenter.native="hoverTitle = true"
        @mouseleave.native="hoverTitle = false"
        :offset-level="offsetLevel"
        :tooltip="tooltip"
      >
        <template slot="icon">
          <slot name="title-icon" v-if="!showArrowIcon"></slot>
          <ac-icon v-else :type="isExpanded ? 'arrow-down-b' : 'arrow-right-b'"></ac-icon>
        </template>
        <slot name="title-content"></slot>
        <ac-icon slot="action" :type="isExpanded ? 'up' : 'down'" size="small"></ac-icon>
      </ac-nav-item>
    </ul>
    <ul :class="['ac-nav-group__items', {'ac-nav-group__items--expanded': isExpanded}, 'ac-nav-group__items--nested-level-' + offsetLevel]">
      <slot>no items</slot>
    </ul>
  </li>
</template>

<script>
import AcNavItem from './ac-nav-item';

export default {
  name: 'AcNavGroup',
  props: {
    navId: {
      type: String,
      required: true,
    },
    offsetLevel: {
      type: Number,
      default: 0,
    },
    tooltip: {
      type: String,
    },
  },
  inject: [
    'navParam',
    'claimLastExpandedGroup',
  ],
  data() {
    return {
      expanded: false,
      hoverTitle: false,
    };
  },
  computed: {
    isSelected() {
      return this.navParam.selectedHierarchy.findIndex(e => (e === this.navId)) >= 0;
    },
    isExpanded() {
      return this.navParam.accordion ? (this.navId === this.navParam.lastExpandedGroup) : this.expanded;
    },
    isDark() {
      return this.navParam.dark;
    },
    showArrowIcon() {
      return (this.navParam.internalCollapsed && !this.hoverTitle);
    },
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.claimLastExpandedGroup(this.navId);
      }
    },
    onClickTitle() {
      this.toggle();
    },
  },
  components: {
    AcNavItem,
  },
};
</script>
