import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized! Please login first." },
      { status: 401 }
    );
  }

  const { date, days, computersBooked, sessionStart, sessionEnd } = await req.json();

  const booking = await Booking.create({
    date,
    days,
    computersBooked,
    sessionStart,
    sessionEnd,
    userId: session.user.id,
    userName: session.user.name,
    userEmail: session.user.email,
  });

  return NextResponse.json(
    { message: "Booking successful!", booking },
    { status: 200 }
  );
}

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const onlyUser = url.searchParams.get("user");

    let bookings;

    if (session.user.role === "admin") {
      
      bookings = await Booking.find().sort({ createdAt: -1 });
    } else {
      
      bookings = await Booking.find({ userEmail: session.user.email }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ bookings }, { status: 200 });

  } catch (err) {
    console.error("GET /api/computer/book error:", err);
    return NextResponse.json(
      { message: "Server error while fetching bookings" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

   
    if (session.user.role !== "admin" && booking.userEmail !== session.user.email) {
      return NextResponse.json(
        { message: "You are not allowed to delete this booking" },
        { status: 403 }
      );
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Booking deleted successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("DELETE /api/computer/book error:", err);
    return NextResponse.json(
      { message: "Server error while deleting booking" },
      { status: 500 }
    );
  }
}
