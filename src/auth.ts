/* eslint-disable @typescript-eslint/unbound-method */
import { env } from "@/env.mjs";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

// Providers
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authConfig = {
  // Add providers here
  providers: [Github, Google],
  adapter: DrizzleAdapter(db),
  secret: env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLandingPage = nextUrl.pathname == "/";

      if (isLoggedIn && isOnLandingPage) {
        return Response.redirect(new URL("/home", nextUrl));
      }

      if (!isLoggedIn && !isOnLandingPage) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
