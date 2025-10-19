"use client";
import { CloseButton, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

type EntitySearchProps = {
  placeholder?: string;
};

export function EntitySearch({ placeholder }: EntitySearchProps) {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const { replace } = useRouter();

  // Inside the Search Component...
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
      if (ref?.current) {
        ref.current.value = "";
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextInput
      ref={ref}
      size="xs"
      className="w-1/2"
      placeholder={placeholder || "Search..."}
      leftSectionPointerEvents="none"
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => handleSearch(null)}
          style={{
            display: searchParams.get("search")?.toString()
              ? undefined
              : "none",
          }}
        />
      }
      rightSectionPointerEvents="all"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
}
