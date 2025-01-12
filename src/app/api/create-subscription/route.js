// pages/api/create-subscription.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, { params }) {
  const { paymentMethodId, priceId, email } = await req.json();

  try {
    // Cherche un client existant basé sur l'email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;

    if (existingCustomers.data.length > 0) {
      // Utilise le client existant
      // customer = existingCustomers.data[0];
      // // Met à jour le client existant avec le nom (si nécessaire)
      // await stripe.customers.update(customer.id, {
      //   name: name,
      // });
    } else {
      // Crée un nouveau client si aucun n'existe
      customer = await stripe.customers.create({
        email: email,
      });
    }

    // Attache le PaymentMethod au client
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Met à jour le client avec le PaymentMethod par défaut
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Crée un abonnement pour le client
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
      // cancel_at_period_end: true,
    });

    return new NextResponse(
      JSON.stringify(
        {
          clientSecret:
            subscription.latest_invoice.payment_intent.client_secret,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: error.message,
        },
        { status: 500 }
      )
    );
  }
}
