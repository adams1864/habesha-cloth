"use client";

import { Button } from "@mantine/core";

const ChevronDownIcon = () => (
  <svg
    fill="currentColor"
    height="14"
    width="14"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-70"
  >
    <title>Chevron Down</title>
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/** light filter pills */}
      <Button
        variant="light"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root:
            "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2 text-sm min-w-[92px] flex items-center justify-center gap-2 transition-shadow transition-colors",
        }}
        aria-label="Filter Size"
      >
        Size
      </Button>

      <Button
        variant="light"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root:
            "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2 text-sm min-w-[92px] flex items-center justify-center gap-2 transition-shadow transition-colors",
        }}
        aria-label="Filter Color"
      >
        Color
      </Button>

      <Button
        variant="light"
        rightSection={<ChevronDownIcon />}
        classNames={{
          root:
            "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2 text-sm min-w-[92px] flex items-center justify-center gap-2 transition-shadow transition-colors",
        }}
        aria-label="Filter Price"
      >
        Price
      </Button>

      {/** primary Sort By pill */}
      <Button
        variant="filled"
        rightSection={<ChevronDownIcon />}
        className="bg-[#d6001c] hover:bg-[#b80013] text-white rounded-full px-4 py-2 text-sm shadow-md flex items-center gap-2 min-w-[100px]"
        aria-label="Sort By"
      >
        Sort By
      </Button>
    </div>
  );
}
