import http from "@/config/request";
/** 登录 */
export const reqToLogin = (phone, captcha) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/login/cellphone?phone=${phone}&captcha=${captcha}`, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 退出登陆 */
export const reqLoginout = (phone, captcha) => {
  return new Promise((resolve, reject) => {
    http.get("/wapi/logout", {}).then((res) => {
      resolve(res);
    });
  });
};
/** 二维码 key 生成接口 */
export const reqQrcodeKey = () => {
  return new Promise((resolve, reject) => {
    http.get("/wapi/login/qr/key", {}).then((res) => {
      resolve(res);

    });
  });
};
/** 二维码生成接口 */
export const reqQrcode = (key) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/login/qr/create?key=${key}&qrimg=base64 `, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 二维码检测扫码状态接口 */
export const reqQrcodeStatus = (key) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/login/qr/check?key=${key}&timestamp=${Date.now()}`, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 获取登录状态 */
export const reqLoginStatus = () => {
  return new Promise((resolve, reject) => {
    http.get("/wapi/login/status", {}).then((res) => {
      resolve(res);
    });
  });
};

/** 获取验证码 */
export const reqCode = (phone) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/captcha/sent?phone=${phone}`, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 验证验证码 */
export const reqCodeT = (phone, captcha) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/captcha/sent?phone=${phone}&captcha=${captcha}`, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 获取用户歌单 */
export const reqUserToplist = (uid) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/user/playlist?uid=${uid}`, {}).then((res) => {
      resolve(res);
    });
  });
};
/** 获取榜单 */
export const reqToplist = () => {
  return new Promise((resolve, reject) => {
    http.get("/wapi/toplist/detail", {}).then((res) => {
      resolve(res);
    });
  });
};

/** 获取榜单歌曲列表 */
export const reqTopDetaliList = ({ id, limit, offset }) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/wapi/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`, {})
      .then((res) => {
        resolve(res);
      });
  });
};

/** 获取歌曲详情 主要是播放地址 */
export const reqMusicDetail = ({ id, level }) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/song/url/v1?id=${id}&level=${level}`, {}).then((res) => {
      resolve(res);
    });
  });
};

// 获取音乐的描述
export const reqMusicDescription = (id) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi//song/detail?ids=${id}`, {}).then((res) => {
      resolve(res);
    });
  });
};

// 搜索
export const reqSearch = (keyWords, offset, limit) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/wapi/search?keywords=${keyWords}&offset=${offset}&limit=${limit}`, {})
      .then((res) => {
        resolve(res);
      });
  });
};

// 根据歌曲id获取歌词
export const reqMusicLyricById = (id) => {
  return new Promise((resolve, reject) => {
    http.get(`/wapi/lyric?id=${id}`, {}).then((res) => {
      resolve(res);
    });
  });
};
