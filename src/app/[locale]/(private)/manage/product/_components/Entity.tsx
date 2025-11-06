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
import {
  IconChevronRight,
  IconShoppingBag,
  IconPlus,
} from "@tabler/icons-react";
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

type Product = {
  id: string;
  title: string;
  // Product kind (e.g., simple/bundle/digital) if available
  type?: "simple" | "bundle" | "digital";
  // Merchandising category (e.g., fabric, jackets, shoes)
  category?: string;
  status: "published" | "unpublished" | "archived";
  price: number;
};

type EntityProps = {
  data: Product[];
  total: number;
  perPage?: number;
};

export function Entity({ data = [], total, perPage }: EntityProps) {

  const hasType =
    Array.isArray(data) && data.some((item) => Boolean(item.type));
  const sortBy = [
    { label: "Newest", value: "createdAt" },
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: hasType ? "Type" : "Status", value: hasType ? "type" : "status" },
  ];

  const filterOption = [
    { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Unpublished", value: "unpublished" },
  { label: "Archived", value: "archived" },
  ];

  return (
    <Stack>
      <Card>
        <Stack className="gap-2">
          <Card.Section inheritPadding py="xs">
            <Box className="flex justify-between gap-2">
              <Box className="flex items-center gap-2">
                <IconShoppingBag stroke={1.7} />
                <Title size="h3" className="font-medium">
                  Products
                </Title>
              </Box>
              <Button component={NavigationLink} href="product/new" size="xs">
                <IconPlus className="block md:hidden" size={18} />
                <span className="hidden md:block">New Product</span>
              </Button>
            </Box>
          </Card.Section>

          <Box className="flex items-center justify-between gap-4">
            <Box className="grow">
              <EntitySearch placeholder="Search for Product" />
            </Box>

            <Box className="flex items-center gap-2">
              <Box className="flex items-center gap-2">
                <EntityFilter filterOptions={filterOption} queryKey="status" />
                <Button.Group>
                  <EntitySort sortOptions={sortBy} />
                </Button.Group>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Card>

      {data.length === 0 ? (
        <EntityEmptyState entity="Product">
          <Button component={NavigationLink} href="product/new">
            <IconPlus className="block md:hidden" size={18} />
            <span className="hidden md:block">New Product</span>
          </Button>
        </EntityEmptyState>
      ) : (
        <DisplayTable>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>{hasType ? "Type" : "Category"}</Th>
              <Th>Status</Th>
              <Th>Price</Th>
              <Th className="w-10"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => (
              <Tr key={element.id} className="group">
                <Td className="truncate font-medium">{element.title}</Td>
                <Td>
                  {element.type ? (
                    <Badge
                      variant="light"
                      color={(() => {
                        if (element.type === "simple") return "blue";
                        if (element.type === "bundle") return "purple";
                        if (element.type === "digital") return "orange";
                        return "gray";
                      })()}
                    >
                      {element.type.charAt(0).toUpperCase() +
                        element.type.slice(1)}
                    </Badge>
                  ) : (
                    <Badge variant="light" color="gray">
                      {element.category || "—"}
                    </Badge>
                  )}
                </Td>
                <Td>
                  <Badge
                    variant="light"
                    color={(() => {
                      if (element.status === "published") {
                        return "green";
                      }
                      if (element.status === "unpublished") {
                        return "red";
                      }
                      return "gray";
                    })()}
                  >
                    {element.status.charAt(0).toUpperCase() +
                      element.status.slice(1)}
                  </Badge>
                </Td>
                <Td className="font-medium">ETB {element.price.toFixed(2)}</Td>
                <Td>
                  <ActionIcon
                    variant="outline"
                    component={NavigationLink}
                    size="sm"
                    href={`product/${element?.id}`}
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

      <EntityPagination total={total} perPage={perPage} />
    </Stack>
  );
}
