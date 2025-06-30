import { useState } from "react";
import RoomEditor from "./RoomEditor";

type CenterPanelProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
};

export default function CenterPanel({ activeRoom, isEditMode, onToggleEditMode }: CenterPanelProps) {
  return (
    <RoomEditor
      activeRoom={activeRoom}
      isEditMode={isEditMode}
      onToggleEditMode={onToggleEditMode}
    />
  );
} 