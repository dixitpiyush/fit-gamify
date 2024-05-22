"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { addToGroup } from "@/db/actions";
import { users } from "@/db/schema/users";
import { groups } from "@/db/schema/social";

export function ConfirmGroupChange({
  user,
  groupId,
}: {
  user: typeof users.$inferSelect;
  groupId: typeof groups.$inferSelect.groupId;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-auto flex-col rounded-md border p-4">
      <h1 className="scroll-m-20 p-4 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        WARNING
      </h1>
      <Separator />
      <div className="flex flex-auto flex-col items-center justify-center">
        <div className="flex w-4/5 flex-col items-center text-center md:w-1/2">
          <span className="scroll-m-20 py-16 text-3xl font-semibold tracking-tight first:mt-0">
            You just tried to open the invite to a group. But we found that
            you&apos;re already part of a group. A user can only be part of one
            group at a time.
          </span>
          <div className="flex flex-row space-x-4">
            <Button
              className="max-w-min flex-1 py-10 text-lg font-extrabold"
              onClick={() => {
                router.replace("/group");
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              className="max-w-min flex-1 py-10 text-lg font-extrabold"
              onClick={async () => {
                const result = await addToGroup(user, groupId, true);

                if (result === 0) {
                  router.replace(`/group`);
                }
              }}
            >
              Continue
            </Button>
          </div>
          <span className="py-8 text-xl text-muted-foreground">
            Members get a chance to win Gold, Silver and Bronze medals on their
            profiles
          </span>
        </div>
      </div>
    </div>
  );
}
