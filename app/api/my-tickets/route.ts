// Darshil - 2 - start
import Ticket from "@/app/models/Ticket";
import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import Show from "@/app/models/Show";
import mongoose from "mongoose";
import User from "@/app/models/User";
import Movie from "@/app/models/Movie";
import Transaction from "@/app/models/Transaction";

connectDB();

type UserDetails = {
  _id: string;
  email: string;
};

type ShowDocument = {
  _id: string;
  movieId: string;
}
type MovieDocument = {
  _id: string;
  title: string;
}

export async function POST(request: NextRequest) {
  try {
    const { type, date, seats, showtime, email, showid, sessionId, seatHolderNames, screen } = await request.json() as {
      type: string;
      date: string;
      seats: string[];
      showtime: string;
      screen: number;
      email: string;
      showid: string;
      sessionId: string;
      seatHolderNames: string[];
    };
    if (!type || !date || !seats || !showtime || !email || !showid || !sessionId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const transaction = await Transaction.findOne({ sessionId });
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const existingTicket = await Ticket.findOne({ transactionId: transaction._id });

    if (existingTicket) {
      return NextResponse.json(
        { error: 'Ticket already exists for this transaction' },
        { status: 409 }
      );
    }
    
    const showId = new mongoose.Types.ObjectId(showid);
    const show = await Show.findById(showId);
    if (!show) {
      return NextResponse.json(
        { error: "Show not found" },
        { status: 404 }
      );
    }
    
    const userEmail = email.toLowerCase();
    const user = await User.findOne({ email : userEmail });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newTicket = new Ticket({
      userId: user._id,
      showId: show._id,
      seatNumbers: seats,
      seatHolderNames,
      showType: type,
      bookingDate: date,
      showTime: showtime,
      screen: screen,
      transactionId: new mongoose.Types.ObjectId(transaction._id),
    });
    console.log(newTicket);
    await newTicket.save();

    return NextResponse.json({ success: true, ticket: newTicket._id }, { status: 201 });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const userObject = cookieStore.get('user_email');

    if (!userObject) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userEncoded = userObject.value;
    const email = Buffer.from(userEncoded, 'base64').toString('utf-8');
    const userDetails = await User.findOne({ email }).lean() as UserDetails;

    if (!userDetails) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userId = userDetails._id;
    const tickets = await Ticket.find({ userId }).lean();

    const ticketsWithShows = await Promise.all(
      tickets.map(async (ticket) => {
        const show = await Show.findById(ticket.showId).lean() as ShowDocument;

        if (!show) {
          return ticket;
        }

        const movie = await Movie.findById(show.movieId).lean() as MovieDocument;
        return {
          ...ticket,
          show: {
            ...show,
            movie: movie ? movie.title : null,
          }
        };
      })
    );

    return NextResponse.json({ success: true, ticketsWithShows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json() as { id: string };

    if (!id) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Ticket deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete ticket" }, { status: 500 });
  }
}
