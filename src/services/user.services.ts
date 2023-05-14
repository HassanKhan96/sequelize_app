import db from "../models";

export const createUser = async (input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const result = await db.user.create(input);
  return result;
};

export const findAllUsers = async () => {
  const result = await db.user.findAll({
    attributes: { exclude: ["password"] },
  });
  return result;
};

export const findUserById = async (id: string) => {
  const result = await db.user.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return result;
};

export const findUserByEmail = async (email: string) => {
  try {
    const result = await db.user.findOne({
      where: { email },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (id: string) => {
  const result = await db.user.destroy({ where: { id } });
  return result;
};

export const updateUserById = async (id: string, updates: Body) => {
  const result = await db.user.update(updates, {
    where: { id },
    returning: true,
  });

  return result;
};
