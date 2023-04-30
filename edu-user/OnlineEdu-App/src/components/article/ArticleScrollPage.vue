<template>
  <ScrollPage :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <ArticleItem v-for="(a,index) in articles" :key="index" v-bind="a" />
  </ScrollPage>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/article/scrollpage'
  import { listArticle } from '@/api/article';

  export default {
    name: "ArticleScrollPage",
    props: {
      offset: {
        type: Number,
        default: 100
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      ArticleItem,
      ScrollPage
    },
    data() {
      return {
        loading: false,
        noData: false,
        innerPage: {
          pageSize: 5,
          pageNumber: 1,
          name: 'a.createDate',
          sort: 'desc'
        },
        articles: []
      }
    },
    watch: {
      'query': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage.pageNumber = 1
          this.getArticles()
        },
        deep: true
      },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage = this.page
          this.getArticles()
        },
        deep: true
      }
    },
    created() {
      this.getArticles()
    },
    methods: {
      load() {
        this.getArticles()
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      getArticles() {
        // this.articles = [
        //   {
        //     id: 1,
        //     weight: 2,
        //     title: "标题1",
        //     commentCounts: 3,
        //     viewCounts: 4,
        //     summary: "AAA",
        //     author: {
        //       nickname: "张三",
        //     },
        //     tags: [],
        //     createDate: "2023-04-04"
        //   },
        //   {
        //     id: 1,
        //     weight: 2,
        //     title: "标题1",
        //     commentCounts: 3,
        //     viewCounts: 4,
        //     summary: "AAA",
        //     author: {
        //       nickname: "张三",
        //     },
        //     tags: [],
        //     createDate: "2023-04-04"
        //   }
        // ]

        this.loading = true
        listArticle(this.query).then(data => {

          let newArticles = data.data
          this.articles = newArticles
          // if (newArticles && newArticles.length > 0) {
          //   that.innerPage.pageNumber += 1
          //   that.articles = this.articles.concat(newArticles)
          // } else {
          //   that.noData = true
          // }

        }).catch(error => {
          if (error !== 'error') {
            this.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          this.loading = false
        })

      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;

  }
</style>
