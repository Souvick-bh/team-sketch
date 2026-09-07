"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Roomchatclient from "../_components/RoomChatClient";

interface Chat {
    id: number;
    roomid: string;
    senderId: number;
    message: string;
    createdAt: string
}

export default function RoomidPage() {
    const [chats, setChats] = useState<Chat[]>([]);
    const {roomid} = useParams<{roomid: string}>();

    async function getRoomChats() {
        if(roomid.trim()=="") {
            alert("Enter RoomID");
            return;
        }
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/chats`, {roomid});
            setChats(data.chats)
        } catch (error) {
            console.error(error)
            alert("fata bhai...")
        }
    }

    useEffect(() => {
        getRoomChats();
    }, [])
    return (
        <div>
            <h1>RoomID : {roomid}</h1>

            <Roomchatclient id={roomid} messages={chats.map(c => ({message: c.message}))}/>

            {/* <div className="mt-6 flex flex-col gap-3">
                {chats.length === 0 ? (
                <p>No chats found.</p>
                ) : (
                chats.map((chat) => (
                    <div
                    key={chat.id}
                    className="border border-gray-500 rounded p-3"
                    >
                    <p>
                        <strong>Sender:</strong> {chat.senderId}
                    </p>
                    <p>{chat.message}</p>
                    <p className="text-sm text-gray-400">
                        {new Date(chat.createdAt).toLocaleString()}
                    </p>
                    </div>
                ))
                )}
            </div> */}
        </div>
    );
}
