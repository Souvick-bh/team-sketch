"use client"
import { useEffect, useRef, useState } from "react";
import { ShapeType } from "@/draw/shapes/types";
import { draw } from "@/draw";
import Header from "../_components/Header";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";


export default function CanvasidPage() {
    const [token, setToken] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {canvasid} = useParams<{canvasid: string}>();
    const [selectedShape, setSelectedShape] = useState<ShapeType>("selection");
    const selectedShapeRef = useRef<ShapeType>("selection");
    const selectedShapeIdRef = useRef<string | null>(null);
    const [typing, setTyping] = useState(false);
    const [newtext, setNewtext] = useState("");
    const newTextRef = useRef("");
    const doneTypingRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "")
    }, []);

    useEffect(() => {
        selectedShapeRef.current = selectedShape;
    }, [selectedShape]);

    useEffect(() => {
        newTextRef.current = newtext;
    }, [newtext]);

    const socket = useSocket({token});
    

    useEffect(() => {
        if(!canvasRef.current || !socket || !selectedShape) return;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
         let cleanup: (() => void) | undefined;

        async function init() {
            const result = await draw(canvas, canvasid, socket!, selectedShapeRef, selectedShapeIdRef, setTyping, newTextRef);
            if(result) {
                doneTypingRef.current = result.doneTyping;
                cleanup = result.cleanup;
            }

        }

        init();
        return () => {
            if(cleanup) {
                cleanup();
            }
        };
    }, [canvasid, socket]);

    function saveText(){
        if(doneTypingRef.current){
            doneTypingRef.current();
        }
        setNewtext("");
    }

    return (
        <div className="relative w-screen h-screen">
            
            <canvas  ref={canvasRef} className="absolute inset-0"></canvas>

            <div>
                {typing && 
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">

                    <textarea
                        autoFocus
                        value={newtext}
                        onChange={(e)=>setNewtext(e.target.value)}
                        placeholder="Type..."
                        className="w-72 h-32 resize-none rounded-lg border
                        border-neutral-200 bg-white p-3 text-sm text-neutral-900
                        placeholder:text-neutral-400 shadow-sm outline-none
                        focus:border-neutral-300"
                    />


                    <button
                        onClick={saveText}
                        className="self-end rounded-md bg-neutral-900 px-4 py-2
                        text-sm font-medium text-white transition-colors
                        hover:bg-neutral-800 active:scale-95"
                    >
                        Save
                    </button>

                </div>}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto absolute top-4 left-1/2 -translate-x-1/2">
                    <Header typing={typing} setSelectedShape={setSelectedShape} setTyping={setTyping}/>
                </div>
            </div>

        </div>
    );
}
