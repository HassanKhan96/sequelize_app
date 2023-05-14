import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
} from "../services/user.services";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await findAllUsers();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await findUserById(id);

    if (!result) return res.status(404).send("user not found");

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteUserById(id);

    if (!result) throw new Error("Cannot delete user.");

    return res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.body) return res.status(400).send("Bad request.");

    const result = await updateUserById(id, req.body);

    if (!result.length) throw new Error("Sorry cannot update user");

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
