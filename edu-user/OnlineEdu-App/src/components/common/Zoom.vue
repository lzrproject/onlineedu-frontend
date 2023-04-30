<template>
  <div class="app-container">
    <div class="spec-preview">
      <img :src="currentImg" />
      <div class="event" @mousemove="handler"></div>
      <div class="big">
        <img :src="currentImg" ref="big" />
      </div>
      <!-- 遮罩层  这里获取遮罩层的DOM,我们以后都用ref来绑定-->
      <div class="mask" ref="mask"></div>
    </div>
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
  name: "Zoom",
  props: ["imgs"], //接收父组件Detail传过来的数据
  data() {
    return {
      currentImg: this.imgs[0],
    };
  },
  watch: {
    imgs(newValue) {
      this.currentImg = newValue[0];
    },
  },
  methods: {
    handler(event) {
      // console.log(123)
      let mask = this.$refs.mask; //获取遮罩层这个元素
      let big = this.$refs.big; //获取大图的这个元素
      let left = event.offsetX - mask.offsetWidth / 2; //offsetWidth/2遮罩层宽度的一半,offsetX是从遮罩层的中心开始算的
      let top = event.offsetY - mask.offsetHeight / 2; //距离顶部的距离
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
};
</script>
<style lang="scss" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 0px solid #ccc;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
.img_btns img {
  width: 80px;
  height: 80px;
  float: left;
  box-sizing: border-box;
  border: 2px solid white;
}

.img_btns .active {
  border-color: rgb(110, 73, 110);
}
</style>
