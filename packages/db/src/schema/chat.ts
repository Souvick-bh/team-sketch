import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { roomTable } from "./room";
import { userTable } from "./user";

export const chatTable = pgTable("chats", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    roomId: varchar("room_id").references(() => roomTable.roomId,{onDelete: "cascade"}).notNull(),
    senderId: integer("sender_id").references(() => userTable.id,{onDelete: "cascade"}).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})