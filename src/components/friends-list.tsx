import { getFriends, getUserWithUserId } from "@/db/actions";
import { users } from "@/db/schema/users";
import { FaUserAstronaut } from "react-icons/fa6";
import { FriendButton } from "./friend-button";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";

export async function FriendsList({
  profileUser,
  currUser,
}: {
  currUser: typeof users.$inferSelect;
  profileUser: typeof users.$inferSelect;
}) {
  const friendIds = (await getFriends(profileUser)).map(
    (friend) => friend.friendId
  );

  const friendPromises = friendIds.map(async (id) => {
    const friend = await getUserWithUserId(id);
    if (!friend) {
      throw Error("This should not be possible");
    }
    return friend;
  });

  const friends = await Promise.all(friendPromises);

  return (
    <div className="p-4">
      <h1 className="scroll-m-20 p-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Friends
      </h1>
      <Separator />
      <div className="flex flex-row flex-wrap py-4">
        {friends.map((friendObj, index) => (
          <div
            key={index}
            className="m-4 flex w-60 flex-col rounded-3xl border"
          >
            <div className="flex flex-col items-center justify-center pb-2 pt-4">
              <Avatar className="size-24">
                <AvatarImage src={friendObj.image!} />
                <AvatarFallback>
                  <FaUserAstronaut className="text-accent" />
                </AvatarFallback>
              </Avatar>
              <span className="py-1 text-lg font-semibold">
                {friendObj.name}
              </span>
              <span className="py-1 text-sm text-muted-foreground">
                {friendObj.email}
              </span>
            </div>
            <Separator />
            <div className="flex flex-row justify-end space-x-2 px-4 py-2 text-center">
              <FriendButton
                currUser={currUser}
                friendUser={friendObj}
                alreadyFriend={true}
              />
              <Button
                variant={"outline"}
                asChild
              >
                <Link href={`/${friendObj.email}`}>Go</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
