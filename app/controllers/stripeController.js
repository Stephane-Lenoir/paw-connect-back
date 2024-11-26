import stripe from '../utils/stripeConfig.js';
import { Donation } from '../models/associations.js';

export const createStripeSession = async (req, res) => {
  const { amount, userId, donorName, donorEmail, message, associationId } = req.body;

  try {
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
      client_reference_id: userId || 'anonymous',
      metadata: {
        donorName,
        donorEmail,
        message,
        associationId,
        userId: userId || 'anonymous',
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'An error occurred while creating the Stripe session' });
  }
};

export const checkSessionStatus = async (req, res) => {
  const { sessionId } = req.params;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      const donationData = {
        amount: session.amount_total / 100,
        donorName: session.metadata.donorName,
        donorEmail: session.metadata.donorEmail,
        message: session.metadata.message,
        associationId: session.metadata.associationId,
        status: 'completed',
        stripeSessionId: session.id
      };

      if (session.metadata.userId && session.metadata.userId !== 'anonymous') {
        donationData.userId = parseInt(session.metadata.userId);
      }

      const donation = await Donation.create(donationData);
      
      res.json({ status: 'success', donation: donation });
    } else {
      res.status(400).json({ status: 'unpaid' });
    }
  } catch (error) {
    console.error('Error checking session status:', error);
    res.status(500).json({ error: 'An error occurred while checking the session status' });
  }
};