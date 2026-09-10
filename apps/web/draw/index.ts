import { Shape, ShapeType } from "./shapes/types";
import axios from "axios";

async function getExistingShapes(roomid: string) {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${roomid}`)
    const oldShapes = data.chats ?? [];

    return oldShapes.map((x: {message: string}) => {
        return JSON.parse(x.message);
    })
}

function drawShape( ctx: CanvasRenderingContext2D,shape: Shape) {
    if(shape.type == "rect") {
        ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
    } else if(shape.type == "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, shape.startAngle, shape.endAngle);
        ctx.stroke();
    } else if(shape.type == "arrow") {
        const headLength = 10;
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        const angle = Math.atan2(shape.y2-shape.y1, shape.x2-shape.x1);
        ctx.lineTo(shape.x2 - headLength * Math.cos(angle - Math.PI / 6),
        shape.y2 - headLength * Math.sin(angle - Math.PI / 6) );
        ctx.moveTo(shape.x2, shape.y2);
        ctx.lineTo(shape.x2 - headLength * Math.cos(angle + Math.PI / 6),
            shape.y2 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }
}

function redraw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, existingShapes: Shape[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const shape of existingShapes) {
        drawShape(ctx, shape);
    }
}


export async function draw(canvas: HTMLCanvasElement, roomid: string, socket: WebSocket, selectedShapeRef: React.RefObject<ShapeType>) {

    const existingShapes: Shape[] = await getExistingShapes(roomid);

    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    let sx=0,sy=0,ex=0,ey=0;
    let start = false;

    // Draw all previously stored shapes
    redraw(ctx, canvas, existingShapes);

    //  Join room - common
    socket.send(JSON.stringify({
        type: "join_room",
        room_id: roomid
    }));

    // Broadcast to everyone on drawing something
    function handleMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);
        if(data.type == "draw") {
            const shape: Shape = JSON.parse(data.message);
            existingShapes.push(shape);
            redraw(ctx!, canvas, existingShapes);
        }
    }

    const handleMouseDown = (e: MouseEvent) => {
        start = true;
        sx=e.clientX;sy=e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if(!start) return;
        ex=e.clientX; ey=e.clientY; 
        redraw(ctx, canvas, existingShapes);
        let previewShape: Shape ;
        if(selectedShapeRef.current  == "rect") {
            previewShape = {type: "rect",x: sx,y: sy,w: ex-sx,h: ey-sy}
        } else if(selectedShapeRef.current  == "circle") {
            previewShape = {type: "circle",x:sx,y:sy,
                radius:Math.sqrt((ex-sx)**2 +(ey-sy)**2), startAngle:0, endAngle:Math.PI*2}
        } else {
            previewShape = { type:"arrow", x1:sx, y1:sy, x2:ex, y2:ey};
        }
        drawShape(ctx, previewShape);
    }

    const handleMouseUp = (e: MouseEvent) => {
        if(!start) return;
        start = false;
        let shape: Shape;
        ex=e.clientX; ey=e.clientY; 
        if(selectedShapeRef.current  == "rect") {
            shape = {type: "rect",x: sx,y: sy,w: ex-sx,h: ey-sy}
        } else if(selectedShapeRef.current  == "circle") {
            shape = {type: "circle",x:sx,y:sy,
                radius:Math.sqrt((ex-sx)**2 +(ey-sy)**2), startAngle:0, endAngle:Math.PI*2}
        } else {
            shape = { type:"arrow", x1:sx, y1:sy, x2:ex, y2:ey};
        }
        existingShapes.push(shape);
        redraw(ctx, canvas, existingShapes);
        socket.send(JSON.stringify({type: "draw", room_id: roomid, message: JSON.stringify(shape)}))
    }

    socket.addEventListener("message", handleMessage);

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
        socket.removeEventListener("message", handleMessage);

        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);

        socket.send(JSON.stringify({
            type:"leave_room",
            room_id:roomid
        }));
    }
}
