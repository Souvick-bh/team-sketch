import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const userTable = pgTable( "users",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar("username", {length: 50}).notNull().unique(),
    email: varchar("email", {length: 255}).notNull().unique(),
    password: varchar("password", {length: 255}).notNull(),
    avatar: varchar("avatar", {length: 512}),
    verified: boolean("verified").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});