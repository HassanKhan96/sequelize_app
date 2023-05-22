import { sign, verify } from "jsonwebtoken";

export const getAccessToken = (data: any) => {
  const accessToken = sign(
    { data },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "30d" }
  );
  return accessToken;
};

export const getRefreshToken = (data: any) => {
  const refreshToken = sign(
    { data },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    return payload;
  } catch (error) {
    return error;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    return payload;
  } catch (error) {
    return error;
  }
};
