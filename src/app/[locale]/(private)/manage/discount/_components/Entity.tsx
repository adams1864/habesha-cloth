"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Stack,
  Title,
} from "@mantine/core";
import { IconChevronRight, IconTicket, IconPlus } from "@tabler/icons-react";
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

type Discount = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  status: "active" | "inactive" | "expired";
  applicationType: "all" | "specific";
  products?: { id: string; name: string | Record<string, string> }[] | null;
  startDate: Date | string;
  endDate: Date | string;
  maxUsageCount?: number | null;
  currentUsageCount?: number;
};

type EntityProps = {
  data: Discount[];
  total: number;
};

export function Entity({ data = [], total }: EntityProps) {
  const sortBy = [
    { label: "Code", value: "code" },
    { label: "Value", value: "value" },
    { label: "Start Date", value: "startDate" },
    { label: "End Date", value: "endDate" },
  ];

  const filterOption = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Expired", value: "expired" },
  ];

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDiscount = (type: string, value: number) => {
    if (type === "percentage") {
      return `${value}%`;
    }
    return `ETB ${value.toFixed(2)}`;
  };

  return (
    <Stack>
      <Card>
        <Stack className="gap-2">
          <Card.Section inheritPadding py="xs">
            <Box className="flex justify-between gap-2">
              <Box className="flex items-center gap-2">
                <IconTicket stroke={1.7} />
                <Title size="h3" className="font-medium">
                  Discounts
                </Title>
              </Box>
              <Button component={NavigationLink} href="discount/new" size="xs">
                <IconPlus className="block md:hidden" size={18} />
                <span className="hidden md:block">New Discount</span>
              </Button>
            </Box>
          </Card.Section>

          <Box className="flex items-center justify-between gap-4">
            <Box className="grow">
              <EntitySearch placeholder="Search for Discount" />
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
        <EntityEmptyState entity="Discount">
          <Button component={NavigationLink} href="discount/new">
            <IconPlus className="block md:hidden" size={18} />
            <span className="hidden md:block">New Discount</span>
          </Button>
        </EntityEmptyState>
      ) : (
        <DisplayTable>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Type</Th>
              <Th>Value</Th>
              <Th>Applies To</Th>
              <Th>Status</Th>
              <Th>Valid Period</Th>
              <Th>Usage</Th>
              <Th className="w-10"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => (
              <Tr key={element.id} className="group">
                <Td className="truncate font-medium">{element.code}</Td>
                <Td>
                  <Badge
                    variant="light"
                    color={element.type === "percentage" ? "blue" : "green"}
                  >
                    {element.type.charAt(0).toUpperCase() +
                      element.type.slice(1)}
                  </Badge>
                </Td>
                <Td className="font-medium">
                  {formatDiscount(element.type, element.value)}
                </Td>
                <Td>
                  {element.applicationType === "all" ? (
                    <Badge variant="light" color="blue">
                      All Products
                    </Badge>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Badge variant="light" color="grape">
                        {element.products?.length || 0} Product
                        {element.products?.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  )}
                </Td>
                <Td>
                  <Badge
                    variant="light"
                    color={(() => {
                      if (element.status === "active") return "green";
                      if (element.status === "expired") return "gray";
                      return "yellow";
                    })()}
                  >
                    {element.status.charAt(0).toUpperCase() +
                      element.status.slice(1)}
                  </Badge>
                </Td>
                <Td className="text-sm">
                  <div>{formatDate(element.startDate)}</div>
                  <div className="text-gray-500">
                    to {formatDate(element.endDate)}
                  </div>
                </Td>
                <Td>
                  {element.maxUsageCount ? (
                    <span>
                      {element.currentUsageCount || 0} / {element.maxUsageCount}
                    </span>
                  ) : (
                    <span className="text-gray-500">Unlimited</span>
                  )}
                </Td>
                <Td>
                  <ActionIcon
                    variant="outline"
                    component={NavigationLink}
                    size="sm"
                    href={`discount/${element?.id}`}
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
