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

export const addAnimal = async (req, res) => {
  
  const { photo, name, species, description, race, gender, location, birthday, availability } = req.body;

  
  // console.log(req.user)

  // const userId = req.user.id

  const userId = 3;
  
  
  const createdAnimal = await Animal.create ({
    name, 
    species,
    description,
    race,
    gender,
    location,
    photo,
    birthday,
    availability,
    user_id : userId
  });
  res.status(200).json(`Animal ${createdAnimal.name} ajouté`);
};


export const updateAnimal = async (req, res) => {
  
  const animalId = parseInt(req.params.id);
  
  const { photo, name, species, description, race, gender, location, birthday, availability } = req.body;

  const animal = await Animal.findByPk(animalId);
  
  if (!animal) {
    return res.status(404).json({ error: "Animal not found." });
  }
  if (!name || !description || !availability)
    {
      return res.status(400).json({ error: "Tous les champs obligatoires ne sont pas renseignés" });
    }  
    // Update the animal's information  
    animal.name = name; 
    animal.species = species;
    animal.description = description;
    animal.race = race;
    animal.gender = gender;
    animal.location = location;
    animal.photo = photo;
    animal.birthday = birthday;
    animal.availability = availability;
    // Save the updated animal to the database
    await animal.save();
    res.json(animal);
};


export const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  const animal = await Animal.findByPk(id);
  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  await animal.destroy();
  res.json({ message: "Animal deleted successfully" });
  
}