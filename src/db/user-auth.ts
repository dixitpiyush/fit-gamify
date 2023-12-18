"use server";

import { signIn, signOut } from "@/auth";

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function signInUser(providerId: string) {
  await signIn(providerId, { redirectTo: "/home" });
}
