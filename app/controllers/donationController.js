import { Donation, User } from "../models/associations.js";
import { controllerWrapper } from "../utils/controllerWrapper.js";  

export const createDonation = controllerWrapper(async (req, res) => {
  const { amount, donorName, donorEmail, message, userId } = req.body;
  
  let donationData = {
    amount,
    donorName,
    donorEmail,
    message,
    status: 'pending'
  };

  if (req.user) {
    // Si l'utilisateur est authentifié, utilisez son ID
    donationData.userId = req.user.id;
  } else if (userId) {
    // Si un userId est fourni pour un don anonyme, vérifiez que l'utilisateur existe
    const recipient = await User.findByPk(userId);
    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }
    donationData.userId = userId;
  }

  const donation = await Donation.create(donationData);

  res.status(201).json(donation);
});

export const getDonationsByUser = controllerWrapper(async (req, res) => {
  const userId = req.user.id; // Utilise l'ID de l'utilisateur authentifié
  console.log("Fetching donations for user:", userId);

  const donations = await Donation.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']]
  });

  console.log("Donations found:", donations);
  res.status(200).json(donations);
});