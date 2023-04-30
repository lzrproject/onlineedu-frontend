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
      <div class="big_img_box" v-show="flag">
        <img ref="big" :src="currentImg" alt />
      </div>
      <div ref="mask" class="mask" v-show="flag"></div>
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
      // 放大镜图坐标
      left: 0,
      top: 0,
      // 遮罩层坐标
      l: 0,
      t: 0,
    };
  },
  methods: {
    move(e) {
      // console.log(123)
      let mask = this.$refs.mask; //获取遮罩层这个元素
      let big = this.$refs.big; //获取大图的这个元素
      let left = e.offsetX - mask.offsetWidth / 2; //offsetWidth/2遮罩层宽度的一半,offsetX是从遮罩层的中心开始算的
      let top = e.offsetY - mask.offsetHeight / 2; //距离顶部的距离
      //约束范围
      if (left <= 0) left = 0; //约束最小的距离左边的距离不能小于0
      if (left >= mask.offsetWidth) left = mask.offsetWidth; //约束最大的距离left不能大于一个遮罩层的宽度,因为刚好两个遮罩层等于容器的宽度
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      //修改元素的left|top属性值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
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

.mask {
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
