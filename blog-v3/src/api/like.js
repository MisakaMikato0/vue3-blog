import http from "@/config/request";

/** 点赞 */
export const addLike = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/like/addLike", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/like/addLike", data)
};

/** 判断当前用户是否点赞了 */
export const getIsLikeByIdOrIpAndType = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/like/getIsLikeByIdOrIpAndType", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/like/getIsLikeByIdOrIpAndType", data)
};

/** 取消点赞 */
export const cancelLike = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/like/cancelLike", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/like/cancelLike", data)
};
