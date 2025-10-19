"use client";

import { Button, Menu } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};

type EntitySortProps = {
  sortOptions: SortOption[];
};

export function EntitySort({ sortOptions }: EntitySortProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSort = searchParams.get("sort") || "";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="default"
          size="xs"
          leftSection={<IconArrowsSort size={16} />}
        >
          Sort
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.value}
            onClick={() => handleSort(option.value)}
            style={{
              backgroundColor:
                currentSort === option.value
                  ? "var(--mantine-color-blue-light)"
                  : undefined,
            }}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
