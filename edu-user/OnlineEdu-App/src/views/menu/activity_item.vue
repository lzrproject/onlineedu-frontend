<template>
  <div class="app-container">
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
    <div class="activity-info">
      <el-row :gutter="50" :span="24" type="flex" justify="center">
        <el-col :span="10">
          <div class="zoom">
            <!-- <img-zoom :imgs="imgs || []" /> -->
            <Zoom :imgs="imgs || []" />
          </div>
        </el-col>
        <el-col :span="14">
          <div class="content">
            <el-descriptions
              class="margin-top"
              :column="1"
              :colon="false"
              :labelStyle="{
                'font-size': '20px',
                'font-family': '黑体',
                width: '130px',
              }"
              border
            >
              <template slot="title">
                <span class="title">{{ activityInfo.title }}</span>
              </template>
              <el-descriptions-item label="活动时间"
                >{{ activityInfo.startTime }} ~
                {{ activityInfo.endTime }}</el-descriptions-item
              >
              <el-descriptions-item label="活动地点">{{
                activityInfo.address
              }}</el-descriptions-item>
              <el-descriptions-item label="领队教师">{{
                activityInfo.activityTeacher
              }}</el-descriptions-item>
              <el-descriptions-item label="报名人数"
                >已报名
                {{ activityInfo.activityPeople }}
                /不限人数</el-descriptions-item
              >
            </el-descriptions>
            <div class="foot">
              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <el-button v-if="isExpired" type="success" round
                  @click="handleApply"
                    >报名</el-button
                  >
                  <el-button v-else type="warning" round>已结束</el-button>
                </el-col>
                <el-col :span="15" v-if="isExpired">
                  <span>剩余的时间为：{{ handleTime }} </span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="activity-desc">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="活动介绍" name="introduce">
          <div class="top">
            <i class="el-icon-coordinate"></i>
            <span style="margin-left: 5px;font-size: 15px;font-weight: bold;">具体规则</span>
          </div>
          <div class="rule-content">
            <div>参与范围：</div>
            <div>报名时间：{{ activityInfo.signTime }} ~ {{ activityInfo.signendTime }}</div>
          </div>
          <div class="top">
            <i class="el-icon-edit"></i>
            <span style="margin-left: 5px;font-size: 15px;font-weight: bold;">活动内容</span>
          </div>
          <div class="rule-content">
            <div>{{ activityInfo.content }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ImgZoom from "@/components/common/imgZoom";
import Zoom from "@/components/common/Zoom";

export default {
  components: {
    ImgZoom,
    Zoom,
  },
  data() {
    return {
      activityId: null,
      nowTime: new Date(),
      isExpired: true,
      activeName: "introduce",
      imgs: [
        "https://t13.baidu.com/it/u=738634288,2772506177&fm=224&app=112&size=w931&n=0&f=JPEG&fmt=auto?sec=1682787600&t=9a82b1df37bce3f8b2455b69191dac25",
        "https://t7.baidu.com/it/u=4193519903,2191151962&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=7816E4130F70538050C57C790300C060&sec=1682787600&t=18eb9536172f02db06a1fb9048db840b",
        "https://t7.baidu.com/it/u=1175258404,1169903320&fm=3031&app=3031&size=f242,150&n=0&f=JPEG&fmt=auto?s=E4517E9ECEB02C8018FDC1C7030030BB&sec=1682787600&t=9104436293ac686bec0413c1880ddaf6",
      ],
      activityInfo: {
        id: 1,
        title: "标题1",
        startTime: "2020-08-01",
        endTime: "2020-08-01",
        address: "啊啊啊啊啊啊啊啊啊啊啊啊",
        content: "为营造浓厚的校园文体活动氛围，引导广大青年学生积极参与文体活动，提高我院学生团结协作精神、增强组织解聚力，促进同学之间的友好相处，现决定开展拔河比赛",
        activityTeacher: "张三",
        activityPeople: 50,
        createTime: "2020-01-01",
        signTime: "2020-01-01",
        signendTime: "2023-05-29 00:01:00",
        img1: null,
        img2: null,
        img3: null,
      },
    };
  },
  //在挂载时启动定时器
  mounted() {
    let that = this;
    this.timer = setInterval(() => {
      that.nowTime = new Date();
    }, 1000);
  },
  created() {
    this.activityId = this.$route.params.id
    console.log(this.activityId)
  },
  computed: {
    handleTime() {
      if (!this.activityInfo.signendTime) {
        return;
      }
      const oneDay = 24 * 60 * 60 * 1000;
      let time = new Date(this.activityInfo.signendTime);
      let diffTime = time.getTime() - this.nowTime.getTime();
      if (diffTime <= 0) {
        this.isExpired = false;
        if (this.timer) {
          clearInterval(this.timer);
        }
        return;
      }
      let diff = new Date(parseInt(diffTime));
      let hour = diff.getHours() + 1;
      let minute = diff.getMinutes();
      let seconde = diff.getSeconds();
      return (
        Math.ceil(diff / oneDay) +
        "天" +
        hour +
        "时" +
        minute +
        "分" +
        seconde +
        "秒"
      );
    },
  },
  //实例销毁之前清除定时器
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleApply() {
      console.log("用户ID:",this.activityId,"报名成功")
      this.$message.success("报名成功");
    }
  },
};
</script>
<style lang="scss" scoped>
.activity-info {
  overflow: hidden;
  margin: 0 auto;
  width: 1100px;
  background-color: #fff;
  padding: 25px;
  .zoom {
    width: 400px;
    float: left;
  }
  .content {
    // width: 700px;
    font-family: "宋体";
    .title {
      font-size: 30px;
      font-weight: bold;
      padding-left: 10px;
    }
    .my-label {
      font-size: 20px;
    }
    .foot {
      margin-top: 50px;
    }
  }
}
.activity-desc {
  margin: 20px auto;
  width: 1100px;
  background-color: #fff;
  padding: 25px;
  .rule-content {
    margin: 20px auto;
    padding: 10px;
    width: 98%;
    border: 1px solid #b6b1b157;
    div {
      margin-top: 20px;
    }
  }
}
.activity-desc ::v-deep .el-tabs__item.is-active {
  color: #e6a23c;
}
.activity-desc ::v-deep .el-tabs__active-bar {
  background-color: #e6a23c;
}
.activity-desc ::v-deep .el-tabs__nav-wrap::after {
  background-color: #ffffff;
}
.margin-top ::v-deep .el-descriptions__body {
  background-color: transparent;
}
.margin-top ::v-deep .el-descriptions-item__label.is-bordered-label {
  background-color: transparent;
}
::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
  border: none;
}
</style>
