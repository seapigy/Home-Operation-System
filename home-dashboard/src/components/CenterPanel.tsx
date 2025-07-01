import { useState } from "react";
import RoomEditor from "./RoomEditor";

type CenterPanelProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  shouldOpenWidgetLibrary: boolean;
  onWidgetLibraryOpened: () => void;
};

export default function CenterPanel({ 
  activeRoom, 
  isEditMode, 
  onToggleEditMode,
  shouldOpenWidgetLibrary,
  onWidgetLibraryOpened
}: CenterPanelProps) {
  return (
    <RoomEditor
      activeRoom={activeRoom}
      isEditMode={isEditMode}
      onToggleEditMode={onToggleEditMode}
      shouldOpenWidgetLibrary={shouldOpenWidgetLibrary}
      onWidgetLibraryOpened={onWidgetLibraryOpened}
    />
  );
} 