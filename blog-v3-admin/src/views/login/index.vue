<script setup lang="ts" name="Login">
import Motion from "./utils/motion";
import { useRouter, useRoute } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { useLayout } from "@/layout/hooks/useLayout";
import { bg } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { storageLocal } from "@pureadmin/utils";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";

import { initRouter } from "@/router/utils";
import {setSessionKey } from '@/utils/auth'
type RuleFormType = {
  username?: string;
  password?: string;
};
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();

const { title } = useNav();

const ruleForm = reactive<RuleFormType>({
  username: "",
  password: ""
});

const isRememberMe = ref(false);

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isRememberMe.value) {
        storageLocal().setItem("loginInfo", ruleForm);
      } else {
        storageLocal().removeItem("loginInfo");
      }
      useUserStoreHook()
        .loginByUsername(ruleForm)
        .then(res => {
          if(res?.result?.role == 1) {
            if (res.code == 0) {
              initRouter().then(() => {
                router.push("/");
                message("登录成功", { type: "success" });
              });
            }
          }else {
            setSessionKey(res.result.username,res.result.role)
            message("你不是管理员喵~，请联系站长申请！", { type: "error" });
            loading.value = false;

          }
          
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

const goRegister = () => {
  router.push("/register");
};

const changeAccount = () => {
  ruleForm.password = "";
};

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  const route = useRoute();

  if (route.query.username) {
    ruleForm.username = route.query.username + "";
    isRememberMe.value = true;
  } else {
    if (storageLocal().getItem("loginInfo")) {
      isRememberMe.value = true;
      Object.assign(ruleForm, storageLocal().getItem("loginInfo"));
    }
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none relative">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <img src="https://i.miji.bid/2025/01/22/891a8f38e495eb809f203294e490fa2d.png" alt="" class="illustration">
      </div>
      <div class="login-box">
        <div class="login-form">
          <img src="https://i.miji.bid/2025/01/22/d453d31b7a896027882662babdaa193a.png" alt="" class="avatar">
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  clearable
                  v-model="ruleForm.username"
                  placeholder="账号"
                  @clear="changeAccount"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  clearable
                  show-password
                  v-model="ruleForm.password"
                  placeholder="密码"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </Motion>
            <Motion :delay="250" class="register">
              <el-checkbox v-model="isRememberMe">记住我</el-checkbox>
              <div>
                没有账号？<span class="line" @click="goRegister">去注册</span>
              </div>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
    <div class="filings">
      <a class="change-color" href="https://beian.miit.gov.cn/" target="_blank"
        >滇ICP备2025049803号</a
      >
    </div>
    <div class="footer-cdn">
      <a class="p-[3px] upyun-logo" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank">
         本网站由
          <img src="https://i.miji.bid/2025/01/22/ce3e4ab23118715b56782b6f21dfba93.png" alt="ce3e4ab23118715b56782b6f21dfba93.png" border="0">
          提供CDN加速/云存储服务
        </a>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.register {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  color: #676767;

  :deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
    font-size: 0.8em;
    color: #676767;
  }
}
.line {
  cursor: pointer;
  text-decoration: underline;
}

.filings {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #333;
  font-size: 12px;

  .change-color {
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: #000;
    }
  }
}
.footer-cdn {
  display: flex;
  justify-content: center;
  align-items: center;
  .upyun-logo {
    display: flex;
    text-decoration: none;
    align-items: center;
    height: 30px;
    font-size: 12px;

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
}
</style>
