"use server";

import { and, eq } from "drizzle-orm";
import { db } from ".";
import { users } from "./schema/users";
import { exercises, userAwards, userExercises } from "./schema/exercises";
import { randomUUID } from "crypto";

export async function getUserWithEmail(emailId: string) {
  const result = await db.select().from(users).where(eq(users.email, emailId));
  if (result.length == 0) {
    return null;
  }
  return result[0];
}

export async function getExercises() {
  return await db.select().from(exercises);
}

export async function getAwards(user: typeof users.$inferSelect) {
  const result = await db
    .select()
    .from(userAwards)
    .where(eq(userAwards.userId, user.id));
  if (result.length == 0) {
    const newResult = await db
      .insert(userAwards)
      .values({ userId: user.id })
      .returning();
    return newResult[0];
  }
  return result[0];
}

export async function getUserExercise(
  user: typeof users.$inferSelect,
  exercise: typeof exercises.$inferSelect
) {
  const result = await db
    .select()
    .from(userExercises)
    .where(
      and(
        eq(userExercises.userId, user.id),
        eq(userExercises.exerciseId, exercise.id)
      )
    );

  if (result.length == 0) {
    const newResult = await db
      .insert(userExercises)
      .values({ id: randomUUID(), userId: user.id, exerciseId: exercise.id })
      .returning();
    return newResult[0];
  }

  return result[0];
}

export async function saveUserExercise(
  userId: typeof users.$inferSelect.id,
  exerciseId: typeof exercises.$inferSelect.id,
  countValue: number
) {
  const result = await db
    .update(userExercises)
    .set({ count: countValue })
    .where(
      and(
        eq(userExercises.userId, userId),
        eq(userExercises.exerciseId, exerciseId)
      )
    )
    .returning();
  return result[0];
}
