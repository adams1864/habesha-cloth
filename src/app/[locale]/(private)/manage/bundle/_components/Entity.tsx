"use client";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Stack,
  Title,
} from "@mantine/core";
import { IconChevronRight, IconPackage, IconPlus } from "@tabler/icons-react";
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

type Bundle = {
  id: string;
  title: string | Record<string, string>;
  description?: string | Record<string, string>;
  status: "published" | "unpublished";
  coverImage: { url: string } | null;
  products: { id: string; name: string | Record<string, string> }[];
  productCount: number;
};

type EntityProps = {
  data: Bundle[];
  total: number;
  perPage?: number;
};

export function Entity({ data = [], total, perPage }: EntityProps) {
  const sortBy = [
    { label: "Newest", value: "createdAt" },
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
  ];

  const filterOption = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Unpublished", value: "unpublished" },
  ];

  const getDisplayText = (text: string | Record<string, string>) => {
    if (typeof text === "string") {
      return text;
    }
    return text.en || text.am || Object.values(text)[0] || "";
  };

  return (
    <Stack>
      <Card>
        <Stack className="gap-2">
          <Card.Section inheritPadding py="xs">
            <Box className="flex justify-between gap-2">
              <Box className="flex items-center gap-2">
                <IconPackage stroke={1.7} />
                <Title size="h3" className="font-medium">
                  Bundles
                </Title>
              </Box>
              <Button component={NavigationLink} href="bundle/new" size="xs">
                <IconPlus className="block md:hidden" size={18} />
                <span className="hidden md:block">New Bundle</span>
              </Button>
            </Box>
          </Card.Section>

          <Box className="flex items-center justify-between gap-4">
            <Box className="grow">
              <EntitySearch placeholder="Search for Bundle" />
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
        <EntityEmptyState entity="Bundle">
          <Button component={NavigationLink} href="bundle/new">
            <IconPlus className="block md:hidden" size={18} />
            <span className="hidden md:block">New Bundle</span>
          </Button>
        </EntityEmptyState>
      ) : (
        <DisplayTable>
          <Thead>
            <Tr>
              <Th className="w-16">Cover</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Products</Th>
              <Th>Status</Th>
              <Th className="w-10"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => (
              <Tr key={element.id} className="group">
                <Td>
                  <Avatar
                    src={element.coverImage?.url || null}
                    alt={getDisplayText(element.title)}
                    size="md"
                    radius="sm"
                  >
                    <IconPackage size={20} />
                  </Avatar>
                </Td>
                <Td className="truncate font-medium max-w-xs">
                  {getDisplayText(element.title)}
                </Td>
                <Td className="truncate max-w-xs text-sm text-gray-600">
                  {element.description
                    ? getDisplayText(element.description)
                    : "—"}
                </Td>
                <Td>
                  <Badge variant="light" color="blue">
                    {element.productCount} Product
                    {element.productCount !== 1 ? "s" : ""}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    variant="light"
                    color={element.status === "published" ? "green" : "gray"}
                  >
                    {element.status.charAt(0).toUpperCase() +
                      element.status.slice(1)}
                  </Badge>
                </Td>
                <Td>
                  <ActionIcon
                    variant="outline"
                    component={NavigationLink}
                    size="sm"
                    href={`bundle/${element?.id}`}
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
