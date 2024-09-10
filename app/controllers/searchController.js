import { Animal } from "../models/associations.js";
import { Op } from "sequelize";

export const searchFilter = async (req, res) => {
  // Get the search param from the body

  const { species, location, gender, availability, race, age } = req.body;

  const searchFilters = {};

  if (species) searchFilters.species = species;
  if (location) searchFilters.location = location;
  if (gender) searchFilters.gender = gender;
  if (availability) searchFilters.availability = availability;
  if (race) searchFilters.race = race;
  if (age) {
    // Get the age from the body and calculate the birthdate
    searchFilters.birthday = {
      [Op.between]: [
        new Date(new Date().setFullYear(new Date().getFullYear() - age - 1)),
        new Date(new Date().setFullYear(new Date().getFullYear() - age)),
      ],
    };
  }

  const filters = await Animal.findAll({ where: searchFilters });
  res.status(200).json(filters);
};
