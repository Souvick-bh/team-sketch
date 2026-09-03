import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const roomTable = pgTable("rooms", {
    roomId: varchar("room_id", {length: 50}).primaryKey(),
    name: varchar("name", {length: 100}).notNull(),
    roomSecret: varchar("room_secret", {length: 255}),
    adminId: integer("admin_id").references(() => userTable.id, { onDelete: "cascade"}).notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});