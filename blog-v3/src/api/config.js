import http from "@/config/request";

/** 首页获取网站config */
export const homeGetConfig = () => {
  // 如果需要手动包装 Promise：
  // return new Promise((resolve, reject) => {
  //   http.get("/api/config").then((res) => {
  //     resolve(res);
  //   }).catch((err) => {
  //     reject(err);
  //   });
  // });
  return http.get("/api/config");
};

/** 增加网站访问量 */
export const addView = () => {
  // 如果需要手动包装 Promise：
  // return new Promise((resolve, reject) => {
  //   http.put("/api/config/addView").then((res) => {
  //     resolve(res);
  //   }).catch((err) => {
  //     reject(err);
  //   });
  // });
  return http.put("/api/config/addView");
};

/** 获取所有的背景图片 */
export const getAllPageHeader = () => {
  // 如果需要手动包装 Promise：
  // return new Promise((resolve, reject) => {
  //   http.get("/api/pageHeader/getAll").then((res) => {
  //     resolve(res);
  //   }).catch((err) => {
  //     reject(err);
  //   });
  // });
  return http.get("/api/pageHeader/getAll");
};
