import { Association } from "sequelize";
import { Request, User, Animal } from "../models/associations.js";

// Give all Requests in DB
export const getAllRequests = async (req, res) => {
  const requests = await Request.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Animal,
        as: "animal",
        attributes: ["name"],
      },
    ],
  });
  res.status(200).json(requests);
};

// Give one request by ID
export const getOneRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  if (isNaN(requestId)) {
    return res.status(404).json({
      error: "Request not found. Please verify the provided ID.",
    });
  }

  const request = await Request.findByPk(requestId);

  if (!request) {
    return res
      .status(404)
      .json({ error: "Request not found. Please verify the provided ID." });
  }

  res.status(200).json(request);
};

// Add a request
export const addRequest = async (req, res) => {
  const { animal_id, date } = req.body;
  const user_id = req.user.id;

  const createdRequest = await Request.create({
    user_id,
    animal_id,
    date,
  });

  res.status(201).json(`Request created with ID: ${createdRequest.id}`);
};

// Update a request
export const updateRequestStatus = async (req, res) => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;

  const stateStatus = ["Acceptée", "Refusée"];

  // Vérification du statut
  if (status !== stateStatus[0] && status !== stateStatus[1]) {
    return res
      .status(400)
      .json({ error: "The status must be 'Acceptée' or 'Refusée'" });
  }

  const request = await Request.findByPk(requestId);

  if (!request) {
    return res
      .status(404)
      .json({ error: "Request not found. Please verify the provided ID." });
  }

  await request.update({ status });

  res.status(200).json(request);
};

// Delete a request
export const deleteRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await Request.findByPk(requestId);

  if (!request) {
    return res
      .status(404)
      .json({ error: "Request not found. Please verify the provided ID." });
  }

  await request.destroy();

  res.status(204).json({ message: "Request deleted" });
};
