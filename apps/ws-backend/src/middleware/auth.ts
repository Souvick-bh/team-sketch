import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config"


export function checkUser(token: string): number | null {
    if(token.trim() == "") return null;
    const user = jwt.verify(token, JWT_SECRET);
    if(!user || typeof user == "string") return null;
    return user.id;
}