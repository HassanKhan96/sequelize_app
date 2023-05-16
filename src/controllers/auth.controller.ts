import { Request, Response } from "express";
import { getAccessToken, getRefreshToken } from "../utils/jwt.utils";
import { hashPassword, verifyPassword } from "../utils/password.utils";
import { findUserByEmail, createUser } from "../services";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await findUserByEmail(email);
    if (!user) throw new Error();

    await verifyPassword(password, user.password);

    const { refreshToken, accessToken, userInfo } = createLoginResponse(
      user.toJSON()
    );

    res.cookie("refreshToken", refreshToken, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "Logged in successfully", user: userInfo, accessToken });
  } catch (error) {
    res.status(500).send({ message: "Incorrect email or password" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const userExists = await findUserByEmail(email);
    if (userExists) return res.status(409).send("email address already in use");

    const hash = await hashPassword(password);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hash as string,
    });

    const { refreshToken, accessToken, userInfo } = createLoginResponse(
      newUser.toJSON()
    );

    res.cookie("refreshToken", refreshToken, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(201).send({ user: userInfo, accessToken });
  } catch (error) {
    res.status(500).send({ message: "Error, cannot create user", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  res.status(200).send({ message: "Logged out successfully" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const user: any = req.user;
  const accessToken = getAccessToken({
    id: user?.id,
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  res.status(200).send({ accessToken });
};

const createLoginResponse = (user: any) => {
  const accessToken = getAccessToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const refreshToken = getRefreshToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const { password: pass, ...userInfo } = user;
  return { userInfo, accessToken, refreshToken };
};
