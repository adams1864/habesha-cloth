"use client";

import { Breadcrumbs, Anchor, Text, Group, Paper } from "@mantine/core";
import {
  IconHome,
  IconShoppingCart,
  IconChevronRight,
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";

export function CheckoutBreadcrumb() {
  return (
    <Paper
      shadow="xs"
      radius="md"
      p="md"
      className="bg-white dark:bg-zinc-800/50"
    >
      <Group justify="space-between" wrap="wrap" gap="md">
        <Breadcrumbs
          separator={
            <IconChevronRight
              size={14}
              style={{ color: "var(--mantine-color-dimmed)" }}
            />
          }
          className="text-sm font-medium"
        >
          <Anchor
            component={Link}
            href="/"
            className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-[#d6001c] transition-colors no-underline"
          >
            <IconHome size={16} />
            <span>Home</span>
          </Anchor>
          <Anchor
            component={Link}
            href="/cart"
            className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-[#d6001c] transition-colors no-underline"
          >
            <IconShoppingCart size={16} />
            <span>Cart</span>
          </Anchor>
          <Text className="text-zinc-900 dark:text-white font-semibold">
            Checkout
          </Text>
        </Breadcrumbs>

        <Anchor
          component={Link}
          href="/"
          className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#d6001c] transition-colors no-underline font-medium"
        >
          <IconArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Anchor>
      </Group>
    </Paper>
  );
}
