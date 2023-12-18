"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icon } from "@iconify-icon/react";
import { signInUser } from "@/db/user-auth";

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
        <Icon
          icon="mdi:github"
          className="mr-2"
          width="18"
        />
        Github
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await signInUser("google");
        }}
      >
        <Icon
          icon="ri:google-fill"
          className="mr-2"
          width="18"
        />
        Google
      </Button>
    </div>
  );
}
