<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }" @click.native="view" >
    <div class="me-article-header">
      <a class="me-article-title">{{title}}</a>
      <!-- <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button> -->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-chat-dot-round"></i>&nbsp;{{commentCounts}}
	    </span>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{viewCounts}}
	    </span>
    </div>

    <div class="me-artile-description">
      {{ articleDesc }}
    </div>
    <div class="me-article-footer">
	  	<span class="me-article-author">
	    	<i class="el-icon-user"></i>&nbsp;{{userName}}
	    </span>

      <!-- <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{t.tagname}}</el-tag> -->

      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createTime}}
	    </span>

    </div>
  </el-card>
</template>

<script>
  import MarkdownEditor from '@/views/menu/MarkdownEditor'

  export default {
    name: 'ArticleItem',
    // props: {
    //   id: Number,
    //   weight: Number,
    //   title: String,
    //   commentCounts: Number,
    //   viewCounts: Number,
    //   summary: String,
    //   author: Object,
    //   tags: Array,
    //   createDate: String
    // },
    props: {
      id: Number,
      title: String,
      commentCounts: {
        type: Number,
        default: 66
      },
      viewCounts: {
        type: Number,
        default: 188
      },
      content: String,
      articleDesc: String,
      userName: String,
      createTime: String
    },
    components: {
      MarkdownEditor
    },
    data() {
      return {}
    },
    methods: {
      view() {
        this.$router.push("/article/item/"+this.id)
      },
      handleContent(content) {
        let param = {
          value: content,
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: 'preview'
        }
        return param
      }
    }
  }
</script>

<style lang="scss" scoped>
.me-area {
  cursor: pointer;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(23, 70, 161, 0.11);
  transition: box-shadow 0.25s ease, transform 0.25s ease,
    -webkit-transform 0.25s ease;
  &:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0.3rem 0.5rem 0.5rem rgba(22, 28, 45, 0.1),
    0.3rem 0.3rem 0.5rem -0.5rem rgba(22, 28, 45, 0.05) !important;
  }
}
  .me-article-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-article-title {
    font-weight: 600;
  }

  .me-article-icon {
    padding: 3px 8px;
  }

  .me-article-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-artile-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .me-article-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .el-tag {
    margin-left: 6px;
  }

</style>
