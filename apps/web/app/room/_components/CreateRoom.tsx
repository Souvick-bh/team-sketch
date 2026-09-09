"use client";

import axios from "axios";
import React, { useState } from "react";

export default function CreateRoomComp({setCreatedid, setCreate}: {
    setCreatedid: (value: string) => void;
    setCreate: (value: boolean) => void;
}) {
    const [form, setForm] = useState({roomName: ""});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (form.roomName.trim() === "") {
            alert("Put Room name");
            return;
        }

        try {
            setLoading(true);
            const roomCreateResp = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL!}/api/room/create`,
                { name: form.roomName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // alert(JSON.stringify(roomCreateResp.data));
            
            setCreatedid(roomCreateResp.data.roomId);
            setCreate(false);
        } catch (error) {
            alert("Something went wrong...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 text-center">
            <div>
                {/* <h2 className="text-xl font-semibold tracking-tight">
                    Create Room
                </h2> */}
                <p className="mt-1 mb-2 text-sm text-neutral-500">
                    Start a new collaborative session.
                </p>
            </div>

            <form
                onSubmit={handleCreate}
                className="flex flex-col gap-4"
            >
                <input
                    className="w-full rounded-xl
                        border border-neutral-200  bg-white   px-4 py-3 text-sm
                        outline-none  transition-all duration-300
                        placeholder:text-neutral-400  focus:border-neutral-400
                    "
                    type="text"
                    name="roomName"
                    value={form.roomName}
                    onChange={handleChange}
                    placeholder="Room name"
                />

                <button
                    className="rounded-xl
                        bg-neutral-900 px-4 py-3 text-sm
                        font-medium  text-white transition-all
                        duration-300 hover:bg-neutral-800 active:scale-[0.98] hover:cursor-pointer
                    "
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Room"}
                </button>
            </form>
        </div>
    );
}