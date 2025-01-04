const Router = require("koa-router");
const router = new Router({ prefix: "/typed" });

const { fetchAllQuotes, createNewQuote, deleteQuote } = require("../controller/typed/index");
/**
   * @swagger
   * /quotes:
   *   get:
   *     summary: 获取所有名言
   *     tags: [Quote]
   *     responses:
   *       200:
   *         description: 成功获取
   */
// 获取所有名言
router.get("/quotes", fetchAllQuotes);

// 添加新名言
router.post("/quotes", createNewQuote);

// 删除名言
router.delete("/quotes/:id", deleteQuote);

module.exports = router;