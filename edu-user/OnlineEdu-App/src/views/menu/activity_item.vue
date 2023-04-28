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
    <div class="activity-info" >
      <el-row :span="24" type="flex" justify="center">
        <el-col :span="10">
          <div class="zoom">
            <img-zoom :imgs="imgs || []" />
          </div>
        </el-col>
        <el-col :span="14">
          <div class="content">
            <div class="title-name">
              <h4>{{acitivityInfo.title}}</h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ImgZoom from '@/components/common/imgZoom';

export default {
  components: {
    ImgZoom,
  },
  data() {
    return {
      imgs: [
        "https://t13.baidu.com/it/u=738634288,2772506177&fm=224&app=112&size=w931&n=0&f=JPEG&fmt=auto?sec=1682787600&t=9a82b1df37bce3f8b2455b69191dac25"
      ],
      acitivityInfo: {
        id: 1,
        title: "标题1",
        startTime: "2020-08-01",
        endTime: "2020-08-01",
        address: "啊啊啊啊啊啊啊啊啊啊啊啊",
        content: "噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢哦哦哦",
        activityTeacher: "张三",
        activityPeople: 50,
        createTime: "2020-01-01",
        signTime: "2020-01-01",
        signendTime: "2020-01-01",
        img1: null,
        img2: null,
        img3: null,
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.activity-info {
  overflow: hidden;
  margin: 0 auto;
  width: 1000px;
  .zoom {
    width: 400px;
    float: left;
  }
  .content {
    width: 700px;
    font-family: "宋体";
  }
}
</style>
