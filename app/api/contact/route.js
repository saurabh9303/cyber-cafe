import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ name, email, phone, subject, message });

    return new Response(
      JSON.stringify({ success: true, data: newContact }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to save contact" }),
      { status: 500 }
    );
  }
}

// ---------------- GET ----------------
export async function GET(req) {
  try {
    await connectDB();

    // Optional: Only allow admin to fetch all contacts
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ contacts }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch contacts" }),
      { status: 500 }
    );
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Contact ID required" }),
        { status: 400 }
      );
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return new Response(
        JSON.stringify({ error: "Contact not found" }),
        { status: 404 }
      );
    }

    await Contact.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Contact deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete contact" }),
      { status: 500 }
    );
  }
}
