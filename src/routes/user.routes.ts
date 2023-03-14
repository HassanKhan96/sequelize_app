import { Router } from "express";
import * as userRoute from "../controllers/user.controller";

const router = Router();

router.get("/", userRoute.getUsers);
router.get("/:id", userRoute.getUserById);
router.delete("/:id", userRoute.deleteUser);
router.patch("/:id", userRoute.updateUser);

export default router;
