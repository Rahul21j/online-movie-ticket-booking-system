import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/config/connectDB";
import Transaction from '@/app/models/Transaction';
import User from '@/app/models/User';

connectDB();

type MetaData = {
    type: string;
    date: string;
    seats: string;
    showtime: string;
    email: string;
    showid: string;
    movie: string;
    ticketHolderNames: string;
};
type SaveTransactionRequest = {
    sessionId: string;
    created: string;
    currency: string;
    amount_total: number;
    customer_details: object; 
    customer_email: string;
    expires_at: string;
    metadata: MetaData;
    mode: string;
    payment_intent: string;
    payment_method_options: object;
    payment_method_types: string[];
    payment_status: string;
    status: string;
  }

  
export async function POST(req: NextRequest, res: NextResponse) {

    try {
      const data: SaveTransactionRequest = await req.json();
      const transactionExists = await Transaction.findOne({ sessionId: data.sessionId });
      const user = await User.findOne({ email : data.metadata.email });

      if (transactionExists) {
        return NextResponse.json({ success: false, message: 'Transaction already exists' }, { status: 409 });
      }
      console.log(data);
      const transaction = new Transaction({
        userId: user._id,
        sessionId: data.sessionId,
        created: data.created,
        currency: data.currency,
        amount_total: data.amount_total / 100,
        customer_details: data.customer_details,
        customer_email: data.metadata.email,
        expires_at: data.expires_at,
        metadata: {
          ...data.metadata,
          seats: data.metadata.seats.split(","),
          ticketHolderNames: data.metadata.ticketHolderNames.split(","),
        },
        mode: data.mode,
        payment_intent: data.payment_intent,
        payment_method_options: data.payment_method_options,
        payment_method_types: data.payment_method_types,
        payment_status: data.payment_status,
        status: data.status,
      });
      console.log(transaction);
      await transaction.save();

    return NextResponse.json({ success: true, message: 'Transaction saved successfully' }, { status: 201 });
    } catch (error) {
      console.error('Error saving transaction:', error);
      return NextResponse.json(
      { error: "Internal server error. Error Saving Transaction." },
      { status: 500 }
    );
    }
}
