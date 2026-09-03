import "dotenv/config";
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

console.log("DATABASE_URL =", process.env.DATABASE_URL);
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);
