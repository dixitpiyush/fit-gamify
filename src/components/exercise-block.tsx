import { exercises } from "@/db/schema/exercises";
import { users } from "@/db/schema/users";
import { getUserExercise } from "@/db/actions";
import ExerciseSlider from "./exercise-slider";

export default async function ExerciseBlock({
  user,
  exercise,
}: {
  user: typeof users.$inferSelect;
  exercise: typeof exercises.$inferSelect;
}) {
  const userExercise = await getUserExercise(user, exercise);
  return (
    <>
      <div className="m-4 rounded-xl border-2 p-8">
        <h3 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
          {exercise.name}
        </h3>
        <p className="text-xl text-muted-foreground">
          {exercise.count} {exercise.type == "count" ? "times" : "mins"}
        </p>
        <ExerciseSlider
          userExercise={userExercise}
          maxCount={exercise.count}
        />
      </div>
    </>
  );
}
