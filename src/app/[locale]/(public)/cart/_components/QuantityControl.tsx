"use client";

import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}: QuantityControlProps) {
  return (
    <Group gap="xs">
      <ActionIcon
        variant="outline"
        size="md"
        radius="xl"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="border-gray-300 hover:bg-gray-100"
      >
        <IconMinus size={16} />
      </ActionIcon>
      <Text size="sm" fw={500} className="w-8 text-center">
        {quantity}
      </Text>
      <ActionIcon
        variant="outline"
        size="md"
        radius="xl"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="border-gray-300 hover:bg-gray-100"
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
}
