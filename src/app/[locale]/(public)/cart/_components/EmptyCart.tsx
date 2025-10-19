"use client";

import { Stack, Text, Button, Paper } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";

export function EmptyCart() {
  return (
    <Paper shadow="sm" radius="md" p="xl" className="bg-white">
      <Stack align="center" gap="lg" py="xl">
        <IconShoppingBag size={64} stroke={1.5} className="text-gray-300" />
        <Stack align="center" gap="xs">
          <Text size="xl" fw={700} className="text-gray-900">
            Your cart is empty
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Looks like you haven't added any items to your cart yet.
          </Text>
        </Stack>
        <Button
          component={Link}
          href="/"
          size="md"
          className="bg-[#d6001c] hover:bg-[#d6001c]/90"
          radius="md"
        >
          Start Shopping
        </Button>
      </Stack>
    </Paper>
  );
}
