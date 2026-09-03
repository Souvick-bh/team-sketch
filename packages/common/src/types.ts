import * as z from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3).max(20).default("Guest"),
    email: z.email(),
    password: z.string()
});

export const userSigninSchema = z.object({
    email: z.email(),
    password: z.string()
});

export const createRoomSchema = z.object({
    // roomId: z.string().min(3).max(20),
    name: z.string().min(3).max(20),
    // roomSecret: z.string().min(3).max(20),
});