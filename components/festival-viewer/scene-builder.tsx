"use client";
import React, { useState, useEffect } from "react";

import {
  AvailableItems,
  CanvasItems,
  ItemGroup,
} from "@/types/festival-viewer-types";
import {
  createNewFestival,
  updateFestivalPlacedProps,
  getFestivalById,
} from "@/lib/supabase/queries";
import { useSession } from "next-auth/react";

import SceneCanvas from "./scene-canvas";
import SceneToolbar from "./scene-toolbar";
import SceneSidebar from "./scene-sidebar";

export default function SceneBuilder(props: {
  itemGroups: ItemGroup[];
  isNew: boolean;
  id: number;
}) {
  const { data: session, status } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [canvasItems, setCanvasItems] = useState<CanvasItems[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<
    CanvasItems | AvailableItems | null
  >(null);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [festivalName, setFestivalName] = useState<string>(
    `${session?.user.name}'s Festival`
  );
  let mouseMoved: boolean = false;

  useEffect(() => {
    setFestivalName(`${session?.user.name}'s Festival`);
  }, [session, status]);

  if (!isLoggedIn && session?.user.id !== null && status === "authenticated") {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const loadFestivalById = async () => {
      const festivalData = await getFestivalById(props.id);
      setFestivalName(festivalData.name);
      console.log(festivalData);
      setCanvasItems(festivalData.placed_props_json);
    };

    if (props.id !== -1 && props.id !== null) {
      loadFestivalById();
    }
  }, []);

  // Will be changed to the Supabase database once set up
  const groups: ItemGroup[] = props.itemGroups;

  const handleOnSave = async () => {
    if (props.isNew) {
      // Create festival on save
      const response = await createNewFestival(
        festivalName,
        Number(session?.user.id),
        canvasItems
      );
      console.log(response);
    } else {
      // Update festival
      const response = await updateFestivalPlacedProps(
        props.id ? props.id : -1,
        canvasItems
      );
      console.log(props.id);
      console.log(response);
    }
  };

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
    setCanvasItems((prev) =>
      prev.map((item) =>
        item.uniqueId === selectedId ? { ...item, scale: (e.target.value || 1) as number } : item
      )
    );
  };

  const handleOnScaleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

  if (!isLoggedIn) {
    return <h1>You must log in to continue</h1>;
  }

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
          handleOnSave={handleOnSave}
          setFestivalName={setFestivalName}
          festivalName={festivalName}
          handleOnScaleBlur={handleOnScaleBlur}
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
