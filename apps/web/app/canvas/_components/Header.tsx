"use client"
import React from "react";
import { ShapeType } from "@/draw/shapes/types";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineTextFields } from "react-icons/md";
import { LuMousePointer2 } from "react-icons/lu";

export default function Header({ typing, setSelectedShape, setTyping}: {
    typing: boolean;
    setSelectedShape: (value: ShapeType) => void;
    setTyping: (value: boolean) => void;
}) {
    const [selected, setSelected] = React.useState<ShapeType>("selection");

    function selectShape(shape: ShapeType) {
        setSelected(shape);
        setSelectedShape(shape);
        if(shape !== "text" && typing){
            setTyping(false);
        }
    }

    return (
        <div className="flex flex-row  rounded-2xl text-2xl bg-gray-50 border border-[#a0a0a0] ">

            <button onClick={() => selectShape("selection")}
                className={`pl-4 pr-4 py-2 rounded-bl-2xl rounded-tl-2xl hover:cursor-pointer ${
                    selected === "selection" ? "bg-[#cacaca]" : ""}`}>
                <LuMousePointer2 />
            </button>

            <button onClick={() => selectShape("rect")} className={`px-4 py-2  hover:cursor-pointer ${selected === "rect" ? "bg-[#cacaca]" : ""}`}>
                <RiRectangleLine />
            </button>

            <button onClick={() => selectShape("circle")} className={`px-4 py-2  hover:cursor-pointer ${selected === "circle" ? "bg-[#cacaca]" : ""}`}>
                <FaRegCircle />
            </button>

            <button onClick={() => selectShape("arrow")} className={`px-4 py-2  hover:cursor-pointer ${selected === "arrow" ? "bg-[#cacaca]" : ""}`}>
                <FaArrowLeftLong />
            </button>

            <button onClick={() => { selectShape("text") }}
                className={`pl-4 pr-4 py-2 rounded-br-2xl rounded-tr-2xl hover:cursor-pointer ${selected === "text" ? "bg-[#cacaca]" : ""}`}>
                <MdOutlineTextFields />
            </button>

        </div>
    );
}
