
export type Shape = {
    type: "rect";
    x: number;
    y: number;
    w: number;
    h: number;
} | {
    type: "circle";
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
} | {
    type: "arrow";
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export type ShapeType = Shape["type"];