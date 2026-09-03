import "dotenv/config"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config"

const secret = JWT_SECRET;

export function signUser(user: any) {
    return jwt.sign({
        id: user.id, email: user.email 
    },secret, {expiresIn: 60 * 60 * 24 * 7})
}

export function verifyUser(token: any) {
    if(! token) return null;
    return jwt.verify(token, secret);
}