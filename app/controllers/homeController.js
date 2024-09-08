import { Animal, User } from "../models/associations.js";

// Displaying 5 animals for the home page available on the road "/"

export const getAllAnimals = async (req, res) => {
  const animals = await Animal.findAll({
    limit: 3,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email", "role_id"],
      },
    ],
  });

  if (!animals) {
    return res.status(404).json("Animals not found");
  }
  res.status(200).json(animals);
};
