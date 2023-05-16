import { Sequelize } from "sequelize";
import UserModel from "./User.model";
import FriendListModel from "./FriendList.model";

const sequelize: Sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASS as string,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("DB successfully connected"))
  .catch((error) => console.log(error));

let db: any = {};

db.sequelize = sequelize;
const User = UserModel(sequelize);
const FriendList = FriendListModel(sequelize);

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
db.sequelize.sync().catch((error: Error) => console.log(error));

export default db;
