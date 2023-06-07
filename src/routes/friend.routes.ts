import { Router } from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
  declineFriendRequest,
  unFriendUser,
} from "../controllers";

const router = Router();

router.get("/", getFriends);
router.post("/send-request/:id", sendFriendRequest);
router.delete("/decline/:id", declineFriendRequest);
router.patch("/accept-request/:id", acceptFriendRequest);
router.delete("/unfriend/:id", unFriendUser);

export default router;
