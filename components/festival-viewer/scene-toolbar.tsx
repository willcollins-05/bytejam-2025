import { Trash2, RotateCw } from "lucide-react";

export default function SceneToolbar(props: {
    rotateItem: () => void;
    selectedId: number | null;
    deleteItem: () => void;
    clearCanvas: () => void;
}) {
    return (
        <div className="bg-white shadow-md p-4 flex gap-2 items-center">
          <button
            onClick={props.rotateItem}
            disabled={!props.selectedId}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCw size={18} />
            Rotate
          </button>
          <button
            onClick={props.deleteItem}
            disabled={!props.selectedId}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={18} />
            Delete
          </button>
          <button
            onClick={props.clearCanvas}
            className="ml-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>
    )
}