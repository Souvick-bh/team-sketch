
export type Shape = {
    type: "rect";
    x: number;
    y: number;
    w: number;
    h: number;
} | {
    type: "circ";
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}