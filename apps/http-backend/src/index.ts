import express, { type Express } from "express";
import cors from "cors"
import { restrictedRoute } from "./middlewares/auth";
import { handleSignIn, handleSignUp } from "./controllers/user";
import { handleRoomCreation } from "./controllers/room";
import { getChats } from "./controllers/chat";

const app: Express = express();
app.use(cors({origin: "https://calico-rouge.vercel.app", credentials: true,}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app
.get("/", (req, res) => { res.send("hello") })

app
.post("/api/user/signup", handleSignUp)
.post("/api/user/signin", handleSignIn)
.post("/api/room/create", restrictedRoute, handleRoomCreation)
.get("/api/chats/:roomid", getChats)

export default app;

// app.listen(3001, () => console.log("express server syarted running..."))