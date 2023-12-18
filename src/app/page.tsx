import UserAuth from "@/components/user-auth";

export default function Home() {
  return (
    <main className="flex h-full w-screen flex-row items-stretch justify-normal">
      <div className="hidden flex-1 flex-col p-4 md:flex md:dark:bg-muted">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          FitGamify
        </h1>
        <div className="flex basis-full flex-col items-center justify-center">
          <p className="text-xl italic text-muted-foreground">
            We combine your Fitness with Gaming
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-2xl font-semibold">Sign In To Your Account</div>
        <p className="my-4 text-sm text-muted-foreground">
          choose your preferred provider
        </p>
        <UserAuth className="my-6" />
      </div>
    </main>
  );
}
