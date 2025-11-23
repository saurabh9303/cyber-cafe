import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ message: "Date is required" }, { status: 400 });
    }

    const bookings = await Booking.aggregate([
      { $match: { date } },
      { $group: { _id: null, totalBooked: { $sum: "$computersBooked" } } },
    ]);

    const totalBooked = bookings[0]?.totalBooked || 0;
    const AVAILABLE = 50;
    const remaining = AVAILABLE - totalBooked;

    return NextResponse.json(
      {
        date,
        totalBooked,
        available: remaining,
        totalComputers: AVAILABLE,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}