import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const SALT_ROUNDS = 10;

export const authService = {
  // Use library bcrypt for the hashing
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },

  // Use library bcrypt for compare
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  // Use jwt for the token generation
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
    return { user: { email: user.email, id: user.id, role_id } };
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } }); // ajouter le rôle
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const token = this.generateToken(user.id); // user.role_id, user.role_id.name => a verifier

    delete user.dataValues.password;
    return { user, token };
  },

  logout() {
    return true;
  },
};
