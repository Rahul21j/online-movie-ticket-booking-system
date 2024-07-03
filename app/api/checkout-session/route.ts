import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
    try {
      const { metadata, ticketQuantity, show, email } = await request.json();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: show.movie,
                images: [show.moviePoster],
              },
              unit_amount: metadata.typePrice*100,
            },
            quantity: ticketQuantity,
          },
        ],
        mode: 'payment',
        success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.get('origin')}/cancel`,
        customer_email: email,
        metadata: metadata,
      });
      return NextResponse.json({ success: true, id: session.id }, { status: 201 });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
}

export async function GET(request: NextRequest){
  try {
    const sessionId = request.url.split('=')[1];
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ session: session }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
