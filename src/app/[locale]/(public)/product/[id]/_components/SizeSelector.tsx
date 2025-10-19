"use client";

import { useState } from "react";
import { Button } from "@mantine/core";

interface SizeSelectorProps {
  sizes: string[];
}

export function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[1] || sizes[0]);

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Size</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button
            key={size}
            onClick={() => setSelectedSize(size)}
            variant={selectedSize === size ? "filled" : "default"}
            radius="xl"
            color="red"
            classNames={{
              root:
                selectedSize === size ? "" : "border-gray-300 text-gray-700",
            }}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
