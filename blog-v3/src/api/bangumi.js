import http from "@/config/request";

/** 获取用户信息 */
export const getBangumiUserInfo = () => {
    return new Promise((resolve, reject) => {
        http.get(`/api/bangumi/userInfo`, {}).then((res) => {
            resolve(res);
        });
    });
};
/** 获取用户收藏 */
export const getBangumiCollection = (userName, params) => {
    console.log(params, 'ddd');
    return new Promise((resolve, reject) => {
        http.post(`/api/bangumi/collection`, userName, { params }).then((res) => {
            resolve(res);
        });
    });
};