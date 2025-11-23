// /models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  date: String,
  days: Number,
  computersBooked: Number,

  sessionStart: String,
  sessionEnd: String,

  // session details
  userId: String,
  userName: String,
  userEmail: String,
  
}, { timestamps: true });


export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);

