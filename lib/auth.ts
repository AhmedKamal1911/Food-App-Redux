import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { loginAction } from "./server/actions/user/login-action";
import prisma from "./prisma";
import { getUserById } from "./server/queries/user";
import { UserRole } from "@prisma/client";

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
        if (!res.success) {
          throw new Error(JSON.stringify(res.error));
        }

        return res.user;
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
      return token;
    },
    session: async ({ session, token }) => {
      if (!token || !session) return session;

      session.user.id = token.sub;

      session.user.role = token.role;
      session.user.image = token.picture;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.phone = token.phone;

      return session;
    },
  },
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
  }
}
