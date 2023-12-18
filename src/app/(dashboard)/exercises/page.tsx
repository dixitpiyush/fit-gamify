import { auth } from "@/auth";
import ExerciseBlock from "@/components/exercise-block";
import { getUserWithEmail, getExercises } from "@/db/actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function ExercisesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await getUserWithEmail(session.user.email!);

  const exerciseList = await getExercises();
  return (
    <main className="m-8 mx-auto md:w-3/5">
      {exerciseList.map((exercise) => (
        <ExerciseBlock
          user={user!}
          exercise={exercise}
          key={exercise.id}
        />
      ))}
    </main>
  );
}
