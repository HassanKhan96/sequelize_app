"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class DB {
    constructor() {
        this.db = new sequelize_1.Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
            host: process.env.HOST,
            dialect: "postgres",
        });
        this.db
            .authenticate()
            .then(() => {
            console.log("DB connected successfully..");
        })
            .catch((error) => {
            console.log(error);
        });
    }
    getDbInstance() {
        return this.db;
    }
}
exports.default = DB;
