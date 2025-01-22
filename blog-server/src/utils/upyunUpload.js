const fs = require("fs");
const path = require("path");
const Upyun = require("upyun");

const { SERVICE_NAME, OPERATOR_NAME, OPERATOR_PASSWORD } = require("../config/config.default");


// 初始化又拍云服务
const service = new Upyun.Service(SERVICE_NAME, OPERATOR_NAME, OPERATOR_PASSWORD);
const client = new Upyun.Client(service);

// 上传文件到又拍云

const uploadToUpyun = async (localFile, remotePath, mimetype) => {

    return new Promise((resolve, reject) => {
        client.putFile(remotePath, localFile, {
            "Content-Type": mimetype, // 动态设置 Content-Type
        })
            .then((result) => {
                resolve(result);
                console.log(result, 'console.log(result); console.log(result); ');
            })
            .catch((err) => {
                reject(err);
                console.log(err, 'errerrerr');
            });
    });
};




// 批量删除文件
const deleteFromUpyun = (filePaths) => {
    console.log(filePaths, 'filePathsfilePathsfilePaths删除');

    const promises = filePaths.map((filePath) => {
        const path = `web-img/${filePath}`
        return client.deleteFile(path).catch((err) => {
            // 捕获单个文件删除失败的错误
            console.error(`删除文件失败: ${path}`, err);
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
