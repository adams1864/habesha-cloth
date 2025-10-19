"use client";

import {
  Stack,
  Paper,
  Text,
  Button,
  Divider,
  Group,
  Anchor,
} from "@mantine/core";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax?: number;
}

export function OrderSummary({ subtotal, shipping, tax }: OrderSummaryProps) {
  const total = subtotal + shipping + (tax ?? 0);

  return (
    <Paper shadow="sm" radius="md" p="lg" className="bg-white sticky top-28">
      <Stack gap="md">
        <Text size="xl" fw={700} className="text-gray-900">
          Order Summary
        </Text>

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
            <Text size="sm" c="dimmed">
              Shipping
            </Text>
            {shipping === 0 ? (
              <Text size="sm" fw={500} className="text-[#d6001c]">
                Free
              </Text>
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
              {tax ? `ETB ${tax.toFixed(2)}` : "Calculated at checkout"}
            </Text>
          </Group>

          <Divider my="xs" />

          <Group justify="space-between">
            <Text size="md" fw={700} className="text-gray-900">
              Total
            </Text>
            <Text size="md" fw={700} className="text-gray-900">
              ETB {tax ? total.toFixed(2) : subtotal.toFixed(2)}
            </Text>
          </Group>
        </Stack>

        <Button
          size="md"
          fullWidth
          radius="md"
          component={Link}
          href="/checkout"
          className="bg-[#d6001c] hover:bg-[#b8001a]"
        >
          Proceed to Checkout
        </Button>

        <Text size="xs" ta="center" c="dimmed">
          or{" "}
          <Anchor
            component={Link}
            href="/"
            className="text-[#d6001c] font-medium hover:underline no-underline"
          >
            Continue shopping
          </Anchor>
        </Text>
      </Stack>
    </Paper>
  );
}
