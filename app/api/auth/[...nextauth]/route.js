// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { isAdminEmail } from "@/utils/isAdminEmail";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // 🔵 SAVE USER + ROLE TO DB
    async signIn({ user, account }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          role: isAdminEmail(user.email) ? "admin" : "user",
        });
      } else {
        const correctRole = isAdminEmail(user.email) ? "admin" : "user";

        if (existingUser.role !== correctRole) {
          existingUser.role = correctRole;
          await existingUser.save();
        }
      }

      return true;
    },

    // 🔵 FIX: ADD ROLE TO JWT (IMPORTANT FOR MIDDLEWARE)
    async jwt({ token, user }) {
      if (user) {
        // Load role from DB
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        token.role = dbUser ? dbUser.role : "user";
      }
      return token;
    },

    // 🔵 RETURN COMPLETE SESSION (CLIENT SIDE)
    async session({ session, token }) {
      session.user.role = token.role;       // role from JWT
      session.user.id = token.sub;          // id from JWT
      return session;
    },

    // Redirect after login
    async redirect() {
      return "/dashboard";
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
