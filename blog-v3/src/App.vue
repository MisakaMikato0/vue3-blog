<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { isMobile, getWelcomeSay } from "@/utils/tool";
import { addView, getAllPageHeader } from "@/api/config";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import { storeToRefs } from "pinia";
import { user, staticData } from "@/store/index.js";

import MusicPlayer from "@/components/Music/index";
import BackTop from "@/components/BackTop/index";
import ChatRoom from "@/components/ChatRoom/index";

import SwitchTheme from "@/components/SwitchTheme/index.vue";

const userStore = user();
const router = useRouter();
const route = useRoute();
const { getUserInfo } = storeToRefs(userStore);
const backTopProps = reactive({
  right: "-108px",
  svgWidth: 0,
});
const isPc = ref(true);

const goBack = () => {
  router.go(-1);
};

// 优化通知显示的公共方法
const showNotification = (title, message, options = {}) => {
  ElNotification({
    offset: 60,
    title,
    message: h("div", { style: options.style || "font-weight: 600;" }, message),
    ...options
  });
};

// 获取所有的网站页面背景图
const getAllPageHeaderBg = async () => {
  const res = await getAllPageHeader();
  if (res.code === 0) {
    staticData().setPageHeaderLIst(res.result);
  } else {
    showNotification("错误提示", res.message, {
      style: "color: #f56c6c; font-weight: 600;"
    });
  }
};

const welcome = () => {
  const msg = getUserInfo.value.id === 3 
    ? "小婷光临，真是三生有幸" 
    : getWelcomeSay(getUserInfo.value.nick_name);
  showNotification("欢迎～", msg);
};

onMounted(async () => {
  // 首次判断是手机还是pc
  backTopProps.right = '-108px';
  backTopProps.svgWidth = 6;
  isPc.value = !isMobile();

  // 上传访问量
  await addView();
  if (window.name == "") {
    // 获取背景图片
    getAllPageHeaderBg();
    welcome();
  }
});
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <BackTop
      v-if="route.path !== '/'"
      :right="backTopProps.right"
    />
    <i
      v-if="!isPc && ['home', '/'].includes(route.path)"
      class="iconfont icon-fanhui"
      @click="goBack"
    ></i>
    <MusicPlayer />
    <div class="switch-box">
      <SwitchTheme />
    </div>

    <ChatRoom :isPc="isPc" v-if="route.path !== '/'" />
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  box-sizing: border-box;
}

.icon-fanhui {
  position: fixed;
  left: 5px;
  top: 60px;
  font-size: 2.2rem;
  color: var(--font-color);
  z-index: 999;
}
.switch-box {
  position: fixed;
  right: 5px;
  bottom: 0;
  z-index: 999;
}
@media screen and (max-width: 768px) {
  .switch-box {
    display: none;
  }
}
</style>
