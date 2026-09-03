import { nanoid } from "nanoid";
import { createRoomSchema } from "@repo/common/types";
import { db } from "@repo/db/index";
import { roomTable } from "@repo/db/room"

export async function handleRoomCreation(req: any, res: any) {
    const parsedData = createRoomSchema.safeParse(req.body);
    if(!parsedData.success) return res.json({ message: "something, you did is wrong..."});
    const roomId = nanoid(8);
    const roomSecret = nanoid(8);
    const user = req.user;
    try {
        const createRoomResp = await db.insert(roomTable).values({roomId: roomId, name: parsedData.data?.name, roomSecret: roomSecret, adminId: user.id })
        return res.status(201).json({roomId: roomId, roomSecret: roomSecret})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error });
    }
    // return res.json({roomId: 243});
}