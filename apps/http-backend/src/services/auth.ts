import "dotenv/config"
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function signUser(user: any) {
    return jwt.sign({
        id: user.id, email: user.email 
    },secret, {expiresIn: 60 * 60 * 24})
}

export function verifyUser(token: any) {
    if(! token) return null;
    return jwt.verify(token, secret);
}