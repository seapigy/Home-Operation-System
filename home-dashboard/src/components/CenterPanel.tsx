import { useState } from "react";
import RoomEditor from "./RoomEditor";

type CenterPanelProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onAddWidget: () => void;
  shouldOpenWidgetLibrary: boolean;
  onWidgetLibraryOpened: () => void;
};

export default function CenterPanel({ 
  activeRoom, 
  isEditMode, 
  onToggleEditMode, 
  onAddWidget,
  shouldOpenWidgetLibrary,
  onWidgetLibraryOpened
}: CenterPanelProps) {
  return (
    <RoomEditor
      activeRoom={activeRoom}
      isEditMode={isEditMode}
      onToggleEditMode={onToggleEditMode}
      onAddWidget={onAddWidget}
      shouldOpenWidgetLibrary={shouldOpenWidgetLibrary}
      onWidgetLibraryOpened={onWidgetLibraryOpened}
    />
  );
} 