// app/api/service-form/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // NextAuth options
import { connectDB } from "@/lib/mongodb";
import ServiceForm from "@/models/ServiceForm";

export async function POST(req) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Please login before submitting the form" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { serviceSlug, serviceName, formValues } = body; // <-- added serviceName

    if (!serviceSlug || !serviceName || !formValues) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectDB();

    const newForm = new ServiceForm({
      serviceSlug,
      serviceName, // <-- save serviceName
      user: {
        name: session.user.name,
        email: session.user.email,
      },
      formValues,
      createdAt: new Date(),
    });

    const savedForm = await newForm.save();

    return NextResponse.json({
      message: "Form submitted successfully",
      id: savedForm._id,
    });
  } catch (err) {
    console.error("SERVICE FORM ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to view forms." },
        { status: 401 }
      );
    }

    await connectDB();

    const url = new URL(req.url);
    const adminView = url.searchParams.get("admin"); // ?admin=true

    let forms;

    if (session.user.role === "admin" && adminView === "true") {
      // Admin sees ALL forms
      forms = await ServiceForm.find().sort({ createdAt: -1 });
    } else {
      // Regular user sees only their own forms
      forms = await ServiceForm.find({ "user.email": session.user.email }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ forms });
  } catch (err) {
    console.error("SERVICE FORM GET ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    await connectDB();

    const order = await ServiceForm.findById(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Allow deletion if user is admin OR owner of the form
    if (session.user.role !== "admin" && order.user.email !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await order.deleteOne();

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("SERVICE FORM DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
