import { Association } from "sequelize";
import { User, Role } from "../models/associations.js";

export const getAllAssociations = async (req, res) => {
  try {
    const associations = await User.findAll({
      // SELECT * FROM "user" JOIN "role" ON "user"."role_id" = "role"."id"WHERE "role"."name" = 'association';
      include: {
        model: Role,
        as: "role",
        where: { name: "association" },
      },
    });
    res.json(associations);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
};

export const getOneAssociation = async (req, res) => {
  try {
    const association = await User.findOne({
      include: {
        model: Role,
        as: "role",
        where: { name: "association" },
      },
      where: { id: req.params.id },
    });
    res.json(association);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
};
