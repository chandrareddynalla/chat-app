import jwt from "jsonwebtoken";

export const signToken = (payload, secret, expiresIn = "7d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
