import { Animal } from "../models/Animal.js";

export const searchFilter = async (req, res) => {
  // Get the search param from the body

  const { species, location, gender, availability, race } = req.body;

  const searchFilters = {};

  if (species) searchFilters.species = species;
  if (location) searchFilters.location = location;
  if (gender) searchFilters.gender = gender;
  if (availability) searchFilters.availability = availability;
  if (race) searchFilters.race = race;

  const filters = await Animal.findAll({ where: searchFilters });
  res.json(filters);
};
