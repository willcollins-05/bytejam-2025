import { AvailableItems, CanvasItems } from '@/types/festival-viewer-types';

export default function SceneCanvas(props: {
    handleCanvasDragOver: (e: React.DragEvent) => void;
    handleCanvasDrop: (e: React.DragEvent) => void;
    canvasItems: CanvasItems[];
    selectedId: number | null;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    handleItemMouseDown: (e: React.MouseEvent, item: CanvasItems) => void;
    onClick: (e: React.MouseEvent, item: CanvasItems) => void;
}) {
    return (
        <div
            className="w-full h-full bg-white rounded-lg shadow-inner relative overflow-hidden"
            onDragOver={props.handleCanvasDragOver}
            onDrop={props.handleCanvasDrop}
            onClick={() => props.setSelectedId(null)}
          >
            {props.canvasItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
                Drag items from the sidebar to build your scene
              </div>
            )}

            {props.canvasItems.map((item) => (
              <div
                key={item.uniqueId}
                onMouseDown={(e) => props.handleItemMouseDown(e, item)}
                onClick={(e) => props.onClick(e, item)}
                className={`absolute cursor-move select-none ${
                  props.selectedId === item.uniqueId ? 'ring-4 ring-blue-400' : ''
                }`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                  fontSize: '60px',
                  width: `${item.recommendedSizeX}px`,
                  height: `${item.recommendedSizeY}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img className="w-full h-full object-contain" src={item.imagePath} alt={item.label} draggable='false' />
              </div>
            ))}
          </div>
    )
}