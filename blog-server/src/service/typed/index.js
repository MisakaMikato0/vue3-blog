/*
 * @Author: M
 * @Date: 2023-10-10
 * @Description: 名言服务
 */

const Quote = require("../../model/typed/quotes");

// 获取所有名言
async function getAllQuotes() {
    try {
        return await Quote.findAll();
    } catch (error) {
        throw new Error("获取名言失败: " + error.message);
    }
}

// 添加新名言
async function addNewQuote(text, author) {
    try {
        return await Quote.create({ text, author });
    } catch (error) {
        throw new Error("添加名言失败: " + error.message);
    }
}

// 删除名言
async function deleteQuoteById(id) {
    try {
        const result = await Quote.destroy({
            where: { id }
        });
        return result; // 返回删除的行数
    } catch (error) {
        throw new Error("删除名言失败: " + error.message);
    }
}

module.exports = {
    getAllQuotes,
    addNewQuote,
    deleteQuoteById,
}; 