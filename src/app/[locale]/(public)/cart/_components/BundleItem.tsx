"use client";

import { useState } from "react";
import {
  Group,
  Stack,
  Image,
  Text,
  Button,
  Collapse,
  Box,
} from "@mantine/core";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import { QuantityControl } from "./QuantityControl";

interface BundleItemProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
}

interface BundleItemProps {
  id: number;
  name: string;
  totalPrice: number;
  coverImage: string;
  products: BundleItemProduct[];
  quantity: number;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onRemoveProduct?: (bundleId: number, productId: number) => void;
}

export function BundleItem({
  id,
  name,
  totalPrice,
  coverImage,
  products,
  quantity: initialQuantity,
  onQuantityChange,
  onRemove,
  onRemoveProduct,
}: BundleItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [expanded, setExpanded] = useState(true);

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

  const handleRemoveProduct = (productId: number) => {
    onRemoveProduct?.(id, productId);
  };

  return (
    <Box>
      <Group align="flex-start" gap="md" wrap="nowrap">
        <Box pos="relative" className="flex-shrink-0">
          <Image
            src={coverImage}
            alt={name}
            w={96}
            h={96}
            radius="md"
            className="border border-gray-200"
          />
          <Box
            pos="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            className="bg-black/40 flex items-center justify-center rounded-md"
          >
            <Text c="white" fw={700} size="lg">
              +{products.length - 1}
            </Text>
          </Box>
        </Box>
        <Stack gap="xs" className="flex-1 min-w-0">
          <div>
            <Text size="sm" fw={500} className="text-gray-900" lineClamp={2}>
              {name}
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              {products.length} items
            </Text>
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
              Remove Giftbox
            </Button>
          </Group>
        </Stack>
        <Text size="sm" fw={500} className="text-gray-900 flex-shrink-0">
          ETB {totalPrice.toFixed(2)}
        </Text>
      </Group>

      <Box mt="md" pl="md" className="border-l-2 border-gray-200">
        <Button
          variant="subtle"
          size="sm"
          color="red"
          rightSection={
            <IconChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          }
          onClick={() => setExpanded(!expanded)}
          className="text-[#d6001c] hover:underline"
          px={0}
        >
          View Giftbox Details
        </Button>

        <Collapse in={expanded}>
          <Stack gap="md" mt="md">
            {products.map((product) => (
              <Group key={product.id} gap="md" wrap="nowrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  w={64}
                  h={64}
                  radius="md"
                  className="flex-shrink-0"
                />
                <Stack gap={4} className="flex-1 min-w-0">
                  <Text size="sm" fw={500} className="text-gray-900">
                    {product.name}
                  </Text>
                  {product.size && (
                    <Text size="sm" c="dimmed">
                      Size: {product.size}
                    </Text>
                  )}
                  {product.color && (
                    <Text size="sm" c="dimmed">
                      Color: {product.color}
                    </Text>
                  )}
                  <Text size="sm" fw={500} className="text-gray-900">
                    ETB {product.price.toFixed(2)}
                  </Text>
                </Stack>
                <Button
                  variant="subtle"
                  size="xs"
                  color="red"
                  onClick={() => handleRemoveProduct(product.id)}
                  className="hover:text-[#d6001c] flex-shrink-0"
                >
                  Remove
                </Button>
              </Group>
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
}
