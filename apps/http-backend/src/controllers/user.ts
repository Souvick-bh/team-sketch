import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { signUser } from "../services/auth";
import { createUserSchema, userSigninSchema } from "@repo/common/types";
import { db } from "@repo/db/index";
import { userTable } from "@repo/db/user"

export async function handleSignUp(req: any, res: any) {
    // const {email, password} = req.body;
    const parsedData = createUserSchema.safeParse(req.body);
    if(!parsedData.success) return res.json({ message: "Invalid inputs..."});
    // Hashing
    const hashed_password = await argon2.hash(parsedData.data.password);
    // DB call
    try {
        const signUpRes = await db.insert(userTable).values({email: parsedData.data.email, password: hashed_password, username: parsedData.data.username})
        return res.json(signUpRes);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error });
    }
    
}

export async function handleSignIn(req: any, res: any) {
    const parsedData = userSigninSchema.safeParse(req.body);
    if(!parsedData.success) return res.json({ message: "Invalid inputs..."});
    // DB call
    try {
        const user = await db.select().from(userTable).where(eq(userTable.email, parsedData.data.email)).limit(1);
        if(user.length === 0) return res.status(404).json({message: "user not found"});
        const current_user = user[0];
        if(!await argon2.verify(current_user!.password, parsedData.data.password)) return res.status(401).json({message: "wrong password"});
        const token = signUser(current_user);
        // res.cookie("token", token);
        res.status(200).json({message: "Successfully logged in...", token: token });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error });
    }
}