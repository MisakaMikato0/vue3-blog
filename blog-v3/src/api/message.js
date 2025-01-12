import http from "@/config/request";

/** 获取留言列表 */
export const getMessageList = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/message/getMessageList", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/message/getMessageList", data)
};

/** 获取所有留言 */
export const getAllMessage = () => {
  // return new Promise((resolve, reject) => {
  //   http.get("/api/message/getAllMessage").then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.get("/api/message/getAllMessage")
};

/** 新增留言 */
export const addMessage = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/message/add", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/message/add", data)
};

/** 编辑留言 */
export const updateMessage = (data) => {
  // return new Promise((resolve, reject) => {
  //   http.post("/api/message/update", data).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.post("/api/message/update", data)
};

/** 删除留言 */
export const deleteMessage = (id) => {
  // return new Promise((resolve, reject) => {
  //   http.put("/api/message/delete", { idList: [id] }).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.put("/api/message/delete", { idList: [id] })
};

/** 获取热门标签 */
export const getMessageTag = () => {
  // return new Promise((resolve, reject) => {
  //   http.get("/api/message/getHotTagList", {}).then((res) => {
  //     resolve(res);
  //   });
  // });
  return http.get("/api/message/getHotTagList")
};
