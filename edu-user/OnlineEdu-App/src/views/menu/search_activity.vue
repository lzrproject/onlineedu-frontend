<template>
  <div class="app-container" >
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin: 30px 0; color: #333"
        >
          <el-breadcrumb-item>全部课程</el-breadcrumb-item>
          <el-breadcrumb-item> 活动浏览 </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance = "10">
      <el-row :gutter="20" class="activity" :span="24" >
        <el-col v-for="(activity,index) of activityList" :key="index" :span="6">
          <router-link :to="'/activity/item/'+activity.id">
            <div class="activity-item">
              <el-image v-if="index%2 === 0" fit="cover" src="https://t13.baidu.com/it/u=738634288,2772506177&fm=224&app=112&size=w931&n=0&f=JPEG&fmt=auto?sec=1682787600&t=9a82b1df37bce3f8b2455b69191dac25" class="img" />
              <el-image v-else fit="cover" src="https://www.baidu.com/link?url=nDdWU2BjfK6eHqfd-Rhnr-DWjVt78O0AgbVeggexNHDlhARGn2RM-tVnCNtiKqQTxx4Ato4cUmFC3uln62uFs6t4PmDcxf_JNNE_tpd74Em&wd=&eqid=d1a6528100014ee700000006644b4439" class="img" />
              <div class="info">
                <div class="title ellipse" :title="activity.title">
                  {{ activity.title }}
                </div>
                <div class="middle">
                  <span class="activity-num">报名时间：</span>      
                  <span class="tch" v-if="activity.signTime">{{ activity.signTime }}-{{ activity.signEndTime }}</span>
                  <span class="tch" v-else>无</span>
                </div>
                <div class="bottom">
                  <span class="tc">领队教师：{{ activity.activityTeacher }}</span>
                  <!-- <span class="free">{{
                    activity.price === 0 ? "免费" : `￥${activity.price}`
                  }}</span> -->
                  <span class="sub-num">共 
                    <span style="font-size:18px">{{ activity.activityPeople }}</span> 
                  人参与
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </el-col>
      </el-row>
      <span v-if="noMore" style="display:table;margin:10px auto;font-size:18px;color:#ccc">没有更多了</span>
    </div>
  </div>
</template>
<script>

export default {
  name: "SearchByActivity",
  data() {
    return {
      loading: true,
      count: 0,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      activityList: [],
    };
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.count >= this.total - 1;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.count = 0;
    this.getList();
  },
  methods: {
    getList() {
      var res = [
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 100,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 100,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 100,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
        {
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        },
      ]
      setTimeout(() => {
        this.total = 5;
        this.activityList = res;
        this.loading = false;
      }, 1000);
    },
    load () {
      this.count += 1;
      this.activityList.push({
          id: 1,
          title: "标题1",
          lessonNum: 1,
          teacherName: 2,
          price: 20.0,
          buyCount: 666,
          activityTeacher: "张三",
          activityPeople: 0,
          signTime: '2020-08-01',
          signEndTime: '2020-08-02',
        })
    }
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 60vh;
    overflow-y: auto;
  padding: 0 8%;
}
.activity-item {
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 260px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 18px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s;
  }

  .img {
    height: 140px;
    width: 100%;
    border-radius: 5px;
  }

  .info {
    padding: 5px 10px 12px 10px;
    color: #333;

    .title {
      font-size: 14px;
    }

    .middle {
      color: #999;
      font-size: 12px;
      margin: 3px 0;
    }

    .bottom {
      .tc {
        color: #999;
        font-size: 12px;
      }
      .free {
        font-size: 14px;
        color: #f4621f;
      }

      .sub-num {
        font-size: 12px;
        color: #999;
        margin-left: 16px;
      }
    }
  }
}
</style>
