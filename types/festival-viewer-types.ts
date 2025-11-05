export interface AvailableItems {
    group: string;
    id: string;
    imagePath: string;
    label: string;
    recommendedSizeX?: number;  // Size suggestions for the canvas
    recommendedSizeY?: number;
}

export interface CanvasItems extends AvailableItems {
    uniqueId: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}