import { signUser } from "../services/auth";

export async function handleSignUp(req: any, res: any) {
    const {email, password} = req.body;
    // DB call
    res.json({"email": email, "password": password});
}

export async function handleSignIn(req: any, res: any) {
    const {email, password} = req.body;
    // DB call
    const user: any = { id: 1, email: "sam@gmail.com"}
    const token = signUser(user);
    res.cookie("token", token);
    res.json({"email": email, "password": password});
}