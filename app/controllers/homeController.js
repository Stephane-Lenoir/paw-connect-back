import {Animal} from "../models/Animal.js";

// Displaying 5 animals for the home page available on the road "/"

export const getAllAnimals = async (req,res) => {
    const animals = await Animal.findAll({limit:5});

    if(!animals) {
        return res.status(404).json('Aucun Animal dans la base de donné');
    }
    res.status(200).json(animals)
}
