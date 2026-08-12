import { createRoomSchema } from "@repo/common/types"

export function handleRoomCreation(req: any, res: any) {
    const parsedData = createRoomSchema.safeParse(req.body);
    if(!parsedData.success) res.json({ message: "something, you did is wrong..."})
    return res.json({roomId: 243})
}