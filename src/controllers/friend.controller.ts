import { Request, Response } from "express";
import {
  sendRequest,
  acceptRequest,
  getAllFriends,
  declineRequest,
} from "../services";

export const sendFriendRequest = async (request: Request, res: Response) => {
  try {
    const user: any = request?.user;
    const friendId = request.params.id;
    const result = await sendRequest(user?.id, friendId);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const acceptFriendRequest = async (request: Request, res: Response) => {
  try {
    const requestId = request.params.id;
    const result = await acceptRequest(requestId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const declineFriendRequest = async (request: Request, res: Response) => {
  try {
    const requestId = request.params.id;
    const result = await declineRequest(requestId);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getFriends = async (request: Request, res: Response) => {
  try {
    const { id }: any = request?.user;
    const result = await getAllFriends(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
