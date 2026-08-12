import { signUser } from "../services/auth";
import { createUserSchema, userSigninSchema } from "@repo/common/types"

export async function handleSignUp(req: any, res: any) {
    // const {email, password} = req.body;
    const parsedData = createUserSchema.safeParse(req.body);
    if(!parsedData.success) return res.json({ message: "Invalid inputs..."});
    // DB call
    res.json({"email": parsedData.data.email, "password": parsedData.data.password, "username": parsedData.data.username});
}

export async function handleSignIn(req: any, res: any) {
    const parsedData = userSigninSchema.safeParse(req.body);
    if(!parsedData.success) return res.json({ message: "Invalid inputs..."});
    // DB call
    const user: any = { id: 1, email: "sam@gmail.com"};
    const token = signUser(user);
    res.cookie("token", token);
    res.json({"email": parsedData.data.email, "password": parsedData.data.password});
}