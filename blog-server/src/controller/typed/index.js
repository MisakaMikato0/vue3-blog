/*
 * @Author: M
 * @Date: 2023-10-10
 * @Description: 名言控制器
 */

const { getAllQuotes, addNewQuote, deleteQuoteById } = require("../../service/typed/index");

// 获取所有名言
async function fetchAllQuotes(ctx) {
    try {
        const quotes = await getAllQuotes();
        const texts = quotes.map(quote => quote.text);
        ctx.body = {
            status: "success",
            data: texts,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            status: "error",
            message: error.message,
        };
    }
}

// 添加新名言
async function createNewQuote(ctx) {
    const { text, author } = ctx.request.body;
    try {
        const newQuote = await addNewQuote(text, author);
        ctx.body = {
            status: "success",
            data: newQuote,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            status: "error",
            message: error.message,
        };
    }
}

// 删除名言
async function deleteQuote(ctx) {
    const { id } = ctx.params;
    try {
        const result = await deleteQuoteById(id);
        if (result) {
            ctx.body = {
                status: "success",
                message: "名言删除成功",
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: "error",
                message: "名言未找到",
            };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            status: "error",
            message: error.message,
        };
    }
}

module.exports = {
    fetchAllQuotes,
    createNewQuote,
    deleteQuote,
}; 