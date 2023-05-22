import { Router } from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
} from "../controllers";

const router = Router();

router.get("/", getFriends);
router.post("/send-request/:id", sendFriendRequest);
router.patch("/accept-request/:id", acceptFriendRequest);

export default router;
