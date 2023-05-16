"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const FriendList_model_1 = __importDefault(require("./FriendList.model"));
const sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
});
sequelize
    .authenticate()
    .then(() => console.log("DB successfully connected"))
    .catch((error) => console.log(error));
let db = {};
db.sequelize = sequelize;
const User = (0, User_model_1.default)(sequelize);
const FriendList = (0, FriendList_model_1.default)(sequelize);
User.belongsToMany(User, {
    as: "UserId",
    through: FriendList,
    foreignKey: "userId1",
});
User.belongsToMany(User, {
    as: "Friend",
    through: FriendList,
    foreignKey: "userId2",
});
db.user = User;
db.sequelize.sync().catch((error) => console.log(error));
exports.default = db;
