"use client"
import { useEffect, useRef, useState } from "react";
import { draw } from "@/draw";


export default function CanvasidPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        
        if(canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw(canvas);
        }

    }, [canvasRef]);

    return (
        <div>
            <canvas ref={canvasRef} ></canvas>
        </div>
    );
}
