import { auth } from "@/auth";
import { ConfirmGroupChange } from "@/components/confirm-group-change";
import { getUserWithUserId, isValidGroup } from "@/db/actions";
import { redirect } from "next/navigation";

export default async function GroupInviteConfirm({
  params,
}: {
  params: { groupId: string };
}) {
  const isRealGroup = await isValidGroup(params.groupId);

  if (!isRealGroup) {
    return redirect("/group/");
  }

  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await getUserWithUserId(session.user.id!);

  if (!user) {
    return redirect("/");
  }

  return (
    <ConfirmGroupChange
      user={user}
      groupId={params.groupId}
    />
  );
}
