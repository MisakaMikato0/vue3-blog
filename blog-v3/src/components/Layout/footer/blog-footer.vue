<template>
  <!-- 最外层 div 是占位置的 -->
  <div
    v-if="route.path !== '/message/chat'"
    class="footer_box flex flex-col items-center justify-center"
  >
    <!-- eslint-disable-next-line -->
    <div class="footer-color my-face">&copy 幻想乡白玉楼 ღゝ◡╹)ノ♡</div>
    <a class="footer-color change-color mt-[5px]" href="https://beian.miit.gov.cn/" target="_blank"
      >滇ICP备2025049803号</a
    >
    <div class="footer-color mt-[5px] flex justify-center flex-wrap">
      <a
        class="p-[3px]"
        href="https://www.aliyun.com/?spm=5176.28055625.J_3207526240.1.6a27154aw7v5VK"
        target="_blank"
      >
        <img
          src="https://img.shields.io/badge/%E9%98%BF%E9%87%8C%E4%BA%91-ECS%E6%9C%8D%E5%8A%A1%E5%99%A8-orange"
          alt=""
      /></a>
      <a class="p-[3px]" href="https://imzbf.github.io/md-editor-v3/docs/index" target="_blank">
        <img
          src="https://img.shields.io/badge/MdEditorV3-MD%E7%BC%96%E8%BE%91%E5%99%A8-159957"
          alt=""
      /></a>
      <!-- <a class="p-[3px]" href="https://butterfly.js.org/" target="_blank">
        <img src="https://img.shields.io/badge/HEXO-BUTTERFLY-blue" alt="" />
      </a> -->
        <a class="p-[3px] upyun-logo" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank">
         本网站由
          <img src="https://i.miji.bid/2025/01/22/ce3e4ab23118715b56782b6f21dfba93.png" alt="ce3e4ab23118715b56782b6f21dfba93.png" border="0">
          提供CDN加速/云存储服务
        </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
.footer-color {
  color: var(--font-color);
  text-align: center;
  align-items: center;
}

.change-color {
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: var(--global-black);
  }
}
  .upyun-logo {
    display: flex;
    text-decoration: none;
    align-items: center;
    height: 30px;
    div {
      flex: 1;
    }
    img {
      width: auto;
      height: 100%;
      object-fit: cover;
      margin: 0 5px;
    }
  }

@keyframes my-face {
  2%,
  24%,
  80% {
    transform: translateY(1.5px) rotate(1.5deg);
  }

  4%,
  68%,
  98% {
    transform: translateY(-1.5px) rotate(-0.5deg);
  }

  38%,
  6% {
    transform: translateY(1.5px) rotate(-1.5deg);
  }

  8%,
  86% {
    transform: translateY(-1.5px) rotate(-1.5deg);
  }

  10%,
  72% {
    transform: translateY(2.5px) rotate(1.5deg);
  }

  12%,
  64%,
  78%,
  96% {
    transform: translateY(-0.5px) rotate(1.5deg);
  }

  14%,
  54% {
    transform: translateY(-1.5px) rotate(1.5deg);
  }

  16% {
    transform: translateY(-0.5px) rotate(-1.5deg);
  }

  18%,
  22% {
    transform: translateY(0.5px) rotate(-1.5deg);
  }

  20%,
  36%,
  46% {
    transform: translateY(-1.5px) rotate(2.5deg);
  }

  26%,
  50% {
    transform: translateY(0.5px) rotate(0.5deg);
  }

  28% {
    transform: translateY(0.5px) rotate(1.5deg);
  }

  30%,
  40%,
  62%,
  76%,
  88% {
    transform: translateY(-0.5px) rotate(2.5deg);
  }

  32%,
  34%,
  66% {
    transform: translateY(1.5px) rotate(-0.5deg);
  }

  42% {
    transform: translateY(2.5px) rotate(-1.5deg);
  }

  44%,
  70% {
    transform: translateY(1.5px) rotate(0.5deg);
  }

  48%,
  74%,
  82% {
    transform: translateY(-0.5px) rotate(0.5deg);
  }

  52%,
  56%,
  60% {
    transform: translateY(2.5px) rotate(2.5deg);
  }

  58% {
    transform: translateY(0.5px) rotate(2.5deg);
  }

  84% {
    transform: translateY(1.5px) rotate(2.5deg);
  }

  90% {
    transform: translateY(2.5px) rotate(-0.5deg);
  }

  92% {
    transform: translateY(0.5px) rotate(-0.5deg);
  }

  94% {
    transform: translateY(2.5px) rotate(0.5deg);
  }

  0%,
  to {
    transform: translate(0) rotate(0);
  }
}
.my-face {
  animation: my-face 5s ease-in-out infinite;
}
</style>
