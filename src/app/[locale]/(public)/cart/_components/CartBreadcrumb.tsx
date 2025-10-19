"use client";

import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

export function CartBreadcrumb() {
  return (
    <Breadcrumbs
      separator={<IconChevronRight size={16} />}
      mb="xl"
      classNames={{
        separator: "text-gray-400",
      }}
    >
      <Anchor
        component={Link}
        href="/"
        size="sm"
        className="text-gray-500 hover:text-[#d6001c] transition-colors no-underline"
      >
        Home
      </Anchor>
      <Text size="sm" className="text-gray-900">
        Shopping Cart
      </Text>
    </Breadcrumbs>
  );
}
