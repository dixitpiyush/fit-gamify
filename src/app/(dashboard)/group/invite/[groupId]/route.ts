import { auth } from "@/auth";
import { addToGroup, getUserWithUserId } from "@/db/actions";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { groupId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const user = await getUserWithUserId(session.user?.id);

  if (!user) {
    return redirect("/");
  }

  const result = await addToGroup(user, params.groupId, false);

  if (result === 0) {
    return redirect("/group/");
  }

  if (result === 1) {
    return redirect(`/group/invite/${params.groupId}/question`);
  }

  if (result === 2) {
    return redirect(`/group/`);
  }
}
