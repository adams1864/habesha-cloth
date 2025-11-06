"use client";

import { Card, Grid, Text, Box, Group, Skeleton } from "@mantine/core";
import {
  IconBrandProducthunt,
  IconPackage,
  IconReorder,
  IconShoppingCart,
  IconDiscount,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { getBundles, getProducts } from "@/lib/api";

type StatConfig = {
  key: keyof DashboardCounts;
  title: string;
  icon: (typeof IconBrandProducthunt);
  color: string;
  format?: (value: number) => string;
};

type DashboardCounts = {
  products: number;
  bundles: number;
  orders: number;
  leads: number;
  discounts: number;
  revenue: number;
};

const STAT_CONFIG: StatConfig[] = [
  {
    key: "products",
    title: "Total Products",
    icon: IconBrandProducthunt,
    color: "blue",
  },
  {
    key: "bundles",
    title: "Total Bundles",
    icon: IconPackage,
    color: "grape",
  },
  {
    key: "orders",
    title: "Total Orders",
    icon: IconReorder,
    color: "green",
  },
  {
    key: "leads",
    title: "Total Leads",
    icon: IconShoppingCart,
    color: "orange",
  },
  {
    key: "discounts",
    title: "Active Discounts",
    icon: IconDiscount,
    color: "pink",
  },
  {
    key: "revenue",
    title: "Total Revenue",
    icon: IconCurrencyDollar,
    color: "teal",
    format: (value) => `ETB ${value.toLocaleString()}`,
  },
];

const DEFAULT_COUNTS: DashboardCounts = {
  products: 0,
  bundles: 0,
  orders: 0,
  leads: 0,
  discounts: 0,
  revenue: 0,
};

export default function DashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>(DEFAULT_COUNTS);
  const [loading, setLoading] = useState(true);

  const numberFormatter = useMemo(() => new Intl.NumberFormat(), []);

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      try {
        setLoading(true);
        const [productResponse, bundleResponse] = await Promise.all([
          getProducts({ page: 1, perPage: 1 }),
          getBundles({ page: 1, perPage: 1 }),
        ]);

        if (cancelled) return;

        setCounts((previous) => ({
          ...previous,
          products: productResponse.meta.total,
          bundles: bundleResponse.meta.total,
        }));
      } catch (error) {
        console.error("Failed to load dashboard counts", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCounts();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = STAT_CONFIG.map((config) => {
    const Icon = config.icon;
    const rawValue = counts[config.key];
    const formattedValue = config.format
      ? config.format(rawValue)
      : numberFormatter.format(rawValue);

    return {
      title: config.title,
      icon: Icon,
      color: config.color,
      value: formattedValue,
    };
  });

  return (
    <Box>
      <Text size="xl" fw={700} mb="lg">
        Dashboard Overview
      </Text>

      <Grid>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      {stat.title}
                    </Text>
                    <Text size="xl" fw={700} mt="xs">
                      {loading ? <Skeleton height={20} width={60} /> : stat.value}
                    </Text>
                  </Box>
                  <Box
                    style={{
                      backgroundColor: `var(--mantine-color-${stat.color}-1)`,
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    <Icon
                      size={24}
                      stroke={1.5}
                      color={`var(--mantine-color-${stat.color}-6)`}
                    />
                  </Box>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
}
