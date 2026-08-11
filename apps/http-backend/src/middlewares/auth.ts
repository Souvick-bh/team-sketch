import { verifyUser } from "../services/auth";

export function restrictedRoute(req: any, res: any, next: any) {
    const token = req.cookies?.token;
    const user = verifyUser(token);
    req.user = user;
    next();
}