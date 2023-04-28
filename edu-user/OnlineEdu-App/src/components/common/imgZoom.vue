<template>
  <div>
    <!-- 上方一张大图,放大镜,遮罩层 -->
    <div
      class="img_box"
      ref="img_box"
      @mousemove="move"
      @mouseover="flag = true"
      @mouseout="flag = false"
    >
      <img :src="currentImg" />
      <div class="big_img_box" ref="big" v-show="flag">
        <img
          ref="bigimg"
          :src="currentImg"
          :style="{'left':imgX + 'px','top':imgY + 'px',}"
          alt
        />
      </div>
      <div
        ref="mask"
        class="mark"
        :style="{'left':left + 'px','top':top + 'px',}"
        v-show="flag"
      ></div>
    </div>
    <!-- 底部五张小图 -->
    <div class="img_btns">
      <img
        v-for="(img, i) in imgs"
        :class="{ active: img == currentImg }"
        :key="i"
        :src="img"
        @click="currentImg = img"
      />
    </div>
  </div>
</template>
<script>

export default {
  name: "ImgZoom",
  props: ["imgs"],
  data() {
    return {
      currentImg: this.imgs[0],
      flag: false,
      top:'',
      left:'',
      imgX:'',
      imgY:'',
    };
  },
  methods: {
    move(e) {
      let small = this.$refs.img_box
      let mask = this.$refs.mask
      let big = this.$refs.big
      let bigimg = this.$refs.bigimg

      // 大图相对于网页左上角的坐标
      var ot = small.offsetTop;
      var ol = small.offsetLeft;
      // 获取鼠标中点位置
      let maskX =  e.pageX - ol
      let maskY = e.pageY - ot

      // 让鼠标出现在mask的中心点
      maskX = maskX - mask.offsetWidth / 2;
      maskY = maskY - mask.offsetHeight / 2;

      // 把mask限制到box中
      maskX = maskX < 0 ? 0 : maskX;
      maskY = maskY < 0 ? 0 : maskY;

      maskX = maskX > small.offsetWidth - mask.offsetWidth ? small.offsetWidth - mask.offsetWidth : maskX;
      maskY = maskY > small.offsetHeight - mask.offsetHeight ? small.offsetHeight - mask.offsetHeight : maskY;

      let bigImgX = maskX * (big.offsetWidth - bigimg.offsetWidth) / (small.offsetWidth - mask.offsetWidth);
      let bigImgY = maskY * (big.offsetHeight - bigimg.offsetHeight) / (small.offsetHeight - mask.offsetHeight)

      this.left = maskX
      this.top = maskY
      this.imgX = bigImgX
      this.imgY = bigImgY


      // // 鼠标相对于网页左上角的坐标
      // var x = e.pageX/2;
      // var y = e.pageY/2;
      // // 大图相对于网页左上角的坐标
      // var ot = this.$refs.img_box.offsetTop;
      // var ol = this.$refs.img_box.offsetLeft;
      // // 计算鼠标相对于大图左上角的坐标
      // x -= ol;
      // y -= ot;
      // // 限制鼠标相对于大图的坐标变化范围
      // x = x < 130 ? 130 : x;
      // x = x > 270 ? 270 : x;
      // y = y < 130 ? 130 : y;
      // y = y > 270 ? 270 : y;
      // // 在这个范围内,让遮罩层跟随鼠标移动
      // this.l = x - 130;
      // this.t = y - 130;
      // // 计算放大镜图片坐标
      // // 左侧图片移动范围 270 - 130 = 140
      // // 右侧大图移动范围 760 - 480 = 280
      // // 得出: 右侧大图和左侧小图移动的坐标比例关系  280 / 140 = 2
      // // this.left = -(x - 130) * 2;
      // // this.top = -(y - 130) * 2
      // this.left = -2 * x + 260;
      // this.top = -2 * y + 260;
    },
  },
  watch: {
    imgs(newValue) {
      this.currentImg = newValue[0];
    },
  },
};
</script>
<style lang="scss" scoped>
.spec-preview {
  // width: 410px;
  // height: 410px;
  // border: 1px solid #DFDFDF;
}
.img_box {
  // width: 400px;
  width: 300px;
  position: relative;
  cursor: crosshair;
}

.img_box img {
  width: 100%;
  border-radius: 10px;
}

.img_btns img {
  width: 80px;
  float: left;
  box-sizing: border-box;
  border: 2px solid white;
}

.img_btns .active {
  border-color: rgb(110, 73, 110);
}

.big_img_box {
  position: absolute;
  top: 0px;
  left: 402px;
  width: 480px;
  height: 480px;
  overflow: hidden;
  z-index: 100;
  border-radius: 10px;
}

.mark {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.big_img_box img {
  width: 760px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
