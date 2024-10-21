import { Donation, User } from "../models/associations.js";
import stripe from '../utils/stripeConfig.js';


export const createDonation = async (req, res) => {
  const { amount, donorName, donorEmail, message, userId } = req.body;
  
  let donationData = {
    amount,
    donorName,
    donorEmail,
    message,
    status: 'pending'
  };

  if (req.user) {
    donationData.userId = req.user.id;
  } else if (userId) {
    const recipient = await User.findByPk(userId);
    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }
    donationData.userId = userId;
  }

  const donation = await Donation.create(donationData);

  res.status(201).json(donation);
};

export const getDonationsByUser = async (req, res) => {
  const userId = req.user.id;
  console.log("Fetching donations for user:", userId);

  const donations = await Donation.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']]
  });

  console.log("Donations found:", donations);
  res.status(200).json(donations);
};

export const checkSessionStatus = async (req, res) => {
  const { sessionId } = req.params;
  
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
  if (session.payment_status === 'paid') {
    const donationData = {
      amount: session.amount_total / 100,
      donorName: session.metadata.donorName,
      donorEmail: session.metadata.donorEmail,
      message: session.metadata.message,
      status: 'completed',
      stripeSessionId: session.id
    };

    if (session.metadata.userId !== 'anonymous') {
      donationData.userId = parseInt(session.metadata.userId);
    }

    if (session.metadata.associationId) {
      donationData.associationId = parseInt(session.metadata.associationId);
    }

    const donation = await Donation.create(donationData);
    
    res.json({ status: 'success', donationId: donation.id });
  } else {
    res.status(400).json({ status: 'unpaid' });
  }
};

