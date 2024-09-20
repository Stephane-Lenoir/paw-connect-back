import { Animal, User } from "../models/associations.js";

export const getAllAnimals = async (req, res) => {
  // Give all Animals in DB
  const animals = await Animal.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email", "role_id"],
      },
    ],
  });
  res.status(200).json(animals);
};

export const getOneAnimal = async (req, res) => {
  // Give one animal in DB associate to number
  const animalId = parseInt(req.params.id);

  if (isNaN(animalId)) {
    return res.status(404).json({
      error: "Animal not found. Please verify the provided ID.",
    });
  }

  const animal = await Animal.findByPk(animalId);

  if (!animal) {
    return res
      .status(404)
      .json({ error: "Animal not found. Please verify the provided ID." });
  }

  res.status(200).json(animal);
};

export const addAnimal = async (req, res) => {
  let {
    photo,
    name,
    species,
    description,
    race,
    gender,
    location,
    birthday,
    availability,
  } = req.body;

  const userId = req.user.id;

  if (req.file) {
    photo = `/uploads/${req.file.filename}`;
  }

  // const userId = 3;

  const createdAnimal = await Animal.create({
    // ...req.body (same)
    name,
    species,
    description,
    race,
    gender,
    location,
    photo,
    birthday,
    availability,
    user_id: userId,
  });
  res.status(201).json(`Animal ${createdAnimal.name} added successfully`);
};

export const updateAnimal = async (req, res) => {
  const animalId = Number(req.params.id);

  const userId = req.user.id;

  const {
    photo,
    name,
    species,
    description,
    race,
    gender,
    location,
    birthday,
    availability,
  } = req.body;

  const animal = await Animal.findByPk(animalId);

  if (!animal) {
    return res.status(404).json({ error: "Animal not found." });
  }

  // Update photo only if a new file is uploaded
  if (req.file) {
    animal.photo = `/uploads/${req.file.filename}`;
  }
  // If no new file is provided, the existing photo remains unchanged

  // Update the animal's information
  Object.assign(animal, {
    name,
    species,
    description,
    race,
    gender,
    location,
    birthday,
    availability,
    user_id: userId,
  });

  // Save the changes to the database
  await animal.save();
  res.status(200).json(animal);
};

export const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const animal = await Animal.findByPk(id);
  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  await animal.destroy();
  res
    .status(204)
    .json({ message: "Animal deleted successfully", deletedBy: userId });
};

export const getAnimalsByUserId = async (req, res) => {
  const userId = parseInt(req.params.id);
  const animals = await Animal.findAll({
    where: {
      user_id: userId,
    },
  });

  res.status(200).json(animals);
};
