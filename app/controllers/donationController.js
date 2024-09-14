import { Donation, User } from "../models/associations.js";

export const createDonation = async (req, res) => {
  console.log("createDonation controller called with body:", req.body);
  const { amount, donorName, donorEmail, message, userId } = req.body;

  try {
    console.log("Looking for recipient with userId:", userId);
    const recipient = await User.findByPk(userId);
    if (!recipient) {
      console.log("Recipient not found for userId:", userId);
      return res.status(404).json({ error: "Recipient not found" });
    }
    console.log("Recipient found:", recipient.name);

    console.log("Creating new donation");
    const donation = await Donation.create({
      amount,
      donorName,
      donorEmail,
      message,
      user_id: userId,
      status: 'pending',
    });

    console.log("Donation created successfully:", donation);
    res.status(201).json(donation);
  } catch (error) {
    console.error("Error in createDonation:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getDonationsByUser = async (req, res) => {
  const userId = req.params.userId;
  console.log("getDonationsByUser called for userId:", userId);

  try {
    const donations = await Donation.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
    });

    console.log(`Found ${donations.length} donations for user ${userId}`);
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error in getDonationsByUser:", error);
    res.status(400).json({ error: error.message });
  }
};