<template>
  <!-- <mavon-editor
    class="me-editor"
    style="padding: 20px"
    ref="md"
    v-model="editor.value"
    @imgAdd="imgAdd"
    v-bind="editor">
  </mavon-editor> -->
  <mavon-editor
    class="me-editor"
    style="padding: 20px"
    ref="md"
    v-model="editor.value"
    :ishljs="false"
    default-open="preview"
    :editable="false"
    :subfield="false" 
    :toolbarsFlag="false">
  </mavon-editor>
</template>


<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import "mavon-editor/dist/markdown/github-markdown.min.css";
  import hljs from "mavon-editor/dist/highlightjs/highlight.min.js";
  import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

  // import {upload} from '@/api/upload'

  export default {
    name: 'MarkdownEditor',
    props: {
      editor: Object
    },
    data() {
      return {}
    },
    mounted() {
      this.$set(this.editor, 'ref', this.$refs.md)
    },
    methods: {
      imgAdd(pos, $file) {
        let that = this
        let formdata = new FormData();
        formdata.append('image', $file);

        // upload(formdata).then(data => {
        //   // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        //   if (data.code == 0) {

        //     that.$refs.md.$img2Url(pos, data.data.url);
        //   } else {
        //     that.$message({message: data.msg, type: 'error', showClose: true})
        //   }

        // }).catch(err => {
        //   that.$message({message: err, type: 'error', showClose: true});
        // })
      }
    },
    components: {
      mavonEditor
    }
  }
</script>
<style>
  .me-editor {
    z-index: 6 !important;
  }

  .v-note-wrapper .fullscreen {
    top: 60px !important
  }

  pre {
  color: #e6e4e4;
  opacity: 1 !important;
  border: 1px solid #272822 !important;
  /* background-color: #272822 !important; */
  background-color: #52534F !important;
  border-radius: 15px !important;
}

.line-num-box {
  display: inline-block !important;
  color: #e6e4e4 !important;
  border-right: 2px solid #fff !important;
  line-height: 20px !important;
  font-size: 16px !important;
  text-align: right !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.code-box {
  display: inline-block !important;
  vertical-align: top !important;
  width: calc(100% - 50px) !important;
  border-left-style: none !important;
}

code {
  line-height: 20px !important;
  font-size: 16px !important;
  vertical-align: top;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 10px !important;
}

code::-webkit-scrollbar {
  height: 10px !important;
  border-radius: 5px !important;
  background-color: #1e1e1e !important;
}

code::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px !important;
  background-color: #666 !important;
}

code::-webkit-scrollbar-button {
  /*滚动条的轨道的两端按钮，允许通过点击微调小方块的位置*/
  border-radius: 5px !important;
  background-color: #1e1e1e !important;
}

.mac-icon {
  height: 30px !important;
  border-bottom: 1px solid silver !important;
  margin-bottom: 5px !important;
  color: deeppink !important;
}

.mac-icon > span {
  display: inline-block !important;
  letter-spacing: 5px !important;
  word-spacing: 5px !important;
  width: 16px !important;
  height: 16px !important;
  border-radius: 8px !important;
}

.mac-icon-red {
  background-color: red !important;
}

.mac-icon-yellow {
  margin-left: 10px;
  background-color: yellow !important;
}

.mac-icon-green {
  margin-left: 10px;
  background-color: green !important;
}

.mac-icon-lang {
  width: 50px !important;
  padding-left: 10px !important;
  font-size: 16px !important;
  vertical-align: top !important;
}

.copy-button {
  padding: 2px 8px !important;
  color: #ffffff !important;
  background-color: #9999aa !important;
  margin-bottom: 5px !important;
  border-radius: 5px !important;
  outline: none !important;
  border: none !important;
}

.copy-button {
  float: right !important;
}

.copy-button:hover {
  cursor: pointer !important;
  background-color: black !important;
}

.markdown-body .lang- {
  display: block;
  overflow: auto;
  font-size: 16px !important;
  background: #272822 !important;
  color: #fff;
}

.markdown-body .hljs {
  display: block;
  overflow: auto;
  font-size: 16px !important;
  background: #272822 !important;
  color: #fff;
}

.hljs,
.hljs-tag,
.hljs-subst {
  color: #f8f8f2 !important;
}

.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2 !important;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-link {
  color: #ae81ff !important;
}

.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
  color: #a6e22e !important;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-name,
.hljs-attr {
  color: #f92672 !important;
}

.hljs-symbol,
.hljs-attribute {
  color: #66d9ef !important;
}

.hljs-params,
.hljs-class .hljs-title {
  color: #f8f8f2 !important;
}

.hljs-string,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
  color: #e6db74 !important;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #75715e !important;
}
</style>
