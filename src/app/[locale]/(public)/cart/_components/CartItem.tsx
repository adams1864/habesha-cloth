"use client";

import { useState } from "react";
import { Group, Stack, Image, Text, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { QuantityControl } from "./QuantityControl";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  image,
  size,
  color,
  quantity: initialQuantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(id, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange?.(id, newQuantity);
  };

  const handleRemove = () => {
    onRemove?.(id);
  };

  return (
    <Group align="flex-start" gap="md" wrap="nowrap">
      <Image
        src={image}
        alt={name}
        w={96}
        h={96}
        radius="md"
        className="border border-gray-200 flex-shrink-0"
      />
      <Stack gap="xs" className="flex-1 min-w-0">
        <div>
          <Text size="sm" fw={500} className="text-gray-900" lineClamp={2}>
            {name}
          </Text>
          {size && (
            <Text size="sm" c="dimmed" mt={4}>
              Size: {size}
            </Text>
          )}
          {color && (
            <Text size="sm" c="dimmed">
              Color: {color}
            </Text>
          )}
        </div>
        <Group justify="space-between" align="flex-end" mt="auto">
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <Button
            variant="subtle"
            size="xs"
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={handleRemove}
            className="hover:text-[#d6001c]"
          >
            Remove
          </Button>
        </Group>
      </Stack>
      <Text size="sm" fw={500} className="text-gray-900 flex-shrink-0">
        ${price.toFixed(2)}
      </Text>
    </Group>
  );
}
