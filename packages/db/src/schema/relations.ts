import { userTable } from "./user";
import { roomTable } from "./room";
import { relations } from "drizzle-orm/relations";
import { chatTable } from "./chat";

export const userRelations = relations(userTable, ({many}) => ({
    rooms: many(roomTable),
    chats: many(chatTable)
}));

export const roomRelations = relations(roomTable, ({one, many}) => ({
    admin: one(userTable, {
        fields: [roomTable.adminId],
        references: [userTable.id]
    }),
    chats: many(chatTable)
}));

export const chatRelations = relations(chatTable, ({one}) => ({
    room: one(roomTable, {
        fields: [chatTable.roomId],
        references: [roomTable.roomId]
    }),
    sender: one(userTable, {
        fields: [chatTable.senderId],
        references: [userTable.id]
    })
}));

