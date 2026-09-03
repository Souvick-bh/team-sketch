import { verifyUser } from "../services/auth";

export function restrictedRoute(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({message: "Unauthorised"});
    const token = authHeader.split(" ")[1];
    const user = verifyUser(token);
    req.user = user;
    next();
}