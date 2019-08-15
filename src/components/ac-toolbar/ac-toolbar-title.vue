<template>
	<ac-toolbar-block :class="['ac-toolbar__title', {'ac-toolbar__title--for-app': isForApp}]" :width="width">
		<slot></slot>
	</ac-toolbar-block>
</template>

<script>
import AcToolbarBlock from './ac-toolbar-block';

export default {
  name: 'AcToolbarTitle',
  props: {
    width: {
      type: Number,
      default: 200,
    },
  },
  inject: ['toolbarParam'],
  computed: {
    isForApp() {
      return this.toolbarParam.forApp;
    },
  },
  components: {
    AcToolbarBlock,
  },
};
</script>
