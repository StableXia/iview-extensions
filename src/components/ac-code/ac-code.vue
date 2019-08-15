<template>
  <div class="ac-code">
    <div class="ac-layout ac-code__actions">
      <ac-action>
        <ac-action-block>
          <ac-icon
            @click.native="clip"
            class="ac-code__action--clip"
            :type="copied ? 'success' : 'fuzhi'"
          ></ac-icon>
        </ac-action-block>
      </ac-action>
    </div>
    <pre class="ac-code__body"><code ref="code" :class="language"><slot></slot></code></pre>
  </div>
</template>

<script>
import hljs from 'highlightjs';
import Clipboard from 'clipboard';

export default {
  name: 'AcCode',
  data() {
    return {
      code: '',
      copied: false,
    };
  },
  props: {
    lang: {
      type: String,
      default: 'javascript',
    },
  },
  computed: {
    language() {
      if (this.lang === 'auto') {
        return '';
      }
      return this.lang;
    },
  },
  mounted() {
    this.code = this.$refs.code.innerHTML.replace(/\n/, '');
    this.$refs.code.innerHTML = this.code;
    hljs.highlightBlock(this.$refs.code);
  },
  methods: {
    clip() {
      const code = this.code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
      const clipboard = new Clipboard('.ac-code__action--clip', {
        text() {
          return code;
        },
      });

      clipboard.on('success', (e) => {
        e.clearSelection();
        clipboard.destroy();
        this.copied = true;
        this.$Message.success('代码已复制到剪贴板');
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
  },
};
</script>
