import "dotenv/config"
import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

const secret = process.env.JWT_SECRET!;

wss.on('connection', function connection(ws, req) {
    const url = req.url;
    if(!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";

    const user = jwt.verify(token, secret)
    if(! user) {
        ws.close();
        return;
    }
    // ws.on('error', console.error);

    ws.on('message', function message(data) {
        ws.send("Hii");
    });

});