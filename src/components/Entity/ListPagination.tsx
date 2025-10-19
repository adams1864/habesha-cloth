"use client";

import { Box, Pagination } from "@mantine/core";
import { PAGE_SIZE } from "@/constants/pagination";
import { cn } from "@/utils/cn";

type ListPaginationProps = {
  total: number;
  page?: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  hideCounter?: boolean;
};

export function ListPagination({
  total,
  onPageChange,
  page = 1,
  perPage = PAGE_SIZE,
  hideCounter = false,
}: ListPaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <>
      <Box
        className={cn(
          "flex items-center ",
          hideCounter ? "justify-center" : "justify-between",
        )}
      >
        {!hideCounter && (
          <Box className="px-2">
            {from} to {to} of {total} results
          </Box>
        )}
        {total >= perPage ? (
          <Pagination
            size="sm"
            total={totalPages}
            value={page}
            onChange={onPageChange}
          />
        ) : null}
      </Box>
    </>
  );
}
