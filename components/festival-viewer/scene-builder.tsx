"use client";
import React, { useState } from "react";
import { Trash2, RotateCw } from "lucide-react";
import { AvailableItems, CanvasItems } from "@/types/festival-viewer-types";
import SceneCanvas from "./scene-canvas";

export default function SceneBuilder() {
  const [canvasItems, setCanvasItems] = useState<CanvasItems[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<
    CanvasItems | AvailableItems | null
  >(null);

  let mouseMoved: boolean = false;

  // Available images/emojis to drag
  const availableItems: AvailableItems[] = [
    {
      group: "chineseNewYear",
      id: "chineseNewYear",
      imagePath: "/images/chineseNewYear/paper-lantern.webp",
      label: "Lantern",
      recommendedSizeX: 90,
      recommendedSizeY: 90,
    },
  ];

  const handleDragStart = (
    e: React.DragEvent,
    item: AvailableItems | CanvasItems
  ) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newItem: CanvasItems = {
      ...draggedItem,
      uniqueId: Date.now() + Math.random(),
      x: x - 30,
      y: y - 30,
      rotation: 0,
      scale: 1,
    };

    setCanvasItems([...canvasItems, newItem]);
    if (mouseMoved) {
      setDraggedItem(null);
    }
  };

  const onClick = (e: React.MouseEvent, item: CanvasItems) => {
    e.stopPropagation();
    mouseMoved = false;

    setSelectedId(item.uniqueId);
  };

  const handleItemMouseDown = (e: React.MouseEvent, item: CanvasItems) => {
    e.stopPropagation();
    setSelectedId(item.uniqueId);

    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - item.x;
    const offsetY = e.clientY - rect.top - item.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - rect.left - offsetX;
      const newY = moveEvent.clientY - rect.top - offsetY;
      mouseMoved = true;
      setCanvasItems((prev) =>
        prev.map((i) =>
          i.uniqueId === item.uniqueId ? { ...i, x: newX, y: newY } : i
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const deleteItem = () => {
    if (selectedId) {
      setCanvasItems(
        canvasItems.filter((item) => item.uniqueId !== selectedId)
      );
      setSelectedId(null);
    }
  };

  const rotateItem = () => {
    if (selectedId) {
      setCanvasItems(
        canvasItems.map((item) =>
          item.uniqueId === selectedId
            ? { ...item, rotation: (item.rotation + 45) % 360 }
            : item
        )
      );
    }
  };

  const clearCanvas = () => {
    setCanvasItems([]);
    setSelectedId(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Items</h2>
        <div className="space-y-2">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-blue-300"
            >
              <img
                src={item.imagePath}
                alt={item.label}
                className="w-12 h-12 object-contain"
                draggable="false"
              />
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white shadow-md p-4 flex gap-2 items-center">
          <button
            onClick={rotateItem}
            disabled={!selectedId}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCw size={18} />
            Rotate
          </button>
          <button
            onClick={deleteItem}
            disabled={!selectedId}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={18} />
            Delete
          </button>
          <button
            onClick={clearCanvas}
            className="ml-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Canvas */}
        <SceneCanvas
          handleCanvasDragOver={handleCanvasDragOver}
          handleCanvasDrop={handleCanvasDrop}
          canvasItems={canvasItems}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleItemMouseDown={handleItemMouseDown}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
