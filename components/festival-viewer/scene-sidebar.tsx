import { AvailableItems, ItemGroup, CanvasItems } from "@/types/festival-viewer-types";

export default function SceneSidebar(props: {
    groups: ItemGroup[];
    expandedGroup: number | null;
    toggleGroup: (groupId: number) => void;
    handleDragStart: (
        e: React.DragEvent<HTMLDivElement>,
        item: AvailableItems | CanvasItems
    ) => void;
    handleCanvasDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleCanvasDrop: (e: React.DragEvent<HTMLDivElement>) => void;

}) {
  return (
    <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Items</h2>
      <div className="space-y-2">
        {props.groups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move transition-colors border-2 border-transparent"
          >
            <button
              onClick={() => props.toggleGroup(group.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                {group.groupName}
              </span>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  props.expandedGroup === group.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {props.expandedGroup === group.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="align-center">
                  {group.items.map((item: AvailableItems) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => props.handleDragStart(e, item)}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.imagePath}
                        alt={item.label}
                        className="w-24 h-24 object-contain justify-self-center"
                      />
                      <p className="text-center font-medium text-gray-700 justify-self-center">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
