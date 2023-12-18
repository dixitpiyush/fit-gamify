import { auth } from "@/auth";
import UserProfile from "@/components/user-profile";
import { getUserWithEmail } from "@/db/actions";

export default async function HomePage() {
  const session = await auth();

  const currUser = await getUserWithEmail(session!.user!.email!);
  return <UserProfile user={currUser!} />;
}
