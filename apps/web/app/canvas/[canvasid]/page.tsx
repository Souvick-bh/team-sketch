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
    const [selectedShape, setSelectedShape] = useState<ShapeType>("rect");
    const selectedShapeRef = useRef<ShapeType>("rect");

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "")
    }, []);

    useEffect(() => {
        selectedShapeRef.current = selectedShape;
    }, [selectedShape]);

    const socket = useSocket({token});
    

    useEffect(() => {
        if(!canvasRef.current || !socket || !selectedShape) return;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
         let cleanup: (() => void) | undefined;

        async function init() {
            cleanup = await draw(canvas, canvasid, socket!, selectedShapeRef);
        }
        init();
        return () => {
            if(cleanup) {
                cleanup();
            }
        };
    }, [canvasid, socket]);

    return (
        <div className="relative w-screen h-screen">
            
            <canvas  ref={canvasRef} className="absolute inset-0"></canvas>

            <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto absolute top-4 left-1/2 -translate-x-1/2">
                    <Header setSelectedShape={setSelectedShape} />
                </div>
            </div>

        </div>
    );
}
