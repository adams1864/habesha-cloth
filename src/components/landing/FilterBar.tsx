"use client";

import { Button } from "@mantine/core";

const ChevronDownIcon = () => (
  <svg
    fill="currentColor"
    height="16px"
    viewBox="0 0 256 256"
    width="16px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Chevron Down</title>
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="light"
        color="gray"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root: "hover:bg-[#d6001c]/10 hover:text-[#d6001c]",
        }}
      >
        Size
      </Button>
      <Button
        variant="light"
        color="gray"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root: "hover:bg-[#d6001c]/10 hover:text-[#d6001c]",
        }}
      >
        Color
      </Button>
      <Button
        variant="light"
        color="gray"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root: "hover:bg-[#d6001c]/10 hover:text-[#d6001c]",
        }}
      >
        Price
      </Button>
      <Button
        variant="filled"
        className="bg-[#d6001c] hover:bg-[#d6001c]/90"
        rightSection={<ChevronDownIcon />}
      >
        Sort By
      </Button>
    </div>
  );
}
