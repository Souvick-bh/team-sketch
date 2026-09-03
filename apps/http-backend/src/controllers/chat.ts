import { db } from "@repo/db/index";
import { chatTable } from "@repo/db/chat"
import { asc, desc, eq } from "drizzle-orm";

export async function getChats(req: any, res: any) {
    const {roomid} = req.body;
    if(!roomid) return res.json({message: "roomid is missing..."});
    try {
        const chats = await db.select().from(chatTable).where(eq(chatTable.roomId, roomid)).orderBy(desc(chatTable.createdAt))
        return res.json({chats});
    } catch (error) {
        console.error(error);
        return res.json({message: "fata bhai..."})
    }
}