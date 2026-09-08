import { Shape } from "./shapes/types";

export function draw(canvas: HTMLCanvasElement) {

    const shapes: Shape[] = [];

    const ctx = canvas.getContext("2d");

    let sx=0,sy=0,ex=0,ey=0;
    let start = false;

    if(!ctx) return;
    // ctx.strokeRect(25, 25, 100, 100);
    canvas.addEventListener("mousedown", (e) => {
        start = true;
        sx=e.clientX; sy=e.clientY; 
        console.log(`${e.clientX}  ${e.clientY}`);
    });

    canvas.addEventListener("mousemove", (e) => {
        if(start) {
            ex=e.clientX; ey=e.clientY; 
            console.log(`${e.clientX}  ${e.clientY}`);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const shape of shapes) {
                if(shape.type == "rect") {
                    ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
                }
            }
            ctx.strokeRect(sx, sy, ex-sx, ey-sy);
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        start = false;
        ex=e.clientX; ey=e.clientY; 
        console.log(`${e.clientX}  ${e.clientY}`);
        ctx.strokeRect(sx, sy, ex-sx, ey-sy);
        shapes.push({type: "rect",x:sx, y:sy, w:ex-sx, h:ey-sy});
    });
}
