import stripe from '../utils/stripeConfig.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { Donation } from '../models/associations.js';

export const createStripeSession = controllerWrapper(async (req, res) => {
  const { amount, userId, donorName, donorEmail, message, associationId } = req.body;

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
    success_url: `${process.env.FRONTEND_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/donations`,
    client_reference_id: userId || 'anonymous',
    metadata: {
      donorName,
      donorEmail,
      message,
      associationId,
      userId: userId || 'anonymous'  // Assurez-vous que ceci est toujours défini
    }
  });

  res.json({ id: session.id });
});

export const checkSessionStatus = controllerWrapper(async (req, res) => {
  const { sessionId } = req.params;
  
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
  if (session.payment_status === 'paid') {
    const donationData = {
      amount: session.amount_total / 100,
      donorName: session.metadata.donorName,
      donorEmail: session.metadata.donorEmail,
      message: session.metadata.message,
      userId: session.metadata.userId !== 'anonymous' ? session.metadata.userId : null,
      associationId: session.metadata.associationId,
      status: 'completed',
      stripeSessionId: session.id
    };

    // Si userId est null et que votre modèle ne permet pas de valeurs null pour ce champ,
    // vous pouvez définir une valeur par défaut ou omettre le champ
    if (!donationData.userId) {
      // Option 1: Définir une valeur par défaut
      donationData.userId = 0; // Ou une autre valeur par défaut appropriée
      // Option 2: Omettre le champ (décommentez la ligne suivante si vous choisissez cette option)
      // delete donationData.userId;
    }  

    const donation = await Donation.create(donationData);
    
    res.json({ status: 'success', donation: donation });
  } else {
        res.status(400).json({ status: 'unpaid' });
  }
});