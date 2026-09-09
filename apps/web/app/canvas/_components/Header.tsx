"use client"
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Header() {
    return (
        <div className="flex flex-row gap-4 px-10 text-2xl rounded-2xl bg-amber-100 border border-[#a0a0a0] ">

            <div className="px-2 py-2 hover:bg-amber-200">
                <RiRectangleLine />
            </div>

            <div className="px-2 py-2 hover:bg-amber-200">
                <FaRegCircle />
            </div>

            <div className="px-2 py-2 hover:bg-amber-200">
                <FaArrowLeftLong />
            </div>

        </div>
    );
}
