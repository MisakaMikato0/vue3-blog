const { getUserInfo, collectBangumi } = require('../../service/bangumi/index');
// 获取用户信息
exports.getUserInfo = async (ctx) => {
    try {
        const bangumiList = await getUserInfo();
        ctx.body = {
            status: "200",
            data: bangumiList,
        };
    } catch (err) {
        bangumiList.status(500).json({ error: '获取用户信息失败' });
        console.log(err);
    }
};

// 获取用户收藏
exports.getBangumiCollection = async (ctx) => {
    try {
        const bangumiList = await collectBangumi(ctx.request.body, ctx.query); // 从 query 参数获取请求数据
        ctx.body = {
            status: '200',
            data: bangumiList,
        };
    } catch (error) {
        ctx.body = {
            status: 'error',
            message: error.message || '服务器错误',
        };
        ctx.status = 500; // 返回 HTTP 500 状态码
    }
};
