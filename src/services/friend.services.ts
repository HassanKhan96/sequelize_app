import { findUserById } from "./user.services";
import db from "../models";
import FriendListModel from "../models/FriendList.model";

export const sendRequest = async (userId: string, friendId: string) => {
  const user = await findUserById(userId);
  const friend = await findUserById(friendId);
  user.addUser(friend);
  return await user.getUser();
};

export const acceptRequest = async (requestId: string) => {
  const request = await db.friendList.update(
    { status: true },
    { where: { id: requestId }, returning: true }
  );
  return request;
};

export const getAllFriends = async (id: string) => {
  const user = await findUserById(id);
  const friends = await user.getUser();
  return friends;
};
