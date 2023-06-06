import { findUserById } from "./user.services";
import db from "../models";
import { Op, QueryTypes } from "sequelize";
import FriendListModel from "../models/FriendList.model";

export const sendRequest = async (userId: string, friendId: string) => {
  const user = await findUserById(userId);
  const friend = await findUserById(friendId);
  await user.addUser(friend);
  return await user.getUser();
};

export const acceptRequest = async (requestId: string) => {
  const request = await db.friendList.update(
    { status: true },
    { where: { id: requestId }, returning: true }
  );
  return request;
};

export const declineRequest = async (requestId: string) => {
  const request = await db.friendList.destroy({
    where: {
      [Op.and]: [
        {
          id: requestId,
        },
        {
          status: false,
        },
      ],
    },
  });

  return request;
};

export const getAllFriends = async (id: string) => {
  const result = await db.sequelize.query(
    `SELECT u.id, u."firstName", u."lastName", u.email, u.avatar FROM users u WHERE u.id IN
    (SELECT f.user_id2 as user_id FROM friend_lists f WHERE f.user_id1 = :id
    UNION SELECT f.user_id1 as user_id FROM friend_lists f WHERE f.user_id2 = :id)`,
    {
      replacements: {
        id,
      },
      type: QueryTypes.SELECT,
    }
  );
  return result;
};
