"use client";

import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { groups } from "@/db/schema/social";
import { FaShareSquare } from "react-icons/fa";

export default function ShareGroup({
  groupId,
}: {
  groupId: typeof groups.$inferSelect.groupId;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(
                "http://localhost:3000/group/" + groupId
              );
            }}
          >
            <FaShareSquare className="text-blue-400" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Link Copied to Your Clipboard</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                Share this link with others and they&apos;ll be able to see your
                group
              </span>
              <br />
              <br />
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {"http://localhost:3000/" + groupId}
              </code>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
