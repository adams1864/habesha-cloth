"use client";
import { CloseButton, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

import { useEffect, useState } from "react";

type ListSearchProps = {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

export function ListSearch({
  placeholder,
  value: propValue,
  onChange,
}: ListSearchProps) {
  const [value, setValue] = useState(propValue);
  const [debounced] = useDebouncedValue(value, 200);

  // biome-ignore lint/correctness/useExhaustiveDependencies: dd
  useEffect(() => {
    onChange(debounced?.toString() ?? "");
  }, [debounced]);

  return (
    <TextInput
      value={value}
      placeholder={placeholder || "Search..."}
      leftSectionPointerEvents="none"
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => setValue("")}
          style={{
            display: value ? undefined : "none",
          }}
        />
      }
      rightSectionPointerEvents="all"
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
