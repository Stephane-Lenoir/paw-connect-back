import { User, Role, Request, Animal } from "../models/associations.js";

// Method to retrieve association data
export const getAllAssociations = async (req, res) => {
  const associations = await User.findAll({
    attributes: { exclude: ["password"] },
    include: {
      model: Role,
      as: "role",
      where: { id: 3 },
    },
  });
  res.status(200).json(associations);
};

// Method to retrieve data for a single association
export const getOneAssociation = async (req, res) => {
  const associationId = parseInt(req.params.id);

  if (isNaN(associationId)) {
    return res.status(404).json({
      error: "Association not found. Please verify the provided ID.",
    });
  }
  const association = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: associationId },
    include: [
      {
        model: Role,
        as: "role",
        where: { id: 3 },
      },
      // {
      //   model: Request,
      //   as: "requests",
      //   where: { status: "En attente" },
      //   include: [
      //     {
      //       model: Animal,
      //       as: "request",
      //     },
      //   ],
      // },
    ],
  });

  if (!association) {
    return res.status(404).json({
      error: "Association not found. Please verify the provided ID.",
    });
  }

  res.status(200).json(association);
};
