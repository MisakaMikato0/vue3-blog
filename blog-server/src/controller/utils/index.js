const path = require("path");

const { result, ERRORCODE, throwError, tipsResult } = require("../../result/index");
const errorCodeUpload = ERRORCODE.UPLOAD;
const errorCodeConfig = ERRORCODE.CONFIG;

const { updateConfig, getConfig, addView } = require("../../service/config/index");
const fs = require("fs");
const { upToQiniu, deleteImgs } = require("../../utils/qiniuUpload");
const { minioUpload, deleteMinioImgs } = require("../../utils/minioUpload");
const { uploadToUpyun, deleteFromUpyun } = require('../../utils/upyunUpload')
const { UPLOADTYPE, BASEURL } = require("../../config/config.default");
const { isValidUrl } = require("../../utils/tool");
class UtilsController {

  // 图片上传
  async upload(ctx) {

    const { file } = ctx.request.files || {};

    if (!file || !file.filepath) {
      ctx.body = result("文件不存在或无效", null, 400);
      return;
    }

    let completeUrl = isValidUrl(BASEURL) ? BASEURL : "http://" + BASEURL;
    if (!completeUrl.endsWith("/")) {
      completeUrl += "/";
    }

    try {
      if (UPLOADTYPE == "local" || !UPLOADTYPE) {
        ctx.body = result("图片上传成功", {
          url: `${completeUrl}local/${path.basename(file.filepath)}`,
        });
      } else if (UPLOADTYPE == "qiniu") {
        const reader = fs.createReadStream(file.filepath);
        const fileUrl = file.name;
        const res = await upToQiniu(reader, fileUrl);
        if (res) {
          ctx.body = result("图片上传成功", {
            url: `${completeUrl}${res.key}`,
          });
        } else {
          throw new Error("七牛云上传失败");
        }
      } else if (UPLOADTYPE == "minio") {
        const res = await minioUpload(file.filepath);
        if (res) {
          ctx.body = result("图片上传成功", {
            url: res,
          });
        } else {
          throw new Error("MinIO 上传失败");
        }
      } else if (UPLOADTYPE == "online") {
        ctx.body = result("图片上传成功", {
          url: `${completeUrl}online/${path.basename(file.filepath)}`,
        });
      } else if (UPLOADTYPE == "upyun") {
        // 读取文件流
        const fileBuffer = fs.readFileSync(file.filepath);
        const key = `web-img/${file.newFilename}`;
        const res = await uploadToUpyun(fileBuffer, key, file.mimetype);
        if (res) {
          ctx.body = result("图片上传成功", {
            url: `${completeUrl}${key}`,
          });
        } else {
          throw new Error("又拍云上传失败");
        }
      } else {
        ctx.body = result("未知的上传类型", null, 400);
      }

    } catch (err) {
      ctx.app.emit("error", throwError(errorCodeUpload, err.message));
    }
  }


  // 删除服务器下的照片
  async deleteOnlineImgs(imgList) {
    Array.isArray(imgList) &&
      imgList.length &&
      imgList.forEach((v) => {
        if (v) {
          let filePath = path.join(__dirname, "./upload/online/" + v).replace("/controller/utils", "");
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
  }

  // 修改网站设置
  async updateConfig(ctx) {
    try {
      let config = await getConfig();
      // 如果背景图不一致，删除原来的
      const { avatar_bg, blog_avatar, qq_link, we_chat_link, we_chat_group, qq_group, we_chat_pay, ali_pay } = ctx.request.body;

      if (UPLOADTYPE == "qiniu") {
        if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
          await deleteImgs([config.avatar_bg.split("/").pop()]);
        }
        if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
          await deleteImgs([config.blog_avatar.split("/").pop()]);
        }
        if (qq_link && config.qq_link && qq_link != config.qq_link) {
          await deleteImgs([config.qq_link.split("/").pop()]);
        }
        if (we_chat_link && config.we_chat_link && we_chat_link != config.we_chat_link) {
          await deleteImgs([config.we_chat_link.split("/").pop()]);
        }
        if (we_chat_group && config.we_chat_group && we_chat_group != config.we_chat_group) {
          await deleteImgs([config.we_chat_group.split("/").pop()]);
        }
        if (qq_group && config.qq_group && qq_group != config.qq_group) {
          await deleteImgs([config.qq_group.split("/").pop()]);
        }
        if (we_chat_pay && config.we_chat_pay && we_chat_pay != config.we_chat_pay) {
          await deleteImgs([config.we_chat_pay.split("/").pop()]);
        }
        if (ali_pay && config.ali_pay && ali_pay != config.ali_pay) {
          await deleteImgs([config.ali_pay.split("/").pop()]);
        }
      }

      const Utils = new UtilsController();
      if (UPLOADTYPE == "online") {
        if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
          await Utils.deleteOnlineImgs([config.avatar_bg.split("/").pop()]);
        }
        if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
          await Utils.deleteOnlineImgs([config.blog_avatar.split("/").pop()]);
        }
        if (qq_link && config.qq_link && qq_link != config.qq_link) {
          await Utils.deleteOnlineImgs([config.qq_link.split("/").pop()]);
        }
        if (we_chat_link && config.we_chat_link && we_chat_link != config.we_chat_link) {
          await Utils.deleteOnlineImgs([config.we_chat_link.split("/").pop()]);
        }
        if (we_chat_group && config.we_chat_group && we_chat_group != config.we_chat_group) {
          await Utils.deleteOnlineImgs([config.we_chat_group.split("/").pop()]);
        }
        if (qq_group && config.qq_group && qq_group != config.qq_group) {
          await Utils.deleteOnlineImgs([config.qq_group.split("/").pop()]);
        }
        if (we_chat_pay && config.we_chat_pay && we_chat_pay != config.we_chat_pay) {
          await Utils.deleteOnlineImgs([config.we_chat_pay.split("/").pop()]);
        }
        if (ali_pay && config.ali_pay && ali_pay != config.ali_pay) {
          await Utils.deleteOnlineImgs([config.ali_pay.split("/").pop()]);
        }
      }

      if (UPLOADTYPE == "minio") {
        if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
          await deleteMinioImgs([config.avatar_bg.split("/").pop()]);
        }
        if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
          await deleteMinioImgs([config.blog_avatar.split("/").pop()]);
        }
        if (qq_link && config.qq_link && qq_link != config.qq_link) {
          await deleteMinioImgs([config.qq_link.split("/").pop()]);
        }
        if (we_chat_link && config.we_chat_link && we_chat_link != config.we_chat_link) {
          await deleteMinioImgs([config.we_chat_link.split("/").pop()]);
        }
        if (we_chat_group && config.we_chat_group && we_chat_group != config.we_chat_group) {
          await deleteMinioImgs([config.we_chat_group.split("/").pop()]);
        }
        if (qq_group && config.qq_group && qq_group != config.qq_group) {
          await deleteMinioImgs([config.qq_group.split("/").pop()]);
        }
        if (we_chat_pay && config.we_chat_pay && we_chat_pay != config.we_chat_pay) {
          await deleteMinioImgs([config.we_chat_pay.split("/").pop()]);
        }
        if (ali_pay && config.ali_pay && ali_pay != config.ali_pay) {
          await deleteMinioImgs([config.ali_pay.split("/").pop()]);
        }
      }
      if (UPLOADTYPE == "upyun") {
        if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
          await deleteFromUpyun([config.avatar_bg.split("/").pop()]);
        }
        if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
          await deleteFromUpyun([config.blog_avatar.split("/").pop()]);
        }
        if (qq_link && config.qq_link && qq_link != config.qq_link) {
          await deleteFromUpyun([config.qq_link.split("/").pop()]);
        }
        if (we_chat_link && config.we_chat_link && we_chat_link != config.we_chat_link) {
          await deleteFromUpyun([config.we_chat_link.split("/").pop()]);
        }
        if (we_chat_group && config.we_chat_group && we_chat_group != config.we_chat_group) {
          await deleteFromUpyun([config.we_chat_group.split("/").pop()]);
        }
        if (qq_group && config.qq_group && qq_group != config.qq_group) {
          await deleteFromUpyun([config.qq_group.split("/").pop()]);
        }
        if (we_chat_pay && config.we_chat_pay && we_chat_pay != config.we_chat_pay) {
          await deleteFromUpyun([config.we_chat_pay.split("/").pop()]);
        }
        if (ali_pay && config.ali_pay && ali_pay != config.ali_pay) {
          await deleteFromUpyun([config.ali_pay.split("/").pop()]);
        }
      }
      let res = await updateConfig(ctx.request.body);

      ctx.body = result("修改网站设置成功", res);
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCodeConfig, "修改网站设置失败"));
    }
  }
  // 获取网站设置
  async getConfig(ctx) {
    try {
      let res = await getConfig();
      if (res) {
        ctx.body = result("获取网站设置成功", res);
      } else {
        ctx.body = tipsResult("请去博客后台完善博客信息");
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCodeConfig, "获取网站设置失败"));
    }
  }
  // 增加网站访问次数
  async addView(ctx) {
    try {
      let res = await addView();
      if (res == "添加成功") {
        ctx.body = result("增加访问量成功", res);
      } else if (res == "需要初始化") {
        ctx.body = tipsResult("请先初始化网站信息");
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCodeConfig, "增加网站访问量失败"));
    }
  }
}

module.exports = new UtilsController();
