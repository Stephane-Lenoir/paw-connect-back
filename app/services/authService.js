import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const SALT_ROUNDS = 10;

const ROLE_MEMBER = 2;
const ROLE_ASSOCIATION = 3;

const parseDuration = (duration) => {
  // Takes the last character as the unit
  const unit = duration.slice(-1);
  // Takes all characters except the last one and converts them to a number
  const value = parseInt(duration.slice(0, -1));

  // Converts to seconds according to the unit
  switch (unit) {
    case "d":
      return value * 24 * 60 * 60;
    case "h":
      return value * 60 * 60;
    case "m":
      return value * 60;
    case "s":
      return value;
    default:
      return 24 * 60 * 60;
  }
};

export const authService = {
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  generateToken(user) {
    const { id, role_id } = user;
    return jwt.sign({ id, role_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
  },

  async register(userData) {
    let role_id =
      userData.isAssociation === "Oui" ? ROLE_ASSOCIATION : ROLE_MEMBER;

    const hashedPassword = await this.hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role_id,
    });
    return { user: { email: user.email, id: user.id, role_id } };
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = "Bearer " + this.generateToken(user);

    delete user.dataValues.password;

    const expirationTime =
      Date.now() + parseDuration(JWT_EXPIRATION_TIME) * 1000;

    return { user, token, expirationTime };
  },
};
