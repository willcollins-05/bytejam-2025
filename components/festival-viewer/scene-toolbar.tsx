import { Trash2, RotateCw } from "lucide-react";

export default function SceneToolbar(props: {
  rotateItem: () => void;
  selectedId: number | null;
  deleteItem: () => void;
  clearCanvas: () => void;
  updateScale: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedScale: number;
}) {
  return (
    <div className="bg-white shadow-md p-4 flex gap-2 items-center border-b-4 border-gray-200">
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
      <label htmlFor="scale" className="font-semibold text-gray-700">Scale: </label>
      <input
        type="number"
        name="scale"
        id="scale"
        disabled={!props.selectedId}
        step={0.1}
        min={0.1}
        max={10}
        placeholder="Scale"
        value={props.selectedScale}
        className="w-[5.5rem] px-4 py-2 border border-gray-300 rounded-lg bg-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed outline-none"
        onChange={props.updateScale}
      />
      <button
        onClick={props.clearCanvas}
        className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:hover:bg-red-600 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
