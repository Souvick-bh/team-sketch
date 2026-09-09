"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Roomchats({cretedid }: {cretedid: string}) {
    const [roomid, setRoomid] = useState(cretedid ?? "");
    const router = useRouter();

    const handleJoin = () => {
        if (roomid.trim() === "") {
            alert("Enter Room ID");
            return;
        }

        router.push(`/canvas/${roomid}`);
    };

    return (
        <div className="flex flex-col gap-6 text-center">
            <div>
                {/* <h2 className="text-xl font-semibold tracking-tight">
                    Join Room
                </h2> */}

                <p className="mt-1 mb-2 text-sm text-neutral-500">
                    Enter a room ID to continue collaborating.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <input
                    className="
                        w-full
                        rounded-xl
                        border border-neutral-200
                        bg-white
                        px-4 py-3
                        text-sm
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-neutral-400
                        focus:border-neutral-400
                    "
                    type="text"
                    name="roomid"
                    value={roomid}
                    onChange={(e) => setRoomid(e.target.value)}
                    placeholder="Room ID"
                />

                <button
                    className="
                        rounded-xl
                        bg-neutral-900
                        px-4 py-3
                        text-sm
                        font-medium
                        text-white
                        transition-all
                        duration-300
                        hover:bg-neutral-800
                        active:scale-[0.98] hover:cursor-pointer
                    "
                    type="button"
                    onClick={handleJoin}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
}