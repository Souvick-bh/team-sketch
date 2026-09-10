import "dotenv/config"
import { WebSocketServer, WebSocket } from 'ws';
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/common-backend/config"
import { checkUser } from "./middleware/auth";
import { db } from "@repo/db/index";
import { chatTable } from "@repo/db/chat";


interface User {
    userid: number,
    rooms: string[],
    ws: WebSocket
}

const wss = new WebSocketServer({ port: Number(process.env.PORT) || 8080 });

let users: User[] = [];
let rooms = [];

wss.on('connection', function connection(ws, req) {
    const url = req.url;
    if(!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";

    const userAuthenticated = checkUser(token);
    if(userAuthenticated == null) {
        ws.close();
        return;
    }
    // ws.on('error', console.error);

    users.push({userid: userAuthenticated, rooms: [], ws: ws})

    ws.on('message',async function message(data) {
        // ws.send("Hii");
        const parsedData = JSON.parse(data.toString());
        const user = users.find(u => u.ws === ws);
        if(!user) return;
        // console.log(users[users.length-1]?.userid);

        switch (parsedData.type) {
            case "draw":
                if(!user.rooms.includes(parsedData.room_id)) return;
                try {
                    await db.insert(chatTable).values({roomId: parsedData.room_id, senderId: user?.userid!, message: parsedData.message});
                    users.forEach(u => {
                        if(u.rooms.includes(parsedData.room_id) && u.ws.readyState === WebSocket.OPEN) {
                            u.ws.send(JSON.stringify({type: "draw", message: parsedData.message, room_id: parsedData.room_id}))
                        }
                    })
                } catch (error) {
                    console.error(error)
                }
                break
            case "join_room": 
                if(!user.rooms.includes(parsedData.room_id)) {
                    user.rooms.push(parsedData.room_id);
                }
                break;
            
            case "leave_room":
                user.rooms = user.rooms.filter(r=> r !== parsedData.room_id);
                break;
            
            case "chat":
                if(!user.rooms.includes(parsedData.room_id)) return;

                try {
                    await db.insert(chatTable).values({roomId: parsedData.room_id, senderId: user?.userid!, message: parsedData.message});
                    users.forEach(u => {
                        if(u.rooms.includes(parsedData.room_id) && u.ws.readyState === WebSocket.OPEN) {
                            u.ws.send(JSON.stringify({type: "chat", message: parsedData.message, room_id: parsedData.room_id}))
                        }
                    })
                } catch (error) {
                    console.error(error)
                }
                break
        }
        
    });

});