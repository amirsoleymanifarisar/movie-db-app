import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/prisma";

// 1) EXTRACT CONFIG AND EXPORT IT
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await db.user.findUnique({
        where: { email: user.email },
      });

      if (!existing) {
        await db.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }

      return true;
    },
  },
};

// 2) PASS CONFIG INTO NextAuth()
const handler = NextAuth(authOptions);

// 3) EXPORT ROUTE HANDLERS
export { handler as GET, handler as POST };
