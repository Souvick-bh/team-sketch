"use client"
import React from "react";
import { ShapeType } from "@/draw/shapes/types";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Header({setSelectedShape}: {setSelectedShape: (value: ShapeType) => void}) {
    const [selected, setSelected] = React.useState<ShapeType>("rect");

    function selectShape(shape: ShapeType) {
        setSelected(shape);
        setSelectedShape(shape);
    }

    return (
        <div className="flex flex-row  rounded-2xl text-2xl bg-gray-50 border border-[#a0a0a0] ">

            <button onClick={() => selectShape("rect")} className={`pl-4 pr-4 py-2 rounded-bl-2xl rounded-tl-2xl  hover:cursor-pointer ${selected === "rect" ? "bg-[#cacaca]" : ""}`}>
                <RiRectangleLine />
            </button>

            <button onClick={() => selectShape("circle")} className={`px-4 py-2 h hover:cursor-pointer ${selected === "circle" ? "bg-[#cacaca]" : ""}`}>
                <FaRegCircle />
            </button>

            <button onClick={() => selectShape("arrow")} className={`pl-4 pr-4 py-2 rounded-br-2xl rounded-tr-2xl  hover:cursor-pointer ${selected === "arrow" ? "bg-[#cacaca]" : ""}`}>
                <FaArrowLeftLong />
            </button>

        </div>
    );
}
