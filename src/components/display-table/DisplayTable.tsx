import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const DisplayTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="bg-primary-background overflow-hidden rounded-md border">
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  </div>
));

DisplayTable.displayName = "Table";

const Thead = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn("rounded-t-md border-b border-gray-500/50", className)}
      {...props}
    >
      {children}
    </thead>
  );
});

const Tbody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn(className)} {...props}>
      {children}
    </tbody>
  );
});

const Tr = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-gray-500/50 transition-colors last:border-b-0 odd:bg-primary-background hover:bg-primary-background/50",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
});

const Th = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <th ref={ref} className={cn("px-4 py-2 text-left", className)} {...props}>
      {children}
    </th>
  );
});

const Td = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement> & {
    className?: string;
    children?: React.ReactNode;
    colSpan?: number;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <td ref={ref} className={cn("px-4 py-2", className)} {...props}>
      {children}
    </td>
  );
});

Thead.displayName = "Thead";
Tbody.displayName = "Tbody";
Tr.displayName = "Tr";
Th.displayName = "Th";
Td.displayName = "Td";

export { DisplayTable, Tbody, Td, Th, Thead, Tr };
