import { User, Role } from "../models/associations.js";

// Method to retrieve association data
export const getAllAssociations = async (req, res) => {
  try {
    const associations = await User.findAll({
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
        where: { name: "association" },
      },
    });
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ error: "An error has occurred." });
  }
};

// Method to retrieve data for a single association
export const getOneAssociation = async (req, res) => {
  const associationId = parseInt(req.params.id);

  if (isNaN(associationId)) {
    return res.status(404).json({
      error: "Association not found. Please verify the provided ID.",
    });
  }
  try {
    const association = await User.findOne({
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
        where: { name: "association" },
      },
      where: { id: associationId },
    });

    if (!association) {
      return res.status(404).json({
        error: "Association not found. Please verify the provided ID.",
      });
    }

    res.status(200).json(association);
  } catch (error) {
    res.status(500).json({ error: "An error has occurred." });
  }
};
