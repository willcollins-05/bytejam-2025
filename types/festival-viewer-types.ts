export interface AvailableItems {
    id: number;
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

export interface ItemGroup {
    id: number;
    groupName: string;
    items: AvailableItems[];
}