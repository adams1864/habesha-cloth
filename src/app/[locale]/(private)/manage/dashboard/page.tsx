"use client";

import { Card, Grid, Text, Box, Group } from "@mantine/core";
import {
  IconBrandProducthunt,
  IconPackage,
  IconReorder,
  IconShoppingCart,
  IconDiscount,
  IconCurrencyDollar,
} from "@tabler/icons-react";

// Dummy stats data
const stats = [
  {
    title: "Total Products",
    value: "24",
    icon: IconBrandProducthunt,
    color: "blue",
  },
  {
    title: "Total Bundles",
    value: "8",
    icon: IconPackage,
    color: "grape",
  },
  {
    title: "Total Orders",
    value: "147",
    icon: IconReorder,
    color: "green",
  },
  {
    title: "Total Leads",
    value: "52",
    icon: IconShoppingCart,
    color: "orange",
  },
  {
    title: "Active Discounts",
    value: "5",
    icon: IconDiscount,
    color: "pink",
  },
  {
    title: "Total Revenue",
    value: "ETB 12,450",
    icon: IconCurrencyDollar,
    color: "teal",
  },
];

export default function DashboardPage() {
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
                      {stat.value}
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
