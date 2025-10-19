"use client";

import { Button, Menu } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterOption = {
  label: string;
  value: string;
};

type EntityFilterProps = {
  filterOptions: FilterOption[];
};

export function EntityFilter({ filterOptions }: EntityFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentFilter = searchParams.get("filter") || "all";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value && value !== "all") {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="default"
          size="xs"
          leftSection={<IconFilter size={16} />}
        >
          Filter
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {filterOptions.map((option) => (
          <Menu.Item
            key={option.value}
            onClick={() => handleFilter(option.value)}
            style={{
              backgroundColor:
                currentFilter === option.value
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
