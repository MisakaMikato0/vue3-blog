<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import Typed from "typed.js";

// 使用 const props 接收 defineProps 的结果
const props = defineProps({
  strings: {
    type: Array,
    required: true, // 必须传入字符串数组
    default: () => [],
  },
  typeSpeed: {
    type: Number,
    default: 100, // 打字速度
  },
  backSpeed: {
    type: Number,
    default: 100, // 删除速度
  },
  loop: {
    type: Boolean,
    default: true, // 是否循环
  },
  // 字体大小
  size: {
    type: String,
    default: "1em",
  },
  // 洗牌
  shuffle: {
    type: Boolean,
    default: true,
  },
});

const typedElement = ref(null);
let typedInstance = null;

onMounted(() => {
  // 使用 props 对象访问属性值
  const options = {
    strings: props.strings, // 字符串数组
    typeSpeed: props.typeSpeed, // 打字速度
    backSpeed: props.backSpeed, // 删除速度
    loop: props.loop, // 是否循环
    shuffle: props.shuffle, // 是否洗牌
  };

  // 初始化 Typed.js
  typedInstance = new Typed(typedElement.value, options);
});

onUnmounted(() => {
  // 销毁 Typed.js 实例，避免内存泄漏
  if (typedInstance) {
    typedInstance.destroy();
  }
});
</script>

<template>
  <div class="typed-write">
    <span ref="typedElement" :style="{ fontSize: size }"></span>
  </div>
</template>
<style lang="scss" scoped>
.typed-write {
  width: 100%;
  color: var(--global-white);
  cursor: pointer;
  text-align: center;
}
</style>