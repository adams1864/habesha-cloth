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
  IconReceipt,
  IconUser,
  IconMail,
  IconCalendar,
  IconCreditCard,
} from "@tabler/icons-react";
import { use } from "react";

// Dummy data for transaction details
const dummyTransactions = {
  "1": {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "Abebe Kebede",
    email: "abebe@example.com",
    phone: "+251 911 123 456",
    amount: 299.99,
    status: "paid",
    date: "2024-10-01T10:30:00Z",
    paymentMethod: "Credit Card",
    transactionId: "TXN-ABC123XYZ",
    items: [
      { id: "1", name: "Winter Essentials Bundle", quantity: 1, price: 299.99 },
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
    orderId: "ORD-2024-002",
    customerName: "Sara Mohammed",
    email: "sara@example.com",
    phone: "+251 912 234 567",
    amount: 149.5,
    status: "paid",
    date: "2024-10-02T14:15:00Z",
    paymentMethod: "Telebirr",
    transactionId: "TXN-DEF456ABC",
    items: [
      { id: "2", name: "Premium Cotton T-Shirt", quantity: 2, price: 59.98 },
      { id: "3", name: "Leather Jacket", quantity: 1, price: 89.52 },
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
    orderId: "ORD-2024-003",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 555 123 4567",
    amount: 89.99,
    status: "paid",
    date: "2024-10-03T09:20:00Z",
    paymentMethod: "PayPal",
    transactionId: "TXN-GHI789DEF",
    items: [
      { id: "4", name: "Premium Cotton T-Shirt", quantity: 3, price: 89.99 },
    ],
    shippingAddress: {
      street: "789 Main Street",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
  },
  "5": {
    id: "5",
    orderId: "ORD-2024-005",
    customerName: "David Johnson",
    email: "david@example.com",
    phone: "+1 555 987 6543",
    amount: 450.0,
    status: "paid",
    date: "2024-10-05T11:00:00Z",
    paymentMethod: "Credit Card",
    transactionId: "TXN-JKL012GHI",
    items: [
      { id: "5", name: "Winter Essentials Bundle", quantity: 1, price: 299.99 },
      { id: "6", name: "Leather Jacket", quantity: 1, price: 150.01 },
    ],
    shippingAddress: {
      street: "321 Oak Avenue",
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
    },
  },
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // Get transaction data based on ID
  const transaction = dummyTransactions[id as keyof typeof dummyTransactions];

  if (!transaction) {
    return (
      <Box p="md">
        <Title order={2} mb="lg">
          Transaction Not Found
        </Title>
        <Text>The transaction you are looking for does not exist.</Text>
      </Box>
    );
  }

  return (
    <Box p="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} mb="xs">
              Transaction Details
            </Title>
            <Text c="dimmed" size="sm">
              {transaction.orderId}
            </Text>
          </Box>
          <Badge
            size="lg"
            variant="light"
            color={transaction.status === "paid" ? "green" : "gray"}
          >
            {transaction.status.toUpperCase()}
          </Badge>
        </Group>

        {/* Transaction Overview */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Transaction Information
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack gap="sm">
              <Group gap="xs">
                <IconReceipt size={18} />
                <Text fw={500}>Transaction ID:</Text>
                <Text>{transaction.transactionId}</Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={18} />
                <Text fw={500}>Date:</Text>
                <Text>{new Date(transaction.date).toLocaleString()}</Text>
              </Group>
              <Group gap="xs">
                <IconCreditCard size={18} />
                <Text fw={500}>Payment Method:</Text>
                <Text>{transaction.paymentMethod}</Text>
              </Group>
            </Stack>
            <Stack gap="sm">
              <Group gap="xs">
                <IconUser size={18} />
                <Text fw={500}>Customer:</Text>
                <Text>{transaction.customerName}</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={18} />
                <Text fw={500}>Email:</Text>
                <Text>{transaction.email}</Text>
              </Group>
              <Group gap="xs">
                <Text fw={500}>Phone:</Text>
                <Text>{transaction.phone}</Text>
              </Group>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Order Items */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Order Items
          </Title>
          <Stack gap="sm">
            {transaction.items.map((item) => (
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
                ETB {transaction.amount.toFixed(2)}
              </Text>
            </Group>
          </Stack>
        </Card>

        {/* Shipping Address */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Shipping Address
          </Title>
          <Stack gap="xs">
            <Text>{transaction.shippingAddress.street}</Text>
            <Text>{transaction.shippingAddress.city}</Text>
            <Text>{transaction.shippingAddress.country}</Text>
            <Text>Postal Code: {transaction.shippingAddress.postalCode}</Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
