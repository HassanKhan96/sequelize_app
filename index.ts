import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import UserRoutes from "./src/routes/user.routes";
import AuthRoutes from "./src/routes/auth.routes";
import FriendRoutes from "./src/routes/friend.routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "./src/middlewares/passport";

const app: Express = express();

//middlewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
//passport strategies
passport.use("access-token", accessTokenStrategy);
passport.use("refresh-token", refreshTokenStrategy);

//routes
app.use(
  "/user",
  passport.authenticate("access-token", { session: false }),
  UserRoutes
);
app.use("/auth", AuthRoutes);
app.use(
  "/friend",
  passport.authenticate("access-token", { session: false }),
  FriendRoutes
);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
