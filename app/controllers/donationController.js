import { Donation, User } from "../models/associations.js";
import { controllerWrapper } from "../utils/controllerWrapper.js";  

export const createDonation = controllerWrapper(async (req, res) => {
  const { amount, donorName, donorEmail, message, userId } = req.body;
  
  const recipient = await User.findByPk(userId);
  if (!recipient) {
    return res.status(404).json({ error: "Recipient not found" });
  }

  const donation = await Donation.create({
    amount,
    donorName,
    donorEmail,
    message,
    userId,
    status: 'pending',
  });

  res.status(201).json(donation);
});

export const getDonationsByUser = controllerWrapper(async (req, res) => {
  const userId = req.params.userId;

  const donations = await Donation.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json(donations);
});
