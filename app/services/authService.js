import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const SALT_ROUNDS = 10;

export const authService = {
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  generateToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
  },

  async register(userData) {
    const role_id = 2;
    if (userData.type === "association") {
      role_id = 3;
    }

    const hashedPassword = await this.hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role_id,
    });
    const token = this.generateToken(user.id);
    return { email: user.email, id: user.id, role_id, token };
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
    const token = this.generateToken(user.id);

    delete user.dataValues.password;
    return { user, token };
  },
};
