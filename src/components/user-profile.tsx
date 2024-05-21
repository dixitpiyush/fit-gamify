import { users } from "@/db/schema/users";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Separator } from "./ui/separator";
import ShareProfile from "./share-link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getAwards, getUserWithUserId, hasBefriended } from "@/db/actions";
import { auth } from "@/auth";
import { FriendButton } from "./friend-button";

export default async function UserProfile({
  user,
}: {
  user: typeof users.$inferSelect;
}) {
  const session = await auth();
  const currUser = session?.user?.id
    ? await getUserWithUserId(session.user.id)
    : undefined;

  const ownProfile = currUser?.id === user.id;

  const isFriend = currUser ? await hasBefriended(currUser, user) : false;

  const userAwards = await getAwards(user);
  return (
    <main className="mx-12 my-12 mb-20 flex h-full flex-row items-center rounded-2xl border-2">
      <div className="flex h-full w-2/3 flex-col items-center justify-center">
        <Avatar className="m-4 h-max w-1/4">
          <AvatarImage src={user.image!}></AvatarImage>
          <AvatarFallback>
            {user.name!.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="m-4 text-4xl font-semibold">{user.name}</div>
        <div className="m-2 text-lg font-thin text-muted-foreground">
          {user.email}
        </div>
        <div className="flex flex-row space-x-2 p-2">
          <ShareProfile emailId={user.email} />
          {!ownProfile && (
            <FriendButton
              currUser={currUser}
              friendUser={user}
              alreadyFriend={isFriend}
            />
          )}
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="h-4/5"
      />
      <div className="h-full w-1/3">
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex h-1/4 flex-row items-center justify-center gap-4 align-middle">
              <Icon
                icon="solar:cup-first-linear"
                height="5rem"
              />
              <span className="text-4xl">× {userAwards.gold}</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Gold Awards
            </h2>
            <p className="text-sm text-muted-foreground">
              You get a Gold Award every time you&apos;re the best in your
              group.
              <br />
              <br />
              The biggest flex here.
            </p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <div className="flex h-1/4 flex-row items-center justify-center gap-4 align-middle">
              <Icon
                icon="fa6-solid:medal"
                height="5rem"
              />
              <span className="text-4xl">× {userAwards.silver}</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Silver Awards
            </h2>
            <p className="text-sm text-muted-foreground">
              You get a Silver Award every time you&apos;re the 2<sup>nd</sup>{" "}
              best in your group.
            </p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <div className="flex h-1/4 flex-row items-center justify-center gap-4 align-middle">
              <Icon
                icon="ph:medal-fill"
                height="5rem"
              />
              <span className="text-4xl">× {userAwards.bronze}</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Bronze Awards
            </h2>
            <p className="text-sm text-muted-foreground">
              You get a Bronze Award every time you&apos;re 3<sup>rd</sup> in
              your group.
            </p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <div className="flex h-1/4 flex-row items-center justify-center gap-4 align-middle">
              <Icon
                icon="mdi:fire"
                height="5rem"
              />
              <span className="text-4xl">× {userAwards.streak}</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              The Streak
            </h2>
            <p className="text-sm text-muted-foreground">
              Every day you complete your set of challenges, you&apos;ll be
              awarded this award. Even if you&apos;re not the best in your
              group, your efforts do deserve to be applauded
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </main>
  );
}
