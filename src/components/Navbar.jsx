import React from "react";
import { useAppStore } from "../store/useAppStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Navbar() {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  return (
    <nav className="w-full px-6 py-4 bg-[oklch(0.2_0.1_280)] shadow-md flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">🚀 Defi Gas Tracker</h1>
      
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => {
          if (value) setMode(value);
        }}
        className="bg-white/10 border border-white/20 rounded-lg p-1"
      >
        <ToggleGroupItem
          value="live"
          className={`text-white data-[state=on]:bg-purple-600 data-[state=on]:text-white px-4 py-2 rounded-md transition-colors`}
        >
          Live
        </ToggleGroupItem>
        <ToggleGroupItem
          value="simulation"
          className={`text-white data-[state=on]:bg-purple-600 data-[state=on]:text-white px-4 py-2 rounded-md transition-colors`}
        >
          Simulation
        </ToggleGroupItem>
      </ToggleGroup>
    </nav>
  );
}
