"use client";

import {
  Paper,
  Title,
  Text,
  Stack,
  Divider,
  Group,
  Button,
  Box,
  Badge,
} from "@mantine/core";
import { IconLock, IconShoppingBag, IconTruck } from "@tabler/icons-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  onPayNow: () => void;
  isLoading?: boolean;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  taxes,
  total,
  onPayNow,
  isLoading = false,
}: OrderSummaryProps) {
  return (
    <Paper
      className="bg-white dark:bg-zinc-800/50 rounded-lg h-fit sticky top-24"
      shadow="md"
      p="xl"
      radius="md"
    >
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title
            order={3}
            className="text-2xl font-bold text-zinc-900 dark:text-white"
          >
            Order Summary
          </Title>
          <Badge
            size="lg"
            variant="light"
            color="red"
            leftSection={<IconShoppingBag size={16} />}
          >
            {items.reduce((acc, item) => acc + (item.quantity || 1), 0)} items
          </Badge>
        </Group>

        <Divider />

        {/* Order Items */}
        <Stack gap="md">
          {items.map((item) => (
            <Group key={item.id} justify="space-between" wrap="nowrap">
              <Box style={{ flex: 1 }}>
                <Text
                  size="sm"
                  fw={500}
                  className="text-zinc-900 dark:text-white"
                >
                  {item.name}
                </Text>
                {item.quantity && item.quantity > 1 && (
                  <Text size="xs" c="dimmed">
                    Qty: {item.quantity}
                  </Text>
                )}
              </Box>
              <Text
                size="sm"
                fw={600}
                className="text-zinc-900 dark:text-white"
              >
                ETB {item.price.toFixed(2)}
              </Text>
            </Group>
          ))}
        </Stack>

        <Divider />

        {/* Pricing Breakdown */}
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Subtotal
            </Text>
            <Text size="sm" fw={500}>
              ETB {subtotal.toFixed(2)}
            </Text>
          </Group>

          <Group justify="space-between">
            <Group gap="xs">
              <IconTruck
                size={16}
                style={{ color: "var(--mantine-color-dimmed)" }}
              />
              <Text size="sm" c="dimmed">
                Shipping
              </Text>
            </Group>
            {shipping === 0 ? (
              <Badge color="green" variant="light" size="sm">
                FREE
              </Badge>
            ) : (
              <Text size="sm" fw={500}>
                ETB {shipping.toFixed(2)}
              </Text>
            )}
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Taxes
            </Text>
            <Text size="sm" fw={500}>
              ETB {taxes.toFixed(2)}
            </Text>
          </Group>
        </Stack>

        <Divider />

        {/* Total */}
        <Group justify="space-between" className="bg-zinc-50  p-3 rounded-lg">
          <Text size="lg" fw={700} className="text-zinc-900 dark:text-white">
            Total
          </Text>
          <Text size="xl" fw={700} className="text-[#d6001c]">
            ETB {total.toFixed(2)}
          </Text>
        </Group>

        {/* Pay Now Button */}
        <Button
          fullWidth
          size="lg"
          onClick={onPayNow}
          loading={isLoading}
          className="mt-2"
        >
          Pay
        </Button>

        <Text size="xs" ta="center" c="dimmed" className="mt-2">
          🔒 Your payment information is secure and encrypted
        </Text>
      </Stack>
    </Paper>
  );
}
