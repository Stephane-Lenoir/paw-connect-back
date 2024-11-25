import { Donation, User } from "../models/associations.js";
import stripe from '../utils/stripeConfig.js';
import redisClient from '../utils/redisConfig.js';

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

  try {
    // Créer une session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Donation',
            },
            unit_amount: amount * 100, // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/donation-cancel`,
      metadata: {
        donorName,
        donorEmail,
        message,
        userId: req.user ? req.user.id : 'anonymous'
      }
    });

    // Stocker les informations de la session dans Redis
    await redisClient.set(`stripe_session:${session.id}`, JSON.stringify(donationData));

    res.status(201).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'An error occurred while creating the Stripe session' });
  }
};

export const checkSessionStatus = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Récupérer les informations de la session depuis Redis
    const donationDataJSON = await redisClient.get(`stripe_session:${sessionId}`);
    if (!donationDataJSON) {
      return res.status(404).json({ error: 'Session not found' });
    }
    const donationData = JSON.parse(donationDataJSON);

    // Vérifier le statut de la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      // Mettre à jour le statut de la donation dans la base de données
      const donation = await Donation.create({
        ...donationData,
        status: 'completed',
        stripeSessionId: session.id
      });
      res.json({ status: 'success', donationId: donation.id });
    } else {
      res.status(400).json({ status: 'unpaid' });
    }
  } catch (error) {
    console.error('Error checking Stripe session status:', error);
    res.status(500).json({ error: 'An error occurred while checking the Stripe session status' });
  }
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