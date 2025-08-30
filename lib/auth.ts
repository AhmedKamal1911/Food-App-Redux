import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { loginAction } from "./server/actions/user/login-action";
import prisma from "./prisma";
import { getUserById } from "./server/queries/user";
import { User, UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await loginAction(credentials!);
        if (res.status !== "success") {
          throw new Error(JSON.stringify(res.error));
        }

        return res.data!;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    jwt: async ({ token }) => {
      const dbUser = await getUserById(token.sub);
      if (!dbUser) return token;
      token.role = dbUser.role;
      token.picture = dbUser.image;
      token.phone = dbUser.phone;
      token.emailVerified = dbUser.emailVerified;
      token.emailVerificationExpires = dbUser.emailVerificationExpires;
      token.country = dbUser.country;
      token.name = dbUser.name;
      token.email = dbUser.email;
      return token;
    },
    session: async ({ session, token }) => {
      if (!token || !session) return session;

      session.user.id = token.sub;
      session.user.emailVerified = token.emailVerified;
      session.user.role = token.role;
      session.user.image = token.picture;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.phone = token.phone;
      session.user.emailVerificationExpires = token.emailVerificationExpires;
      session.user.country = token.country;
      return session;
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      phone: string;
      image: string | null;
      email: string;
      name: string;
      emailVerified: User["emailVerified"];
      emailVerificationExpires: User["emailVerificationExpires"];
      country: User["country"];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: UserRole;
    picture: string | null;
    phone: string;
    email: string;
    name: string;
    emailVerified: User["emailVerified"];
    emailVerificationExpires: User["emailVerificationExpires"];
    country: User["country"];
  }
}
