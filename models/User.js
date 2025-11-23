import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    provider: String,
    role: {
      type: String,
      default: "user", // "user" or "admin"
    },
  },
  { timestamps: true } // ✅ THIS ENABLES createdAt & updatedAt
);

export default mongoose.models.User || mongoose.model("User", UserSchema);


