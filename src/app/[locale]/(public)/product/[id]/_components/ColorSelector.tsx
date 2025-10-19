"use client";

import { useState } from "react";
import { ActionIcon } from "@mantine/core";

interface ColorSelectorProps {
  colors: { name: string; hex: string }[];
}

export function ColorSelector({ colors }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Color</h3>
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <ActionIcon
            key={color.name}
            onClick={() => setSelectedColor(color)}
            size="xl"
            radius="xl"
            variant="default"
            className={`transition-all ${
              selectedColor.name === color.name
                ? "ring-2 ring-[#d6001c] ring-offset-2"
                : "hover:scale-110"
            }`}
            style={{ backgroundColor: color.hex, border: "1px solid #e5e7eb" }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
