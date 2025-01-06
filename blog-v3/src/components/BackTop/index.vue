<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { staticData } from "@/store/index.js";
import { debounce } from "@/utils/tool.js";
import backToTopImg from "@/assets/img/back-to-top.webp";
import linkCursor from "@/assets/cursor/link.cur";

// 从 Pinia 获取主题数据
const { mainTheme } = storeToRefs(staticData());

// 定义是否为首次加载
const isFirst = ref(true);

// 定义传入的 props
const props = defineProps({
  bottom: {
    type: [String, Number],
    default: "50px",
  },
  right: {
    type: [String, Number],
    default: "-150px",
  },


});

// 响应式数据
const backTopProps = reactive({
  bottom: "",
  right: "",
  width: "",
});

// 动态监听 props 的变化
watch(
  () => props,
  () => {
    backTopProps.bottom = /^[\d|.]*$/g.test(props.bottom) ? props.bottom + "rem" : props.bottom;
    backTopProps.right = /^[\d|.]*$/g.test(props.right) ? props.right + "rem" : props.right;
  },
  {
    immediate: true,
    deep: true,
  }
);

// 动态切换主题的 SVG 名称
// const svgThemeName = computed(() => {
//   return mainTheme.value ? "dark" + props.svgName : "light" + props.svgName;
// });

// 返回顶部按钮显示状态
const backTopShow = ref(false);

// 防抖处理滚动事件
const scroll = debounce(() => {
  let scrollTop = ref(0);
  scrollTop.value =
    window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop.value > 200) {
    backTopShow.value = true;
    isFirst.value = false;
  } else {
    backTopShow.value = false;
  }
}, 10);

// 返回顶部的功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 组件挂载时注册滚动事件
onMounted(() => {
  window.addEventListener("scroll", scroll);
});

// 组件卸载时移除滚动事件
onBeforeUnmount(() => {
  window.removeEventListener("scroll", scroll);
});
</script>


<template>
  <div
    v-if="!isFirst"
    :class="[
      backTopShow ? 'back-top-show' : 'back-top-hidden',
      'back-top',
    ]"
    :style="`bottom: ${backTopProps.bottom}; `"
  >
    <a
      href="javascript:void(0);"
      @click="scrollToTop"
      class="back-to-top"
      target="_self"
      style="cursor: url(${linkCursor}), pointer;"
    ></a>

    <!-- 动态 SVG 图标 -->
    <!-- <svg-icon
      :style="{ transform: `rotateZ(${props.rotateDeg}deg)` }"
      :name="svgThemeName"
      :width="svgWidth"
    ></svg-icon> -->
  </div>
</template>


<style lang="scss" scoped>
.back-top {
  position: fixed;
  overflow: hidden;
  z-index: 999;
  right: -150px;
  transition: all ease-in-out 0.3s;

  
  
  &:hover {
    .back-to-top {
      background-position: 0 -150px;
      opacity: 1;
      pointer-events:all;

    }
   
  }

  .back-to-top {
    display: block;
    z-index: 999;
    width: 108px;
    height: 150px;
    background: url("@/assets/img/back-to-top.webp") no-repeat 0 0;
    background-size: 108px 450px;
    transition: opacity 0.3s;
    opacity: 0;
    pointer-events: none;
    
  }

  
  &-show {
    animation: show 0.8s ease-in-out forwards;
    right: 0;
    .back-to-top {
      opacity: 1;
    }
  }
  &-hidden {
    animation: hide 0.8s ease-in-out forwards;
    right: -150px;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 0;
    transform: translateY(300px);
  }
  100% {
    transform: translateX(300px);
  }
}


</style>
