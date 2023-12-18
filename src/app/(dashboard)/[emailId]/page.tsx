import UserProfile from "@/components/user-profile";
import { getUserWithEmail } from "@/db/actions";

function UserNotFound() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <p>Error: User Not Found</p>
    </main>
  );
}

export default async function UserPage({
  params,
}: {
  params: { emailId: string };
}) {
  const pos = params.emailId.indexOf("%40");

  if (pos == -1) {
    return UserNotFound();
  }

  const emailId =
    params.emailId.slice(0, pos) + "@" + params.emailId.slice(pos + 3);

  const currUser = await getUserWithEmail(emailId);

  if (currUser == null) {
    return UserNotFound();
  }

  return <UserProfile user={currUser} />;
}
