"use client";

import { useState } from "react";
import CreateRoomComp from "./_components/CreateRoom";
import Roomchats from "./_components/RoomChats";
import { Logo } from "../_components/NavBar";

export default function RoomPage() {
    const [create, setCreate] = useState(true);
    const [cretedid, setCreatedid] = useState("");

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6">

                <div className="absolute top-5 left-5">
                    <Logo />
                </div>

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight md:text-2xl">
                        <button onClick={() => setCreate(true)} className={`transition-all duration-300 ease-in-out ${create ? "text-neutral-900" : "text-neutral-400"}`}>Create new Room</button>
                        <br />
                        or
                        <br />
                        <button onClick={() => setCreate(false)} className={`transition-all duration-300 ease-in-out  ${create ? "text-neutral-400" : "text-neutral-900"}`}>Join a Room</button>
                    </h1>

                    {/* <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
                        Collaborate with others in real time. Create a new room
                        or join an existing one to start drawing together.
                    </p> */}
                </div>

                <div className="w-full max-w-md">
                    {create ? <CreateRoomComp setCreatedid={setCreatedid} setCreate={setCreate}/> : <Roomchats cretedid={cretedid} />}
                </div>

            </div>
        </main>
    );
}