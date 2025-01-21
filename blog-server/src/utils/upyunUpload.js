const fs = require("fs");
const path = require("path");
const Upyun = require("upyun");

const { SERVICE_NAME, OPERATOR_NAME, OPERATOR_PASSWORD } = require("../config/config.default");

// 初始化又拍云服务
const service = new Upyun.Service(SERVICE_NAME, OPERATOR_NAME, OPERATOR_PASSWORD);
const client = new Upyun.Client(service);

// 上传文件到又拍云
const uploadToUpyun = (localFile, remotePath) => {
    // const localFile = fs.createReadStream(filePath); // 读取文件流
    return new Promise((resolve, reject) => {
        client.putFile(remotePath, localFile, {
            "Content-Type": "application/octet-stream", // 可根据需求修改
        })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// 批量删除文件
const deleteFromUpyun = (filePaths) => {
    const promises = filePaths.map((filePath) => {
        return client.deleteFile(filePath).catch((err) => {
            // 捕获单个文件删除失败的错误
            console.error(`删除文件失败: ${filePath}`, err);
            return null; // 返回 null 表示删除失败
        });
    });

    return Promise.all(promises)
        .then((results) => {
            const success = results.filter((res) => res !== null); // 成功的操作
            const failed = results.length - success.length; // 失败的操作数
            console.log(`成功删除 ${success.length} 个文件, 失败 ${failed} 个文件`);
            return { success, failed };
        })
        .catch((err) => {
            console.error("批量删除文件出错", err);
        });
};

module.exports = {
    uploadToUpyun,
    deleteFromUpyun,
};
