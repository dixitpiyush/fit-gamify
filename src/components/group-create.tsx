"use client";

import { createNewGroup } from "@/db/actions";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { users } from "@/db/schema/users";

export function GroupCreate({ user }: { user: typeof users.$inferSelect }) {
  return (
    <div className="flex flex-auto flex-col rounded-md border p-4">
      <h1 className="scroll-m-20 p-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Try Out Groups
      </h1>
      <Separator />
      <div className="flex flex-auto flex-col items-center justify-center">
        <div className="flex w-4/5 flex-col items-center text-center md:w-1/2">
          <span className="scroll-m-20 py-16 text-3xl font-semibold tracking-tight first:mt-0">
            When you join a group, you get an opportunity to compete with
            friends and prove that you&apos;re the best
          </span>
          <Button
            className="max-w-min py-10 text-lg font-extrabold"
            onClick={async () => {
              await createNewGroup(user);
            }}
          >
            CREATE A GROUP NOW
          </Button>
          <span className="py-8 text-xl text-muted-foreground">
            Members get a chance to win Gold, Silver and Bronze medals on their
            profiles
          </span>
        </div>
      </div>
    </div>
  );
}
