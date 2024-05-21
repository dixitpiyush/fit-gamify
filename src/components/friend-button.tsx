"use client";

import { users } from "@/db/schema/users";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { addFriend, removeFriend } from "@/db/actions";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useState } from "react";

export function FriendButton({
  currUser,
  friendUser,
  alreadyFriend,
}: {
  currUser: typeof users.$inferSelect | undefined | null;
  friendUser: typeof users.$inferSelect;
  alreadyFriend: boolean;
}) {
  const [isFriend, setIsFriend] = useState(alreadyFriend);

  if (!currUser) {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <Heart />
        </HoverCardTrigger>
        <HoverCardContent>
          You must be logged in to friend someone
        </HoverCardContent>
      </HoverCard>
    );
  }
  return (
    <Button
      variant={"ghost"}
      onClick={async () => {
        if (!isFriend) {
          await addFriend(currUser, friendUser);
          setIsFriend(true);
        } else {
          await removeFriend(currUser, friendUser);
          setIsFriend(false);
        }
      }}
    >
      <Heart
        className={`${isFriend ? `fill-current text-pink-500` : `text-white`}`}
      />
    </Button>
  );
}
