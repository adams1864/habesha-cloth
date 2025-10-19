"use client";

import { Box, Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/constants/pagination";
import { cn } from "@/utils/cn";

type EntityPaginationProps = {
  total: number;
  perPage?: number;
  hideCounter?: boolean;
};

export function EntityPagination({
  total,
  perPage = PAGE_SIZE,
  hideCounter = false,
}: EntityPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / perPage);
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

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
        <Box className="px-2">
          {from} to {to} of {total} results
        </Box>
        {total >= perPage ? (
          <Pagination
            size="sm"
            total={totalPages}
            value={currentPage}
            onChange={createPageURL}
          />
        ) : null}
      </Box>
    </>
  );
}
