import Ticket from "@/app/models/Ticket";
import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import Show from "@/app/models/Show";
import mongoose from "mongoose";
import User from "@/app/models/User";
import Movie from "@/app/models/Movie";

connectDB();

export async function POST(request: NextRequest) {
  if (request.method === "POST") {
    try {
        const { type, date, seats, showtime, email, showid } =
        await request.json();
        if (!type || !date || !seats || !showtime || !email) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }
      const userEmail = email.toLowerCase();
      const showId = new mongoose.Types.ObjectId(showid);
      const show = await Show.findById(showId);
      const user = await User.findOne({ email : userEmail });
      const newTicket = new Ticket({
        userId: user._id,
        showId: show._id,
        seatNumbers: seats,
        showType: type,
        bookingDate: date,
        showTime: showtime,
      });

        await newTicket.save();

      return NextResponse.json({ success: true, ticket: {} }, { status: 201 });
    } catch (error) {
      console.error("Error booking ticket:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {

    const cookieStore = cookies();
    const userObject = cookieStore.get('user_email');
    const userEncoded = userObject.value;
    const email = Buffer.from(userEncoded, 'base64').toString('utf-8');

    const userDetails = await User.findOne({ email }).lean();
    const userId = userDetails._id;

    const tickets = await Ticket.find({ userId }).lean();

    console.log(tickets);

    const ticketsWithShows = await Promise.all(tickets.map(async ticket => {
      const show = await Show.findById(ticket.showId).lean();

      const movie = await Movie.findById(show.movieId).lean();
      return {
        ...ticket,
        show: {
          ...show,
          movie: movie.title,
        }
      };
    }));
    console.log(ticketsWithShows)
    return NextResponse.json({ success: true, ticketsWithShows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  if (request.method === "DELETE") {
    try {
      const body = await request.json();
      const id = body['id'];
      await Ticket.findByIdAndDelete(id);
      console.log("Success")
      return NextResponse.json({ success: true, message: "Ticket deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, message: "Failed to delete ticket" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
  }
}
export async function handler(request: NextRequest) {
  if (request.method === "POST") {
    return POST(request);
  } else if (request.method === "GET") {
    return GET(request);
  }
  else if (request.method === "DELETE") {
    return DELETE(request, response);
  } 
  else {
    return NextResponse.json(
      { error: `Method ${request.method} Not Allowed` },
      { status: 405 }
    );
  }
}
