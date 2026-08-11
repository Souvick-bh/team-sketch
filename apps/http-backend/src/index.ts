import express from "express";
import cors from "cors"
import jwt from "jsonwebtoken"
import { restrictedRoute } from "./middlewares/auth";
import { handleSignIn, handleSignUp } from "./controllers/user";
import { handleRoomCreation } from "./controllers/room";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
});
app
.post("/api/user/signup", handleSignUp)
.post("api/user.signin", handleSignIn)
.post("api/room", restrictedRoute, handleRoomCreation)


app.listen(3001, () => console.log("express server syarted running..."))