<template>
  <aside
    :class="['ac-nav', 'ac-layout', 'ac-layout--column',
      'ac-typo-' + fontSize,
      `ac-nav--${theme}`,
      {'ac-nav--collapsed': isCollapsed},
    ]"
    :style="{width: navWidth + 'px'}"
  >
    <div
      v-if="collapsible && !controlledCollapse"
      :class="['ac-nav__expand-trigger', 'ac-layout', 'ac-layout__flex-none', 'ac-layout--center-items', 'ac-layout--center-justify']"
      @click.stop="onClickCollapseIcon"
    >
      <ac-icon :type="isCollapsed ? 'right' : 'left'"></ac-icon>
    </div>

    <ac-scroll-view scrollbar-auto-hide :class="['ac-layout__flex']">
      <ul class="ac-nav__view">
        <slot></slot>
      </ul>
    </ac-scroll-view>
  </aside>
</template>

<script>
import { AcScrollView } from "../ac-scroll-view";

/**
 * Stateless navigation component.
 *
 * Which nav item is selected should be controlled by the parent,
 * and passed in via `selected` property.
 *
 * Each AcNavGroup and AcNavItem should be using unique `nav-id`
 * across the nav structure.
 */
export default {
  name: "AcNav",
  props: {
    width: {
      type: Number,
      default: 200
    },
    fontSize: {
      type: String,
      default: "sub-title"
    },
    /** could be light, dark, trans-dark */
    theme: {
      type: String,
      default: "light"
    },
    /** controlled selection value */
    selected: {
      type: String,
      required: true
    },
    accordion: {
      type: Boolean,
      default: false
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    /** only effective when collapsible === true */
    controlledCollapse: {
      type: Boolean,
      default: false
    },
    /** only effective when collapsible === true && controlledCollapse === true */
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      /** it has to be in the observable object `navParam` in order to make it reactive in children */
      navParam: this.navParam,
      claimLastExpandedGroup: this.claimLastExpandedGroup,
      claimSelectNavItem: this.claimSelectNavItem
    };
  },
  data() {
    return {
      navParam: {
        accordion: this.accordion,
        theme: this.theme,
        selectedHierarchy: [],
        lastExpandedGroup: null,
        internalCollapsed:
          this.collapsible && this.controlledCollapse && this.collapsed
      }
    };
  },
  computed: {
    isCollapsed() {
      if (!this.collapsible) {
        return false;
      }
      return this.controlledCollapse
        ? this.collapsed
        : this.navParam.internalCollapsed;
    },
    navWidth() {
      return this.isCollapsed ? 48 : this.width;
    }
  },
  methods: {
    buildSelectedHierarchy() {
      const that = this;
      const tempHierarchy = [];

      function recordSelected(nodeArray) {
        const arr = nodeArray || [];
        let foundSelected = false;

        arr.forEach(node => {
          if (!node.componentOptions || !node.componentOptions.propsData) {
            return;
          }
          if (
            node.componentOptions.tag !== "ac-nav-group" &&
            node.componentOptions.tag !== "ac-nav-item"
          ) {
            return;
          }

          if (
            node.componentOptions.propsData.navId === that.selected ||
            recordSelected(node.componentOptions.children)
          ) {
            foundSelected = true;
            tempHierarchy.unshift(node.componentOptions.propsData.navId);
          }
        });

        return foundSelected;
      }

      this.navParam.selectedHierarchy = tempHierarchy;

      if (!this.selected) {
        return;
      }

      recordSelected(this.$slots.default);
    },
    claimLastExpandedGroup(groupId) {
      this.navParam.lastExpandedGroup = groupId;
    },
    claimSelectNavItem(itemId) {
      this.$emit("select", itemId);
    },
    onClickCollapseIcon() {
      this.$emit(
        "collapsing",
        this.controlledCollapse
          ? !this.collapsed
          : !this.navParam.internalCollapsed
      );
      if (!this.controlledCollapse) {
        this.navParam.internalCollapsed = !this.navParam.internalCollapsed;
      }
    }
  },
  created() {
    this.buildSelectedHierarchy();
  },
  beforeUpdate() {
    if (!this.collapsible) {
      /** reset the internalCollapsed back to false if parent changed collapsible property */
      this.navParam.internalCollapsed = false;
    } else if (this.controlledCollapse) {
      this.navParam.internalCollapsed = this.collapsed;
    }
    this.buildSelectedHierarchy();
  },
  components: {
    AcScrollView
  }
};
</script>
