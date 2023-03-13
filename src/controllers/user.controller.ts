import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import db from "../models";
import { hashPassword } from "../utils/password.utils";

export const addUser = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    const hash = await hashPassword(password);
    const result = db.user.build({
      firstName,
      lastName,
      email,
      password: hash,
    });
    await result.save();

    const { password: p, ...userData } = result.toJSON();
    if (result) res.status(201).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
    const result = await db.user.findByPK(id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
