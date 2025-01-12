import http from "@/config/request";
import { user } from "@/store/index.js";
import { h } from "vue";
import { ElNotification } from "element-plus";
import { imageConversion } from "@/utils/tool";

/** 登录 */
export const reqLogin = (data) => {
  return http.post("/user/login", data);
};

/** 注册 */
export const reqRegister = (data) => {
  return http.post("/user/register", data);
};

/** 用户修改个人信息 */
export const updateUserInfo = (data) => {
  return http.put("/user/updateOwnUserInfo", data);
};

/** 用户修改密码 */
export const updateUserPassword = (data) => {
  return http.put("/user/updatePassword", data);
};

/** 获取当前登录人的信息 */
export const getUserInfoById = (id) => {
  return http.get(`/user/getUserInfoById/${id}`);
};

/** 图片上传 */
/** 图片上传接口 */
export const imgUpload = async (data) => {
  // 文件压缩 太大了上传不了，我的服务器比较垃圾
  let res;
  // 没有raw.size 就表示已经压缩过了（多图片上传那里我压缩了一次） 有的话小于800不用压缩
  if (data.raw.size / 1024 > 800) {
    const file = await imageConversion(data.raw);
    if (!file) {
      ElNotification({
        offset: 60,
        title: "错误提示",
        message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, "图片上传失败"),
      });
      return;
    } else {
      res = file;
    }
  } else {
    res = data.raw;
  }
  const formData = new FormData();
  formData.append("file", res);
  const userStore = user();

  return http.post("/upload/img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": userStore.getToken,
    },
  });
};
