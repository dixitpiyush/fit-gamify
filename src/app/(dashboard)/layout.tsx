import { auth } from "@/auth";
import NavMenu from "@/components/nav-menu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <header>
        <NavMenu user={session!.user!} />
      </header>
      {children}
    </>
  );
}
