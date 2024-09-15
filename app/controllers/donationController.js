import { Donation, User } from "../models/associations.js";

export const createDonation = async (req, res) => {
  console.log("Requête de don reçue:", req.body);
  try {
    const { amount, donorName, donorEmail, message, userId } = req.body;

    console.log("Recherche de l'utilisateur avec l'ID:", userId);
    const recipient = await User.findByPk(userId);
    if (!recipient) {
      console.log("Utilisateur non trouvé pour l'ID:", userId);
      return res.status(404).json({ error: "Recipient not found" });
    }
    console.log("Utilisateur trouvé:", recipient.name);

    console.log("Création d'un nouveau don");
    const donation = await Donation.create({
      amount,
      donorName,
      donorEmail,
      message,
      userId,
      status: 'pending',
    });

    console.log("Don créé avec succès:", donation);
    res.status(201).json(donation);
  } catch (error) {
    console.error("Erreur lors de la création du don:", error);
    res.status(500).json({ error: "Erreur interne du serveur", details: error.message });
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