<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin: 30px 0; color: #333"
        >
          <el-breadcrumb-item :to="'/'">全部课程</el-breadcrumb-item>
          <el-breadcrumb-item> 博客浏览 </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="article-list">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-aside class="me-area">
            <ul class="me-month-list">
              <li
                v-for="(a,index) in archives"
                :key="index"
                class="me-month-item"
              >
                <el-badge :value="a.count">
                  <el-button
                    @click="changeArchive(a.dateStr)"
                    size="small"
                    >{{ a.dateStr }}
                  </el-button>
                </el-badge>
              </li>
            </ul>
          </el-aside>
        </el-col>
        <el-col :span="15">
          <el-main class="me-articles">
            <div class="me-month-title">{{ currentArchive }}</div>

            <ArticleScrollPage v-bind="article"></ArticleScrollPage>
          </el-main>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ArticleScrollPage from "@/components/article/ArticleScrollPage";
import { listDate } from '@/api/article';

export default {
  name: "SearchByActicle",
  components: {
    ArticleScrollPage,
  },
  data() {
    return {
      currentArchive: "全部",
      article: {
        query: {
          dateStr: null,
        },
      },
      archives: [],
    };
  },
  created() {
    this.getDateList()
  },
  methods: {
    getDateList() {
      listDate().then(response => {
        this.archives = response.data
      })
    },
    changeArchive(date) {
      this.currentArchive = date
      this.article.query.dateStr = date
      // listDate(date).then(response => {
      //   this.archives = response.data
      // })
    }
  },
};
</script>
<style lang="scss" scoped>
.article-list {
  width: 1100px;
  margin: 0 auto;
}
.me-month-list {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  list-style-type: none;
}

.me-month-item {
  margin-top: 18px;
  padding: 4px;
  font-size: 18px;
  color: #5fb878;
}

.me-month-title {
  margin-left: 4px;
  margin-bottom: 12px;
  padding: 10px;
}

::v-deep .el-container {
  width: 640px;
}

::v-deep .el-main {
  padding: 0px;
  line-height: 16px;
}

::v-deep .me-order-list {
  float: right;
}


</style>
