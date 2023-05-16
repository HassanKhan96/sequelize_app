import { findUserById } from "./user.services";

export const sendRequest = async (userId: string, friendId: string) => {
  const user = await findUserById(userId);
  const friend = await findUserById(friendId);
  user.addFriend(friend);
  return user.getFriend();
};
