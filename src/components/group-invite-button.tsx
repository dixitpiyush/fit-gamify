"use client";

import { groups } from "@/db/schema/social";
import { Button } from "./ui/button";
import { ClipboardCopy } from "lucide-react";

export function GroupInviteButton({
  groupId,
}: {
  groupId: typeof groups.$inferSelect.groupId;
}) {
  const link = "http://localhost:3000/group/invite/" + groupId;
  return (
    <div className="flex flex-row items-center">
      <span>Click to copy Invite Link:</span>
      <span>{` `}</span>
      <Button
        variant={"link"}
        onClick={async () => {
          await navigator.clipboard.writeText(link);
        }}
      >
        {link}
      </Button>
      <ClipboardCopy />
    </div>
  );
}
