import { Router } from "express";
import { sendFriendRequest } from "../controllers";

const router = Router();

router.post("/sendRequest/:id", sendFriendRequest);

export default router;
