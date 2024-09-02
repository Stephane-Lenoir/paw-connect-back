import { Animal } from "../models/Animal.js";

export const getAllAnimals = async (req, res) => {
  // Give all Animals in DB
  const animals = await Animal.findAll();
  res.json(animals);
};

export const getOneAnimal = async (req, res) => {
  // Give one animal in DB associate to number
  const animalId = parseInt(req.params.id);

  if (isNaN(animalId)) {
    return res.status404.json({
      error: "Animal not found. Please verify the provided ID.",
    });
  }

  const animal = await Animal.findByPk(animalId);

  if (!animal) {
    return res
      .status(404)
      .json({ error: "Animal not found. Please verify the provided ID." });
  }

  res.json(animal);
};
