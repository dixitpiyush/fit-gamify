"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { signOutUser } from "@/db/user-auth";

export default function NavMenu({ user }: { user: User }) {
  return (
    <>
      <NavigationMenu className="m-4 flex max-w-full flex-row items-center justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/home">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/exercises">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Exercises
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center justify-center">
            <NavigationMenuTrigger>
              <Avatar>
                <AvatarImage
                  className="rounded-full border-2 border-foreground p-1"
                  src={user.image!}
                ></AvatarImage>
                <AvatarFallback>
                  {user.name!.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex min-w-max flex-col items-stretch p-4">
                <h2 className="mb-4 scroll-m-20 border-b pb-4 text-4xl font-thin tracking-tight first:mt-0">
                  {user.name!}
                </h2>
                <div className="flex flex-row justify-between gap-12">
                  <Button
                    asChild
                    variant="outline"
                  >
                    <Link href="/settings">Settings</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await signOutUser();
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
