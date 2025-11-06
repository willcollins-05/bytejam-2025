import { CanvasItems } from '@/types/festival-viewer-types';


export default function SceneViewOnly(props: {
    canvasItems: CanvasItems[];
}) {
    return (
        <div
            className="w-full h-full bg-white dark:bg-gray-800 shadow-inner relative overflow-hidden"
          >
            {props.canvasItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
                Drag items from the sidebar to build your scene
              </div>
            )}

            {props.canvasItems.map((item) => (
              <div
                key={item.uniqueId}
                className={`absolute select-none`}
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