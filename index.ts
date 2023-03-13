import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import UserRoute from "./src/routes/user.routes";

const app: Express = express();

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/user", UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
