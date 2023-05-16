import { DataTypes, Sequelize } from "sequelize";

export = (sequelize: Sequelize) => {
  const FriendList = sequelize.define(
    "friend_list",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return FriendList;
};
