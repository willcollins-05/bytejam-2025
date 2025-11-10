"use client";
import React, { useState, useEffect } from "react";

import { CanvasItems, ItemGroup } from "@/types/festival-viewer-types";
import { getFestivalById } from "@/lib/supabase/queries";
import { useSession } from "next-auth/react";

import SceneViewOnly from "./scene-view-only";
import AccountSidebarView from "./account-sidebar-view";

export default function SceneBuilder(props: {
  itemGroups: ItemGroup[];
  isNew: boolean;
  id: number;
}) {
  const { data: session, status } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [canvasItems, setCanvasItems] = useState<CanvasItems[]>([]);

  if (!isLoggedIn && session?.user.id !== null && status === "authenticated") {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const loadFestivalById = async () => {
      const festivalData = await getFestivalById(props.id);
      const placedProps =
        typeof festivalData.placed_props_json === "string"
          ? JSON.parse(festivalData.placed_props_json)
          : festivalData.placed_props_json;

      setCanvasItems(placedProps);
    };

    if (props.id !== -1 && props.id !== null) {
      loadFestivalById();
    }
  }, []);

  if (!isLoggedIn) {
    return <h1>You must log in to continue</h1>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AccountSidebarView />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas */}
        <SceneViewOnly canvasItems={canvasItems} />
      </div>
    </div>
  );
}
