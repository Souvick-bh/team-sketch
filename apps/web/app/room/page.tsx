"use client"

import axios from "axios";
import React, { useState } from "react";

export default function RoomPage() {
    const [form, setForm] = useState({
        roomName: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }
    const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(form.roomName.trim() === "") {
            alert("Put Room name")
        } else {
            try {
                const roomCreateResp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/room/create`, {name: form.roomName}, {headers:  {Authorization: `Bearer ${token}`}} );
                const roomDetails = JSON.stringify(roomCreateResp.data)
                alert(`${roomDetails}`);
            } catch (error) {
                alert("Something faat gaya...");
            }
        }
    }
    return (
        <div>
            <h1>RoomPage</h1>
            <form className="flex gap-2" onSubmit={handleCreate}>
                <span className="flex px-5 py-1 gap-6 max-w-50 border rounded-sm border-white">
                    <label >Name</label>
                    <input className="text-center border-none focus:outline-none" type="text" name="roomName" value={form.roomName} onChange={handleChange} placeholder=""/>
                </span>

                <button className="text-center px-5 py-1 gap-6 border rounded-sm border-white" type="submit">Create</button>
            
            </form>
        </div>
    );
}
