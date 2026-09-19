import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { Shape, ShapeType } from "./shapes/types";
import axios from "axios";

function normalizeRect(x: number, y: number, w: number, h: number) {
    if (w < 0) {
        x += w;
        w = -w;
    }
    if (h < 0) {
        y += h;
        h = -h;
    }
    return { x, y, w, h };
}

async function getExistingShapes(roomid: string): Promise<Shape[]> {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${roomid}`);
        const oldShapes = data.chats ?? [];
        const shapes: Shape[] = [];

        for (const entry of oldShapes as { shapeId: string; message: string }[]) {
            try {
                const shape = JSON.parse(entry.message);
                shapes.push({ ...shape, id: entry.shapeId });
            } catch {
                // skip malformed entries
            }
        }

        return shapes;
    } catch {
        return [];
    }
}

function upsertShape(shapes: Shape[], shape: Shape) {
    const index = shapes.findIndex((s) => s.id === shape.id);
    if (index !== -1) {
        shapes[index] = shape;
    } else {
        shapes.push(shape);
    }
}

function getCanvasPoint(canvas: HTMLCanvasElement, e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    };
}

function distanceToSegment(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;

    if (lengthSq === 0) {
        return Math.hypot(px - x1, py - y1);
    }

    let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));

    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(px - projX, py - projY);
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.setLineDash([]);

    if (shape.type === "rect") {
        const { x, y, w, h } = normalizeRect(shape.x, shape.y, shape.w, shape.h);
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
    } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, shape.startAngle, shape.endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (shape.type === "arrow") {
        const headLength = 10;
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        const angle = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
        ctx.lineTo(
            shape.x2 - headLength * Math.cos(angle - Math.PI / 6),
            shape.y2 - headLength * Math.sin(angle - Math.PI / 6),
        );
        ctx.moveTo(shape.x2, shape.y2);
        ctx.lineTo(
            shape.x2 - headLength * Math.cos(angle + Math.PI / 6),
            shape.y2 - headLength * Math.sin(angle + Math.PI / 6),
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (shape.type === "text") {
        ctx.font = `${shape.fontSize}px Arial`;
        ctx.fillStyle = "black";
        ctx.fillText(shape.text, shape.x, shape.y);
    }
}

function drawSelectionHighlight(ctx: CanvasRenderingContext2D, shape: Shape) {
    ctx.save();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    if (shape.type === "rect") {
        const { x, y, w, h } = normalizeRect(shape.x, shape.y, shape.w, shape.h);
        ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
    } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius + 4, 0, Math.PI * 2);
        ctx.stroke();
    } else if (shape.type === "arrow") {
        const minX = Math.min(shape.x1, shape.x2) - 8;
        const minY = Math.min(shape.y1, shape.y2) - 8;
        const maxX = Math.max(shape.x1, shape.x2) + 8;
        const maxY = Math.max(shape.y1, shape.y2) + 8;
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    } else if (shape.type === "text") {
        ctx.font = `${shape.fontSize}px Arial`;
        const metrics = ctx.measureText(shape.text);
        const height = shape.fontSize;
        ctx.strokeRect(
            shape.x - 4,
            shape.y - height - 4,
            metrics.width + 8,
            height + 8,
        );
    }

    ctx.restore();
}

function redraw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    existingShapes: Shape[],
    selectedShapeId?: string | null,
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of existingShapes) {
        drawShape(ctx, shape);
    }

    if (selectedShapeId) {
        const selected = existingShapes.find((s) => s.id === selectedShapeId);
        if (selected) {
            drawSelectionHighlight(ctx, selected);
        }
    }
}

function isInsideShape(
    x: number,
    y: number,
    shape: Shape,
    ctx?: CanvasRenderingContext2D,
) {
    if (shape.type === "rect") {
        const { x: rx, y: ry, w, h } = normalizeRect(shape.x, shape.y, shape.w, shape.h);
        return x >= rx && x <= rx + w && y >= ry && y <= ry + h;
    }

    if (shape.type === "circle") {
        return Math.hypot(x - shape.x, y - shape.y) <= shape.radius;
    }

    if (shape.type === "arrow") {
        return distanceToSegment(x, y, shape.x1, shape.y1, shape.x2, shape.y2) <= 8;
    }

    if (shape.type === "text" && ctx) {
        ctx.font = `${shape.fontSize}px Arial`;
        const width = ctx.measureText(shape.text).width;
        const height = shape.fontSize;
        return (
            x >= shape.x &&
            x <= shape.x + width &&
            y >= shape.y - height &&
            y <= shape.y
        );
    }

    return false;
}

export async function draw(
    canvas: HTMLCanvasElement,
    roomid: string,
    socket: WebSocket,
    selectedShapeRef: RefObject<ShapeType>,
    selectedShapeIdRef: RefObject<string | null>,
    setTyping: Dispatch<SetStateAction<boolean>>,
    newTextRef: MutableRefObject<string>,
) {
    const existingShapes: Shape[] = await getExistingShapes(roomid);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let sx = 0;
    let sy = 0;
    let ex = 0;
    let ey = 0;
    let start = false;
    let movingShape = false;
    let selectedShape: Shape | null = null;

    let prevX = 0;
    let prevY = 0;

    const render = () => {
        redraw(ctx, canvas, existingShapes, selectedShapeIdRef.current);
    };

    render();

    socket.send(JSON.stringify({
        type: "join_room",
        room_id: roomid,
    }));

    function handleMessage(e: MessageEvent) {
        let data: { type: string; message: string; room_id?: string; id?: string };
        try {
            data = JSON.parse(e.data);
        } catch {
            return;
        }

        if (data.room_id && data.room_id !== roomid) return;

        if (data.type === "draw") {
            try {
                const shape: Shape = JSON.parse(data.message);
                upsertShape(existingShapes, shape);
                render();
            } catch {
                // ignore malformed shape payloads
            }
        }

        if (data.type === "update_shape") {
            try {
                const updatedShape: Shape = JSON.parse(data.message);
                upsertShape(existingShapes, updatedShape);
                render();
            } catch {
                // ignore malformed shape payloads
            }
        }
    }

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    };

    const handleMouseDown = (e: MouseEvent) => {
        const point = getCanvasPoint(canvas, e);
        sx = point.x;
        sy = point.y;

        if (selectedShapeRef.current === "selection") {
            for (let i = existingShapes.length - 1; i >= 0; i--) {
                if (isInsideShape(sx, sy, existingShapes[i], ctx)) {
                    selectedShape = existingShapes[i];
                    selectedShapeIdRef.current = selectedShape.id;
                    movingShape = true;
                    prevX = sx;
                    prevY = sy;
                    render();
                    return;
                }
            }

            selectedShapeIdRef.current = null;
            selectedShape = null;
            render();
            return;
        }

        if (selectedShapeRef.current === "text") return;

        start = true;
    };

    const handleMouseClick = (e: MouseEvent) => {
        if (selectedShapeRef.current === "text") {
            const point = getCanvasPoint(canvas, e);
            start = true;
            sx = point.x;
            sy = point.y;
            setTyping(true);
        }
    };

    function doneTyping() {
        if (!newTextRef.current?.trim()) return;

        const shape: Shape = {
            type: "text",
            id: crypto.randomUUID(),
            x: sx,
            y: sy,
            text: newTextRef.current,
            fontSize: 24,
        };

        upsertShape(existingShapes, shape);
        render();

        socket.send(JSON.stringify({
            type: "draw",
            shapeid: shape.id,
            room_id: roomid,
            message: JSON.stringify(shape),
        }));

        setTyping(false);
        start = false;
    }

    const handleMouseMove = (e: MouseEvent) => {
        const point = getCanvasPoint(canvas, e);
        const x = point.x;
        const y = point.y;

        if (movingShape && selectedShape) {
            const dx = x - prevX;
            const dy = y - prevY;

            if (
                selectedShape.type === "rect" ||
                selectedShape.type === "circle" ||
                selectedShape.type === "text"
            ) {
                selectedShape.x += dx;
                selectedShape.y += dy;
            }

            if (selectedShape.type === "arrow") {
                selectedShape.x1 += dx;
                selectedShape.y1 += dy;
                selectedShape.x2 += dx;
                selectedShape.y2 += dy;
            }

            prevX = x;
            prevY = y;
            render();
            return;
        }

        if (selectedShapeRef.current === "text") return;
        if (!start) return;

        ex = x;
        ey = y;
        render();

        let previewShape: Shape;

        if (selectedShapeRef.current === "rect") {
            const normalized = normalizeRect(sx, sy, ex - sx, ey - sy);
            previewShape = {
                type: "rect",
                id: "",
                x: normalized.x,
                y: normalized.y,
                w: normalized.w,
                h: normalized.h,
            };
        } else if (selectedShapeRef.current === "circle") {
            previewShape = {
                type: "circle",
                id: "",
                x: sx,
                y: sy,
                radius: Math.hypot(ex - sx, ey - sy),
                startAngle: 0,
                endAngle: Math.PI * 2,
            };
        } else {
            previewShape = { type: "arrow", id: "", x1: sx, y1: sy, x2: ex, y2: ey };
        }

        drawShape(ctx, previewShape);
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (movingShape) {
            movingShape = false;

            if (selectedShape) {
                upsertShape(existingShapes, selectedShape);
                render();

                socket.send(JSON.stringify({
                    type: "update_shape",
                    room_id: roomid,
                    id: selectedShape.id,
                    message: JSON.stringify(selectedShape),
                }));
            }

            selectedShape = null;
            return;
        }

        if (selectedShapeRef.current === "text") return;
        if (!start) return;

        start = false;

        const point = getCanvasPoint(canvas, e);
        ex = point.x;
        ey = point.y;

        let shape: Shape;

        if (selectedShapeRef.current === "rect") {
            const normalized = normalizeRect(sx, sy, ex - sx, ey - sy);
            shape = {
                type: "rect",
                id: crypto.randomUUID(),
                x: normalized.x,
                y: normalized.y,
                w: normalized.w,
                h: normalized.h,
            };
        } else if (selectedShapeRef.current === "circle") {
            shape = {
                type: "circle",
                id: crypto.randomUUID(),
                x: sx,
                y: sy,
                radius: Math.hypot(ex - sx, ey - sy),
                startAngle: 0,
                endAngle: Math.PI * 2,
            };
        } else {
            shape = {
                type: "arrow",
                id: crypto.randomUUID(),
                x1: sx,
                y1: sy,
                x2: ex,
                y2: ey,
            };
        }

        upsertShape(existingShapes, shape);
        render();

        socket.send(JSON.stringify({
            type: "draw",
            shapeid: shape.id,
            room_id: roomid,
            message: JSON.stringify(shape),
        }));
    };

    socket.addEventListener("message", handleMessage);
    window.addEventListener("resize", handleResize);

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return {
        doneTyping,
        cleanup: () => {
            socket.removeEventListener("message", handleMessage);
            window.removeEventListener("resize", handleResize);

            canvas.removeEventListener("click", handleMouseClick);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);

            socket.send(JSON.stringify({
                type: "leave_room",
                room_id: roomid,
            }));
        },
    };
}
