import { Router } from "express";
import * as userRoute from "../controllers/user.controller";

const router = Router();

router.post("/", userRoute.addUser);
router.get("/", userRoute.getUsers);
router.get("/:id", userRoute.getUserById);

export default router;
