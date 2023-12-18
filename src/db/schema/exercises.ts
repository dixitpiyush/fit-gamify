import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { randomUUID } from "crypto";

export const exercises = sqliteTable("exercise", {
  id: text("id", { length: 36 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  count: integer("count").notNull(),
  type: text("type").notNull(),
});

export const userExercises = sqliteTable("user-exercise", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  exerciseId: text("exerciseId")
    .notNull()
    .references(() => exercises.id),
  count: integer("count").notNull().default(0),
});

export const userAwards = sqliteTable("user-awards", {
  userId: text("userId")
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  gold: integer("gold").notNull().default(0),
  silver: integer("silver").notNull().default(0),
  bronze: integer("bronze").notNull().default(0),
  streak: integer("streak").notNull().default(0),
});
