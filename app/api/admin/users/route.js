import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// ✅ GET: Fetch all users
export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const users = await User.find().sort({ createdAt: -1 });

  return NextResponse.json(users, { status: 200 });
}

// ✅ DELETE USER
export async function DELETE(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const { id } = await req.json();

  await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "User deleted successfully!" });
}
