import Ticket from "@/app/models/Ticket";
import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import Show from "@/app/models/Show";
import mongoose from "mongoose";
import User from "@/app/models/User";

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
      const showId = new mongoose.Types.ObjectId(showid);
      const show = await Show.findById(showId);
      const user = await User.findOne({ email });

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
    const cookies = parse(request.headers.get("cookie") || "");
    const userId = cookies.userId;
    console.log(request.headers);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const tickets = await Ticket.find({ userId });

    return NextResponse.json({ success: true, tickets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function handler(request: NextRequest) {
  if (request.method === "POST") {
    return POST(request);
  } else if (request.method === "GET") {
    return GET(request);
  } else {
    return NextResponse.json(
      { error: `Method ${request.method} Not Allowed` },
      { status: 405 }
    );
  }
}
