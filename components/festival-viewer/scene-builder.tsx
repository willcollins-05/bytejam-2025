"use client";
import React, { useState } from "react";

import {
  AvailableItems,
  CanvasItems,
  ItemGroup,
} from "@/types/festival-viewer-types";
import SceneCanvas from "./scene-canvas";
import SceneToolbar from "./scene-toolbar";
import SceneSidebar from "./scene-sidebar";

export default function SceneBuilder() {
  const [canvasItems, setCanvasItems] = useState<CanvasItems[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<
    CanvasItems | AvailableItems | null
  >(null);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [scale, setScale] = useState<number | null>(null);

  let mouseMoved: boolean = false;

  // Will be changed to the Supabase database once set up
  const groups: ItemGroup[] = [
    {
      id: 1,
      groupName: "Chinese New Year",
      items: [
        {
          id: 1,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern 2",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
        {
          id: 2,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
        {
          id: 3,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern 3",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
      ],
    },
    {
      id: 2,
      groupName: "Chinese New Year 2",
      items: [
        {
          id: 1,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern 2",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
        {
          id: 2,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
        {
          id: 3,
          imagePath: "/images/chineseNewYear/paper-lantern.webp",
          label: "Chinese Lantern 3",
          recommendedSizeX: 60,
          recommendedSizeY: 60,
        },
      ],
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

  const updateScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newScale = parseFloat(e.target.value);
    if (selectedId && !isNaN(newScale) && newScale > 0) {
      if (newScale > 10) {
        newScale = 10;
      }
      if (newScale < 0.1) {
        newScale = 0.1;
      }
      setCanvasItems((prev) =>
        prev.map((item) =>
          item.uniqueId === selectedId ? { ...item, scale: newScale } : item
        )
      );
    }
  };

  const toggleGroup = (groupId: number) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SceneSidebar
        groups={groups}
        expandedGroup={expandedGroup}
        toggleGroup={toggleGroup}
        handleDragStart={handleDragStart}
        handleCanvasDragOver={handleCanvasDragOver}
        handleCanvasDrop={handleCanvasDrop}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <SceneToolbar
          rotateItem={rotateItem}
          selectedId={selectedId}
          deleteItem={deleteItem}
          clearCanvas={clearCanvas}
          updateScale={updateScale}
          selectedScale={
            canvasItems.find((item) => item.uniqueId === selectedId)?.scale || 1
          }
        />

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
