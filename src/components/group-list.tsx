import { FriendButton } from "./friend-button";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { users } from "@/db/schema/users";
import { groups } from "@/db/schema/social";
import React from "react";
import {
  getGroupIdWithUser,
  getGroupMembers,
  getUserWithUserId,
  hasBefriended,
} from "@/db/actions";
import { redirect } from "next/navigation";
import { GroupInviteButton } from "./group-invite-button";
import ShareGroup from "./share-group-link";
import Link from "next/link";
import { FaUserAstronaut } from "react-icons/fa6";

export async function GroupList({
  user,
  groupId,
}: {
  user: typeof users.$inferSelect;
  groupId?: typeof groups.$inferSelect.groupId;
}) {
  const currGroupId = groupId ?? (await getGroupIdWithUser(user))?.groupId;

  if (!currGroupId) {
    return redirect("/");
  }

  const groupMembers = await getGroupMembers(currGroupId);

  const connectedUsersPromise = groupMembers.map(
    async (groupObj) => await getUserWithUserId(groupObj.userId)
  );

  const connectedUsers = await Promise.all(connectedUsersPromise);

  const isFriendPromise = connectedUsers.map(async (conUser) => {
    if (!conUser) {
      return false;
    }

    const result = await hasBefriended(user, conUser);

    return result;
  });

  const isFriend = await Promise.all(isFriendPromise);

  return (
    <div>
      <div className="flex flex-row justify-between p-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Group
        </h1>
        <div className="flex flex-row items-center space-x-2">
          <ShareGroup groupId={currGroupId} />
          <Button
            variant={"secondary"}
            asChild
          >
            <Link href={`/group/create`}>+</Link>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col p-4">
        <GroupInviteButton groupId={currGroupId} />
        <div className="flex flex-row">
          {connectedUsers.map((conUser, index) => {
            return (
              <div
                key={index}
                className="m-4 flex w-60 flex-col rounded-3xl border"
              >
                {conUser && (
                  <>
                    <div className="flex flex-col items-center justify-center pb-2 pt-4">
                      <Avatar className="size-24">
                        <AvatarImage src={conUser.image!} />
                        <AvatarFallback>
                          <FaUserAstronaut className="text-accent" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="py-1 text-lg font-semibold">
                        {conUser.name}
                      </span>
                      <span className="py-1 text-sm text-muted-foreground">
                        {conUser.email}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex flex-row justify-end space-x-2 px-4 py-2 text-center">
                      {user.id != conUser.id && (
                        <FriendButton
                          currUser={user}
                          friendUser={conUser}
                          alreadyFriend={isFriend[index]}
                        />
                      )}
                      <Button
                        variant={"outline"}
                        asChild
                      >
                        <Link href={`/${conUser.email}`}>Go</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
