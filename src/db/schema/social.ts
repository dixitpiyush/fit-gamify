import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

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

export const friends = sqliteTable("friends", {
  relationId: text("relationId").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  friendId: text("friendId")
    .notNull()
    .references(() => users.id),
});

export const groups = sqliteTable("groups", {
  userId: text("userId")
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  groupId: text("groupId").notNull(),
});
