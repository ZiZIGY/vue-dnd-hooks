import { IBoundingBox, IGrid, IPoint } from "../types";
export declare const checkCollision: (boxA: IBoundingBox, boxB: IBoundingBox) => boolean;
export declare const getBoundingBox: (element: HTMLElement | null) => IBoundingBox;
export declare const getCenter: (box: IBoundingBox) => IPoint;
export declare const getOffset: (element: HTMLElement | null, pointer: IPoint) => {
    pixel: {
        x: number;
        y: number;
    };
    percent: {
        x: number;
        y: number;
    };
};
export declare const getDelta: (pointA: IPoint, pointB: IPoint) => IPoint;
export declare const getDirection: (delta: IPoint) => "up" | "right" | "down" | "left";
export declare const getDistance: (pointA: IPoint, pointB: IPoint) => number;
export declare const getAngle: (pointA: IPoint, pointB: IPoint) => number;
export declare const createGrid: (element: HTMLElement, options?: IGrid) => IPoint[];
