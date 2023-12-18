"use client";

import React from "react";
import { Slider } from "./ui/slider";
import { userExercises } from "@/db/schema/exercises";
import { Button } from "./ui/button";
import { saveUserExercise } from "@/db/actions";
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

export default function ExerciseSlider({
  userExercise,
  maxCount,
}: {
  userExercise: typeof userExercises.$inferInsert;
  maxCount: number;
}) {
  const [value, setValue] = React.useState([userExercise.count!]);
  return (
    <div>
      <Slider
        defaultValue={value}
        max={maxCount}
        step={1}
        onValueChange={setValue}
        className="m-8 mx-auto"
      />
      <div className="flex flex-row items-center justify-end gap-6">
        <div className="text-4xl font-semibold">{value[0]}</div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="secondary"
              onClick={async () => {
                await saveUserExercise(
                  userExercise.userId,
                  userExercise.exerciseId,
                  value[0]
                );
              }}
            >
              Save
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Saved</AlertDialogTitle>
              <AlertDialogDescription>
                Congratulations on completing{" "}
                {((value[0] / maxCount) * 100).toFixed()}% of the exercise. Keep
                going!!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
