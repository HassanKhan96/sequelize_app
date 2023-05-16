import { Request, Response } from "express";
import { sendRequest } from "../services";

export const sendFriendRequest = async (request: Request, res: Response) => {
  try {
    const user: any = request?.user;
    const friendId = request.params.id;

    const result = await sendRequest(user?.id, friendId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
