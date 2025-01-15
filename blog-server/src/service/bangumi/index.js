const axios = require('axios');
const { BANGUMI_API_KEY } = require("../../config/config.default");

const token = 'WPVmJgIG97y3M1uF5uAOupmuea17je7YSJALAQUQ'; // Bearer token

// Helper function to add authorization header
const getAuthConfig = () => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'bgm/v3'
    },
});

// 获取用户信息
exports.getUserInfo = async () => {
    const response = await axios.get(`${BANGUMI_API_KEY}/me`, getAuthConfig());
    return response.data;
};



// 获取收藏番剧
exports.collectBangumi = async (params, query) => {

    const { subject_type = 1, type = null, limit = 30, offset = 0 } = query;
    const { userName } = params;
    // 检查 userName 是否存在
    if (!userName) {
        throw new Error('Username is required.');
    }
    try {
        const response = await axios.get(
            `${BANGUMI_API_KEY}/users/${userName}/collections`, // 替换为正确的 API 地址
            {
                params: {
                    subject_type,
                    type, // 
                    limit,
                    offset,
                },
                ...getAuthConfig(), // 合并 getAuthConfig 的返回值到配置中
            }
        );

        return response.data;
    } catch (error) {
        console.error(`Error fetching collections for user "${userName}":`, error.message);
        throw error;
    }
};

