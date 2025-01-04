/*
 * @Author: M
 * @Date: 2023-10-10
 * @Description: 名言数据库模型
 */

const { DataTypes } = require('sequelize');
const { Sequelize } = require("sequelize");
var moment = require("moment");

const seq = require('../../db/seq');

const Quote = seq.define('blog_quote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '名言内容',
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '名言作者',
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss");
        },
    },
}, {
    freezeTableName: true,
});
// Quote.sync({ alter: true }); //创建数据表

module.exports = Quote; 