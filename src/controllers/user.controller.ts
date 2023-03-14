import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import db from "../models";
import { hashPassword } from "../utils/password.utils";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await db.user.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.user.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

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

    const result = db.user.destroy({ where: { id } });
    if (result) res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.body) return res.status(400).send("Bad request.");

    const result = await db.user.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    });

    if (!result.length) throw new Error("Sorry cannot update user");
    const { password, ...updatedData } = result[1].toJSON();
    return res.status(200).send(updatedData);
  } catch (error) {
    res.status(500).send(error);
  }
};
