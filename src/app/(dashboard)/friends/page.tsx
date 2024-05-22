import { auth } from "@/auth";
import { FriendsList } from "@/components/friends-list";
import { getUserWithEmail } from "@/db/actions";
import { redirect } from "next/navigation";

export default async function FriendsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await getUserWithEmail(session.user.email!);

  if (!user) {
    redirect("/");
  }

  return (
    <FriendsList
      currUser={user}
      profileUser={user}
    />
  );
}
