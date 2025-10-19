"use client";
import { ActionIcon, Badge, Box, Card, Stack, Title } from "@mantine/core";
import { IconChevronRight, IconReceipt } from "@tabler/icons-react";
import {
  DisplayTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@/components/display-table/DisplayTable";
import { EntityEmptyState } from "@/components/empty-state/EntityEmptyState";
import { EntityFilter } from "@/components/Entity/EntityFilter";
import { EntityPagination } from "@/components/Entity/EntityPagination";
import { EntitySearch } from "@/components/Entity/EntitySearch";
import { EntitySort } from "@/components/Entity/EntitySort";
import NavigationLink from "@/components/link/NavigationLink";
import { Button } from "@mantine/core";

type Order = {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  date: string;
};

type EntityProps = {
  data: Order[];
  total: number;
};

export function Entity({ data = [], total }: EntityProps) {
  const sortBy = [
    { label: "Order ID", value: "orderId" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Date", value: "date" },
  ];

  const filterOption = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
    { label: "Refunded", value: "refunded" },
  ];

  return (
    <Stack>
      <Card>
        <Stack className="gap-2">
          <Card.Section inheritPadding py="xs">
            <Box className="flex justify-between gap-2">
              <Box className="flex items-center gap-2">
                <IconReceipt stroke={1.7} />
                <Title size="h3" className="font-medium">
                  Orders
                </Title>
              </Box>
            </Box>
          </Card.Section>

          <Box className="flex items-center justify-between gap-4">
            <Box className="grow">
              <EntitySearch placeholder="Search for orders" />
            </Box>

            <Box className="flex items-center gap-2">
              <Box className="flex items-center gap-2">
                <EntityFilter filterOptions={filterOption} />
                <Button.Group>
                  <EntitySort sortOptions={sortBy} />
                </Button.Group>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Card>

      {data.length === 0 ? (
        <EntityEmptyState entity="Order" />
      ) : (
        <DisplayTable>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th className="w-10"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => (
              <Tr key={element.id} className="group">
                <Td className="truncate font-medium">{element.orderId}</Td>
                <Td>{element.customerName}</Td>
                <Td className="text-gray-600">{element.email}</Td>
                <Td>
                  <Badge
                    variant="light"
                    color={(() => {
                      if (element.status === "paid") {
                        return "green";
                      }
                      if (element.status === "pending") {
                        return "yellow";
                      }
                      if (element.status === "failed") {
                        return "red";
                      }
                      if (element.status === "refunded") {
                        return "gray";
                      }
                      return "gray";
                    })()}
                  >
                    {element.status.charAt(0).toUpperCase() +
                      element.status.slice(1)}
                  </Badge>
                </Td>
                <Td className="font-medium">ETB {element.amount.toFixed(2)}</Td>
                <Td className="text-gray-600">
                  {new Date(element.date).toLocaleDateString()}
                </Td>
                <Td>
                  <ActionIcon
                    variant="outline"
                    component={NavigationLink}
                    size="sm"
                    href={`orders/${element?.id}`}
                    className="invisible group-hover:visible"
                  >
                    <IconChevronRight size={18} />
                  </ActionIcon>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </DisplayTable>
      )}

      <EntityPagination total={total} />
    </Stack>
  );
}
