import { Sequelize } from "sequelize";
import UserModel from "./User.model";

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
db.user = UserModel(sequelize);

db.sequelize.sync();

export default db;
