const Router = require("koa-router");
const router = new Router({ prefix: "/bangumi" });

const { getUserInfo, getBangumiCollection } = require("../controller/bangumi/index");

router.get("/userInfo", getUserInfo);
router.post('/collection', getBangumiCollection);

module.exports = router;

