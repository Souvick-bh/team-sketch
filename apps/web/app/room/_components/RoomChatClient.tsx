"use client"

import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Roomchatclient({messages, id}: {messages: {message: string}[], id: string }) {
    const [chats, setChats] = useState(messages);
    const [curMessage, setCurMessage] = useState("");
    const [token, setToken] = useState("");
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token") ?? "";
        setToken(storedToken);
    }, []);

    const socket = useSocket({token});
    const handleMessage = (event: MessageEvent) => {
        const parsedData = JSON.parse(event.data);
        if(parsedData.type == "chat") {
            setChats((c) => [...c, {message:  parsedData.message}])
        }
    }

    useEffect(() => {
        setChats([...messages].reverse());
    }, [messages]);

    useEffect(() => {
        if(!socket) return;

            socket.send(JSON.stringify({
                type: "join_room", room_id: id
            }));

            socket.addEventListener("message", handleMessage);

            return() => {
                socket.send(JSON.stringify({
                    type: "leave_room", room_id: id
                }))
                socket.removeEventListener("message", handleMessage);
            }
    }, [ socket, id])
    return (
        <div>
            {!socket ? (
                <div>Connecting...</div>
            ) : (
                <>
                    <h1>Room chat client</h1>

                    <input
                        type="text"
                        value={curMessage}
                        onChange={(e) => setCurMessage(e.target.value)}
                    />

                    <button
                        onClick={() => {
                            socket.send(
                                JSON.stringify({
                                    type: "chat",
                                    room_id: id,
                                    message: curMessage,
                                })
                            );
                            setCurMessage("");
                        }}
                    >
                        Send
                    </button>

                    <div>
                        {chats.map((m, i) => (
                            <div key={i}>{m.message}</div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
