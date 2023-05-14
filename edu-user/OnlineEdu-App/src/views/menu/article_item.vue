<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin: 30px 0; color: #333"
        >
          <el-breadcrumb-item :to="'/'">全部课程</el-breadcrumb-item>
          <el-breadcrumb-item :to="'/article'"> 博客浏览 </el-breadcrumb-item>
          <el-breadcrumb-item> 查看文章 </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="me-view-body">
      <el-container class="me-view-container">
        <el-main>
          <div class="me-view-card">
            <h1 class="me-view-title">{{ article.title }}</h1>
            <div class="me-view-author">
              <a class="">
                <img class="me-view-picture" />
              </a>
              <div class="me-view-info">
                <span>{{ article.author.nickname }}</span>
                <div class="me-view-meta">
                  <span>{{ article.createDate }}</span>
                  <span>阅读 {{ article.viewCounts }}</span>
                  <span>评论 {{ article.commentCounts }}</span>
                </div>
              </div>
              <!-- <el-button
              v-if="this.article.author.id == this.$store.state.id"
              @click="editArticle()"
              style="position: absolute;left: 60%;"
              size="mini"
              round
              icon="el-icon-edit">编辑</el-button> -->
            </div>
            <div class="me-view-content">
              <MarkdownEditor :editor="article.editor"></MarkdownEditor>
            </div>
            <div class="me-view-end">
              <el-alert
                title="文章End..."
                type="success"
                center
                :closable="false"
              >
              </el-alert>
            </div>
            <div class="me-view-comment">
              <div class="me-view-comment-write">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <a class="">
                      <img class="me-view-picture" />
                    </a>
                  </el-col>
                  <el-col :span="22">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2 }"
                      placeholder="你的评论..."
                      class="me-view-comment-text"
                      v-model="comment.content"
                      resize="none"
                    >
                    </el-input>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="2" :offset="22">
                    <el-button type="text" @click="publishComment()"
                      >评论</el-button
                    >
                  </el-col>
                </el-row>
              </div>
              <div class="me-view-comment-title">
                <span>{{ article.commentCounts }} 条评论</span>
              </div>
              <CommmentItem
                v-for="(c, index) in comments"
                :comment="c"
                :articleId="articleId"
                :index="index"
                :rootCommentCounts="comments.length"
                @commentCountsIncrement="commentCountsIncrement"
                :key="c.id"
              />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import MarkdownEditor from "@/views/menu/MarkdownEditor";
import { getArticle, getCommentByBid, addComment } from "@/api/article";
import CommmentItem from '@/components/article/CommentItem'
import default_avatar from "@/assets/img/default_avatar.png";

export default {
  name: "BlogView",
  components: {
    MarkdownEditor,
    CommmentItem
  },
  data() {
    return {
      article: {
        title: "",
        commentCounts: 188,
        viewCounts: 66,
        summary: "",
        author: {},
        tags: [],
        category: {},
        createDate: "",
        editor: {
          value: "**粗体**",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview",
        },
      },
      articleId: "",
      comments: [],
      comment: {
        content: "",
      },
    };
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar;
      if (avatar.length > 0) {
        return avatar;
      }
      return default_avatar;
    },
    title() {
      return `${this.article.title} - 文章 - For Fun`;
    },
  },
  mounted() {
    this.articleId = parseInt(this.$route.params.id);
    this.getArticle();
  },
  watch: {
    $route: "getArticle",
  },
  methods: {
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    },
    getArticle() {
      getArticle(this.articleId)
        .then((data) => {
          Object.assign(this.article, data.data);
          this.article.editor.value = data.data.content;
        })
        .catch((error) => {
          if (error !== "error") {
            this.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true,
            });
          }
        });
        this.getCommentsByArticle()
    },
    publishComment() {
      if (!this.comment.content) {
        return;
      }
      this.comment.articleId = this.articleId;

      addComment(this.comment).then(data => {
        this.$message({type: 'success', message: '评论成功', showClose: true})
        this.comments.unshift(data.data)
        this.commentCountsIncrement()
        this.comment.content = ''
        // this.getCommentsByArticle()
      }).catch(error => {
        if (error !== 'error') {
          this.$message({type: 'error', message: '评论失败', showClose: true})
        }
      })
    },
    getCommentsByArticle() {
      getCommentByBid(this.articleId).then(data => {
        this.comments = data.data
        this.article.commentCounts = data.data.length
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '评论加载失败', showClose: true})
        }
      })
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    },
  },
  //组件内的守卫 调整body的背景色
  // beforeRouteEnter(to, from, next) {
  //   window.document.body.style.backgroundColor = "#fff";
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   window.document.body.style.backgroundColor = "#f5f5f5";
  //   next();
  // },
};
</script>
<style lang="scss" scoped>
.me-view-body {
  margin: 0 auto;
}

.me-view-container {
  width: 1000px;
  margin: 0 auto;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-content {
  margin-top: 20px;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

// .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
// .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
//   background: #fff !important;
// }
</style>
