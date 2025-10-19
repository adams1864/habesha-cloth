"use client";

import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Stack,
  Paper,
  Title,
  Text,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { IconCheck, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { CheckoutBreadcrumb } from "./_components/CheckoutBreadcrumb";
import { ShippingAddressForm } from "./_components/ShippingAddressForm";
import { OrderSummary } from "./_components/OrderSummary";
import { type CheckoutFormData } from "./_components/schemas";

// Mock data - in a real app, this would come from your state management or API
const mockOrderItems = [
  { id: "1", name: "Organic Cotton Onesie", price: 25.0, quantity: 1 },
  { id: "2", name: "Baby Bear Hat", price: 15.0, quantity: 1 },
];

const mockPricing = {
  subtotal: 40.0,
  shipping: 5.0,
  taxes: 3.2,
  total: 48.2,
};

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Checkout data:", data);
      setShowSuccess(true);

      // In a real app, you would redirect to a success page or handle payment
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = () => {
    // Trigger form submission when Pay Now is clicked
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  if (showSuccess) {
    return (
      <Container size="md" className="py-16">
        <Paper shadow="lg" radius="lg" p="xl" className="text-center">
          <Stack gap="xl" align="center">
            <Box
              className="bg-green-50 dark: rounded-full p-4"
              style={{ width: "fit-content" }}
            >
              <IconCheck size={64} color="#22c55e" stroke={2.5} />
            </Box>

            <Stack gap="sm" align="center">
              <Title
                order={1}
                className="text-3xl font-bold tex   t-zinc-900 dark:text-white"
              >
                Order Placed Successfully!
              </Title>
              <Text size="lg" c="dimmed" className="max-w-md">
                Thank you for your purchase. Your order has been confirmed and
                you will receive a confirmation email shortly.
              </Text>
            </Stack>

            <Box className="bg-zinc-50  p-4 rounded-lg w-full">
              <Group justify="center" gap="xl">
                <Stack gap={4} align="center">
                  <Text size="sm" c="dimmed">
                    Order Total
                  </Text>
                  <Text size="xl" fw={700} className="text-[#d6001c]">
                    ${mockPricing.total.toFixed(2)}
                  </Text>
                </Stack>
                <Stack gap={4} align="center">
                  <Text size="sm" c="dimmed">
                    Order Number
                  </Text>
                  <Text size="lg" fw={600}>
                    #ORD-{Math.floor(Math.random() * 100000)}
                  </Text>
                </Stack>
              </Group>
            </Box>

            <Group gap="md" className="w-full" grow>
              <Button
                component={Link}
                href="/"
                variant="outline"
                size="lg"
                leftSection={<IconShoppingCart size={20} />}
                className="border-2"
              >
                Continue Shopping
              </Button>
              <Button
                component={Link}
                href="/orders"
                size="lg"
                styles={{
                  root: {
                    backgroundColor: "#d6001c",
                    "&:hover": {
                      backgroundColor: "#b8001a",
                    },
                  },
                }}
              >
                View Order Details
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Box className="min-h-screen ">
      <Container size="xl" className="py-8">
        <Stack gap="xl">
          <CheckoutBreadcrumb />

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <ShippingAddressForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                formRef={formRef}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 5 }}>
              <OrderSummary
                items={mockOrderItems}
                subtotal={mockPricing.subtotal}
                shipping={mockPricing.shipping}
                taxes={mockPricing.taxes}
                total={mockPricing.total}
                onPayNow={handlePayNow}
                isLoading={isLoading}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
