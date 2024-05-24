"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signInUser } from "@/db/user-auth";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function UserAuth({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid w-4/5 gap-4 md:w-3/5", className)}
      {...props}
    >
      <Button
        variant="outline"
        onClick={async () => {
          await signInUser("github");
        }}
      >
        <FaGithub className="mr-2 size-5" />
        Github
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await signInUser("google");
        }}
      >
        <FaGoogle className="mr-2 size-5" />
        Google
      </Button>
    </div>
  );
}
