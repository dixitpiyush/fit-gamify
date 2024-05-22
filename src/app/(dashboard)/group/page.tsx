import { auth } from "@/auth";
import { GroupCreate } from "@/components/group-create";
import { GroupList } from "@/components/group-list";
import { getUserWithUserId, isInSomeGroup } from "@/db/actions";
import { redirect } from "next/navigation";

export default async function CreateGroupPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await getUserWithUserId(session.user.id!);

  if (!user) {
    return redirect("/");
  }

  if (!(await isInSomeGroup(user))) {
    return <GroupCreate user={user} />;
  }

  return <GroupList user={user} />;
}
