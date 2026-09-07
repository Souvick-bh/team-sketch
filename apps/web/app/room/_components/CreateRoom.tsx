"use client"

import axios from "axios";
import React, { useState } from "react";

export default function CreateRoomComp() {
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
            <h1>Create Room</h1>
            <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                <div className="flex px-5 py-1 gap-6 max-w-70 border rounded-sm border-white">
                    <label >Name</label>
                    <input className="text-center border-none focus:outline-none" type="text" name="roomName" value={form.roomName} onChange={handleChange} placeholder="session 1"/>
                </div>

                <button className="text-center px-5 py-1 max-w-22 gap-6 border rounded-sm border-white" type="submit">Create</button>
            
            </form>
        </div>
    );
}
