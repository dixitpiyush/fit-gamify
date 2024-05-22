import { auth } from "@/auth";
import { GroupExistingCreate } from "@/components/group-existing-create";
import { getUserWithUserId } from "@/db/actions";
import { redirect } from "next/navigation";

export default async function CreateGroupQuestion() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await getUserWithUserId(session.user.id!);

  if (!user) {
    return redirect("/");
  }

  return <GroupExistingCreate user={user} />;
}
