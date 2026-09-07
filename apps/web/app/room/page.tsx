"use client"
import axios from "axios";
import React, { useState } from "react";
import CreateRoomComp from "./_components/CreateRoom";
import Roomchats from "./_components/RoomChats";

export default function RoomPage() {
    
    return (
        <div className="flex flex-col gap-8">
            <h1>RoomPage</h1>
            <div>
                <CreateRoomComp />
            </div>

            <div>
                <Roomchats />
            </div>
        </div>
    );
}
