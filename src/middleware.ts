import { authConfig } from "@/auth";
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth;

// Don't invoke the middleware on the following paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
