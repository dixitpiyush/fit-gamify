import UserAuth from "@/components/user-auth";

export default function SettingsPage() {
  return (
    <main className="m-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Settings
      </h1>
      <p className="italic leading-7 [&:not(:first-child)]:mt-6">
        Customize your MoveMasters experience
      </p>

      <h2 className="mt-16 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Login Providers
      </h2>

      <div className="mx-auto mt-8 flex w-4/5 flex-row items-stretch overflow-hidden rounded-2xl border-2">
        <div className="flex flex-1 items-center justify-center bg-muted p-16">
          <p className="w-1/2 text-center text-xl text-muted-foreground">
            Connect more accounts for a simpler and more secure experience
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <UserAuth />
        </div>
      </div>
    </main>
  );
}
