"use client"

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



export default function Roomchats() {
    const [roomid, setRoomid] = useState("");
    const router = useRouter();

    return (
        <div>
            <h1>Room Chats</h1>
            <div className="flex flex-col gap-2">
                <div className="flex px-5 py-1 gap-6 max-w-70 border rounded-sm border-white">
                    <label >RoomID</label>
                    <input className="text-center border-none focus:outline-none" type="text" name="roomid" value={roomid} onChange={(e) => setRoomid(e.target.value)} placeholder="AcHdnoEY"/>
                </div>

                <button className="text-center px-5 py-1 max-w-35 gap-6 border rounded-sm border-white" type="submit" onClick={() => router.push(`/room/${roomid}`)}>Join Room</button>
            
            </div>

        </div>
    );
}
