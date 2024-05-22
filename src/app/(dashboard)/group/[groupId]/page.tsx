import { auth } from "@/auth";
import { GroupList } from "@/components/group-list";
import { getUserWithUserId, isValidGroup } from "@/db/actions";
import { groups } from "@/db/schema/social";
import { redirect } from "next/navigation";

export default async function GroupPage({
  params,
}: {
  params: { groupId: typeof groups.$inferSelect.groupId };
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await getUserWithUserId(session.user.id!);

  if (!user) {
    return redirect("/");
  }

  if (!isValidGroup(params.groupId)) {
    return redirect("/group");
  }

  return (
    <GroupList
      user={user}
      groupId={params.groupId}
    />
  );
}
