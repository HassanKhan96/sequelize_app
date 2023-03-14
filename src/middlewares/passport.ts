import { Request } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export const accessTokenStrategy = new Strategy(
  {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (token, done) => {
    try {
      done(null, token.data);
    } catch (error) {
      done(error);
    }
  }
);

export const refreshTokenStrategy = new Strategy(
  {
    secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([
      (request: Request) => {
        const refreshToken = request.cookies?.refreshToken;
        return refreshToken;
      },
    ]),
  },
  (token, done) => {
    try {
      done(null, token.data);
    } catch (error) {
      done(error);
    }
  }
);
