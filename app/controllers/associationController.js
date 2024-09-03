import { Association } from "sequelize";
import { User, Role } from "../models/associations.js";

// Method to retrieve association data
export const getAllAssociations = async (req, res) => {
  try {
    const associations = await User.findAll({
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

// Method to retrieve data for a single association
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
