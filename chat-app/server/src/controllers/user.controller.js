import { User } from "../models/User.js";

export const listUsers = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const users = await User.find(query).select("name email avatar status presence lastSeen");
    res.json({ users });
  } catch (err) {
    next(err);
  }
};
