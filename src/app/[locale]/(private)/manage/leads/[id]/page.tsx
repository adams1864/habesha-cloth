import {
  Box,
  Card,
  Title,
  Text,
  Stack,
  Badge,
  Divider,
  Group,
  SimpleGrid,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconUser,
  IconMail,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";
import { use } from "react";

// Dummy data for lead details
const dummyLeads = {
  "1": {
    id: "1",
    cartId: "CART-2024-001",
    customerName: "Tigist Hailu",
    email: "tigist@example.com",
    phone: "+251 911 234 567",
    amount: 459.99,
    status: "in_cart",
    date: "2024-10-04T08:15:00Z",
    lastActivity: "2024-10-05T14:30:00Z",
    items: [
      { id: "1", name: "Winter Essentials Bundle", quantity: 1, price: 299.99 },
      { id: "2", name: "Leather Jacket", quantity: 1, price: 160.0 },
    ],
    shippingAddress: {
      street: "123 Bole Road",
      city: "Addis Ababa",
      country: "Ethiopia",
      postalCode: "1000",
    },
  },
  "2": {
    id: "2",
    cartId: "CART-2024-002",
    customerName: "Daniel Assefa",
    email: "daniel@example.com",
    phone: "+251 912 345 678",
    amount: 129.5,
    status: "checkout_started",
    date: "2024-10-04T12:30:00Z",
    lastActivity: "2024-10-05T10:15:00Z",
    items: [
      { id: "3", name: "Premium Cotton T-Shirt", quantity: 2, price: 59.98 },
      { id: "4", name: "Denim Jeans", quantity: 1, price: 69.52 },
    ],
    shippingAddress: {
      street: "456 Piazza Area",
      city: "Addis Ababa",
      country: "Ethiopia",
      postalCode: "1000",
    },
  },
  "3": {
    id: "3",
    cartId: "CART-2024-003",
    customerName: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1 555 123 4567",
    amount: 89.99,
    status: "abandoned",
    date: "2024-10-03T18:45:00Z",
    lastActivity: "2024-10-03T19:00:00Z",
    items: [
      { id: "5", name: "Premium Cotton T-Shirt", quantity: 3, price: 89.99 },
    ],
    shippingAddress: null,
  },
  "4": {
    id: "4",
    cartId: "CART-2024-004",
    customerName: "Yohannes Bekele",
    email: "yohannes@example.com",
    phone: "+251 913 456 789",
    amount: 199.99,
    status: "in_cart",
    date: "2024-10-05T09:20:00Z",
    lastActivity: "2024-10-05T09:25:00Z",
    items: [{ id: "6", name: "Winter Coat", quantity: 1, price: 199.99 }],
    shippingAddress: null,
  },
  "5": {
    id: "5",
    cartId: "CART-2024-005",
    customerName: "Sofia Martinez",
    email: "sofia@example.com",
    phone: "+1 555 987 6543",
    amount: 350.0,
    status: "checkout_started",
    date: "2024-10-05T14:10:00Z",
    lastActivity: "2024-10-05T15:00:00Z",
    items: [
      { id: "7", name: "Winter Essentials Bundle", quantity: 1, price: 299.99 },
      { id: "8", name: "Scarf", quantity: 1, price: 50.01 },
    ],
    shippingAddress: {
      street: "789 Broadway",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
  },
  "6": {
    id: "6",
    cartId: "CART-2024-006",
    customerName: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 555 234 5678",
    amount: 75.99,
    status: "abandoned",
    date: "2024-10-02T16:30:00Z",
    lastActivity: "2024-10-02T16:35:00Z",
    items: [{ id: "9", name: "Casual Sneakers", quantity: 1, price: 75.99 }],
    shippingAddress: null,
  },
  "7": {
    id: "7",
    cartId: "CART-2024-007",
    customerName: "Hana Tadesse",
    email: "hana@example.com",
    phone: "+251 914 567 890",
    amount: 299.99,
    status: "in_cart",
    date: "2024-10-05T10:45:00Z",
    lastActivity: "2024-10-05T11:30:00Z",
    items: [
      {
        id: "10",
        name: "Winter Essentials Bundle",
        quantity: 1,
        price: 299.99,
      },
    ],
    shippingAddress: null,
  },
};

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // Get lead data based on ID
  const lead = dummyLeads[id as keyof typeof dummyLeads];

  if (!lead) {
    return (
      <Box p="md">
        <Title order={2} mb="lg">
          Lead Not Found
        </Title>
        <Text>The lead you are looking for does not exist.</Text>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_cart":
        return "blue";
      case "checkout_started":
        return "yellow";
      case "abandoned":
        return "gray";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box p="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} mb="xs">
              Lead Details
            </Title>
            <Text c="dimmed" size="sm">
              {lead.cartId}
            </Text>
          </Box>
          <Badge size="lg" variant="light" color={getStatusColor(lead.status)}>
            {getStatusLabel(lead.status)}
          </Badge>
        </Group>

        {/* Lead Overview */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Customer Information
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack gap="sm">
              <Group gap="xs">
                <IconShoppingCart size={18} />
                <Text fw={500}>Cart ID:</Text>
                <Text>{lead.cartId}</Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={18} />
                <Text fw={500}>Created:</Text>
                <Text>{new Date(lead.date).toLocaleString()}</Text>
              </Group>
              <Group gap="xs">
                <IconClock size={18} />
                <Text fw={500}>Last Activity:</Text>
                <Text>{new Date(lead.lastActivity).toLocaleString()}</Text>
              </Group>
            </Stack>
            <Stack gap="sm">
              <Group gap="xs">
                <IconUser size={18} />
                <Text fw={500}>Customer:</Text>
                <Text>{lead.customerName}</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={18} />
                <Text fw={500}>Email:</Text>
                <Text>{lead.email}</Text>
              </Group>
              <Group gap="xs">
                <Text fw={500}>Phone:</Text>
                <Text>{lead.phone}</Text>
              </Group>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Cart Items */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Cart Items
          </Title>
          <Stack gap="sm">
            {lead.items.map((item) => (
              <Box key={item.id}>
                <Group justify="space-between">
                  <Box>
                    <Text fw={500}>{item.name}</Text>
                    <Text size="sm" c="dimmed">
                      Quantity: {item.quantity}
                    </Text>
                  </Box>
                  <Text fw={500}>ETB {item.price.toFixed(2)}</Text>
                </Group>
                <Divider my="xs" />
              </Box>
            ))}
            <Group justify="space-between" mt="md">
              <Text fw={700} size="lg">
                Total Amount:
              </Text>
              <Text fw={700} size="lg" c="blue">
                ETB {lead.amount.toFixed(2)}
              </Text>
            </Group>
          </Stack>
        </Card>

        {/* Shipping Address removed for cart details */}
      </Stack>
    </Box>
  );
}
