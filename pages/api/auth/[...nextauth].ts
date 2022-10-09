import NextAuth, { User } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@lib/prisma";

type CredentialsProps = {
  email: string;
  password: string;
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    maxAge: 60 * 60 * 24 * 30,
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Via Roma Non Solo Pizza",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialsProps) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        await prisma.$disconnect();

        if (user && bcrypt.compareSync(credentials?.password, user.password)) {
          return {
            id: user.id,
            image: user.image,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @param  {object}  user      User object      (only available on sign in)
     * @return {object}              Session that will be returned to the client
     */
    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }): Promise<Session> {
      // Add property to session, like an access_token from a provider.
      session.user = token.user as Session["user"];
      return session;
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt({ token, user }) {
      // Add access_token to the token right after signin
      user && (token.user = user);
      return token;
    },
  },
});
