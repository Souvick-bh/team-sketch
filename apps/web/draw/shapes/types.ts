
export type Shape = {
    type: "rect";
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
} | {
    type: "circle";
    id: string;
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
} | {
    type: "arrow";
    id: string;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
} | {
      type: "text";
      id: string;
      x: number;
      y: number;
      text: string;
      fontSize: number;
    } ;

export type ShapeType =
    | "selection"
    | Shape["type"];