import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const SALT_ROUNDS = 10;

// On défini les roles en constantes
const ROLE_MEMBER = 2;
const ROLE_ASSOCIATION = 3;

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
    let role_id =
      userData.isAssociation === "Oui" ? ROLE_ASSOCIATION : ROLE_MEMBER;

    // Par défaut, on considère que c'est un membre standard
    // let role_id = ROLE_MEMBER;

    // Vérifier si l'utilisateur est une association
    // if (userData.isAssociation === "Oui") {

    // Si oui, on change le rôle pour association
    //   role_id = ROLE_ASSOCIATION;
    // }

    const hashedPassword = await this.hashPassword(userData.password);
    const user = await User.create({
      ...userData, // correspond à userData.name, userData.firstname, userData.email, userData.password, userData.role_id
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
};
