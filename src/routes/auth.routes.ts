import { Router } from "express";
import passport from "passport";
import * as authUser from "../controllers/auth.controller";
const router = Router();

router.post("/login", authUser.login);
router.post("/register", authUser.register);
router.get("/logout", authUser.logout);
router.get(
  "/refresh",
  passport.authenticate("refresh-token", { session: false }),
  authUser.refreshToken
);

export default router;
