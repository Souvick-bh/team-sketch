import { Shape } from "./shapes/types";
import axios from "axios";

async function getExistingShapes(roomid: string) {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${roomid}`)
    const allShapes = data.chats ?? [];

    const shapes = allShapes.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    })
    return shapes;
}

function redraw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shapes: Shape[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const shape of shapes) {
        if(shape.type == "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
        }
    }
    // ctx.strokeRect(sx, sy, ex-sx, ey-sy);
}


export async function draw(canvas: HTMLCanvasElement, roomid: string, socket: WebSocket) {

    const shapes: Shape[] = await getExistingShapes(roomid);

    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    let sx=0,sy=0,ex=0,ey=0;
    let start = false;

    redraw(ctx, canvas, shapes);

    socket.send(JSON.stringify({
        type: "join_room",
        room_id: roomid
    }));

    function handleMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);
    if(data.type == "draw") {
        const shape: Shape = JSON.parse(data.message);
        shapes.push(shape);
        redraw(ctx!, canvas, shapes);
    }
}

    // ctx.strokeRect(25, 25, 100, 100);

    socket.addEventListener("message", (e) => handleMessage(e))

    canvas.addEventListener("mousedown", (e) => {
        start = true;
        sx=e.clientX; sy=e.clientY; 
        console.log(`${e.clientX}  ${e.clientY}`);
    });

    canvas.addEventListener("mousemove", (e) => {
        if(start) {
            ex=e.clientX; ey=e.clientY; 
            console.log(`${e.clientX}  ${e.clientY}`);
            redraw(ctx, canvas, shapes);
            ctx.strokeRect(sx, sy, ex-sx, ey-sy);
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        start = false;
        ex=e.clientX; ey=e.clientY; 
        console.log(`${e.clientX}  ${e.clientY}`);
        shapes.push({type: "rect",x:sx, y:sy, w:ex-sx, h:ey-sy});
        redraw(ctx, canvas, shapes);
        socket.send(JSON.stringify({type: "draw", room_id: roomid, message: JSON.stringify({type: "rect",x:sx, y:sy, w:ex-sx, h:ey-sy})}))
        
    });

    return () => {
        socket.removeEventListener("message", handleMessage);

        socket.send(JSON.stringify({
            type:"leave_room",
            room_id:roomid
        }));
    }
}
