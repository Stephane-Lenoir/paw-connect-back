import { Request } from "../models/Request.js";

// Give all Requests in DB
export const getAllRequests = async (req, res) => {
  const requests = await Request.findAll();
  res.json(requests);
};

// Give one request by ID
export const getOneRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  if (isNaN(requestId)) {
    return res.status404.json({
      error: "Request not found. Please verify the provided ID.",
    });
  }

  const request = await Request.findByPk(requestId);

  if (!request) {
    return res
      .status(404)
      .json({ error: "Request not found. Please verify the provided ID." });
  }

  res.json(request);
};

// Add a request
export const addRequest = async (req, res) => {
  const { user_id, animal_id, date } = req.body;

  const createdRequest = await Request.create({
    user_id,
    animal_id,
    date,
  });

  res.status(201).json(`Request created with ID: ${createdRequest.id}`);
};

// Update a request

// Delete a request
