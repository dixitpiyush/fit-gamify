"use server";

import { and, eq } from "drizzle-orm";
import { db } from ".";
import { users } from "./schema/users";
import { exercises, userExercises } from "./schema/exercises";
import { randomUUID } from "crypto";
import { friends, groups, userAwards } from "./schema/social";
import { redirect } from "next/navigation";

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

export async function getFriends(user: typeof users.$inferSelect) {
  const result = await db
    .select({ friendId: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, user.id));

  return result;
}

export async function getUserWithUserId(userId: string) {
  const result = await db.select().from(users).where(eq(users.id, userId));

  if (result.length === 0) {
    return null;
  }

  return result[0];
}

export async function hasBefriended(
  user: typeof users.$inferSelect,
  friend: typeof users.$inferSelect
) {
  const usersFriends = await getFriends(user);

  const areFriends = usersFriends.find((trueFriend) => {
    if (trueFriend.friendId === friend.id) {
      return true;
    }
  });

  if (!areFriends) {
    return false;
  }

  return true;
}

export async function addFriend(
  user: typeof users.$inferSelect,
  friend: typeof users.$inferSelect
) {
  await db.insert(friends).values({
    relationId: crypto.randomUUID(),
    userId: user.id,
    friendId: friend.id,
  });

  return;
}

export async function removeFriend(
  user: typeof users.$inferSelect,
  friend: typeof users.$inferSelect
) {
  await db
    .delete(friends)
    .where(and(eq(friends.userId, user.id), eq(friends.friendId, friend.id)));

  return;
}

export async function isInSomeGroup(user: typeof users.$inferSelect) {
  const result = await db
    .select()
    .from(groups)
    .where(eq(groups.userId, user.id));

  if (result.length === 0) {
    return false;
  }
  return true;
}

export async function isInThisGroup(
  user: typeof users.$inferSelect,
  groupId: typeof groups.$inferSelect.groupId
) {
  const result = await db
    .select()
    .from(groups)
    .where(and(eq(groups.userId, user.id), eq(groups.groupId, groupId)));

  if (result.length === 0) {
    return false;
  }

  return true;
}

export async function isValidGroup(
  groupId: typeof groups.$inferSelect.groupId
) {
  const result = await db
    .select()
    .from(groups)
    .where(eq(groups.groupId, groupId));

  if (result.length === 0) {
    return false;
  }
  return true;
}

export async function addToGroup(
  user: typeof users.$inferSelect,
  groupId: typeof groups.$inferSelect.groupId,
  force: boolean
) {
  const alreadyGrouped = await isInSomeGroup(user);

  if (!isValidGroup(groupId)) {
    return 2;
  }

  if (!alreadyGrouped) {
    await db.insert(groups).values({ groupId: groupId, userId: user.id });
    return 0;
  }

  const sameGroup = await isInThisGroup(user, groupId);

  if (sameGroup) {
    return 0;
  }

  if (!force) {
    return 1;
  }

  await db
    .update(groups)
    .set({ groupId: groupId })
    .where(eq(groups.userId, user.id));

  return 0;
}

export async function createNewGroup(user: typeof users.$inferSelect) {
  const newGroupId = crypto.randomUUID();

  if (await isInSomeGroup(user)) {
    await db
      .update(groups)
      .set({ groupId: newGroupId })
      .where(eq(groups.userId, user.id));
  } else {
    await db.insert(groups).values({ groupId: newGroupId, userId: user.id });
  }

  return redirect(`/group/${newGroupId}`);
}

export async function getGroupMembers(
  groupId: typeof groups.$inferSelect.groupId
) {
  if (!(await isValidGroup(groupId))) {
    return redirect("/");
  }

  const result = await db
    .select()
    .from(groups)
    .where(eq(groups.groupId, groupId));

  return result;
}

export async function getGroupIdWithUser(user: typeof users.$inferSelect) {
  const result = await db
    .select()
    .from(groups)
    .where(eq(groups.userId, user.id));

  if (result.length > 0) {
    return result[0];
  }
}
