import Ticket from '@/app/models/Ticket'; 
import connectDB from '@/config/connectDB';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    try {
        connectDB();

      const { userId, showId, seatNumbers, showType, movie } = await request.json();

      if (!userId || !showId || !seatNumbers || !showType || !movie) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }

      const newTicket = new Ticket({
        userId,
        showId,
        seatNumbers,
        showType,
      });

      await newTicket.save();

      return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
    } catch (error) {
      console.error('Error booking ticket:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}

export async function handler(request: NextRequest) {
    if (request.method === 'POST') {
      return POST(request);
    } else {
      return NextResponse.json({ error: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
  }