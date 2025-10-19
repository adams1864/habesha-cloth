"use client";

import { Entity } from "./_components/Entity";

// Dummy data for discounts
const dummyDiscounts = [
  {
    id: "1",
    code: "SUMMER2024",
    type: "percentage" as const,
    value: 20,
    status: "active" as const,
    applicationType: "all" as const,
    products: null,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    maxUsageCount: 100,
    currentUsageCount: 45,
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "fixed" as const,
    value: 10,
    status: "active" as const,
    applicationType: "specific" as const,
    products: [
      { id: "1", name: "Premium Cotton T-Shirt" },
      { id: "2", name: "Leather Jacket" },
    ],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    maxUsageCount: null,
    currentUsageCount: 234,
  },
  {
    id: "3",
    code: "SPRING15",
    type: "percentage" as const,
    value: 15,
    status: "expired" as const,
    applicationType: "all" as const,
    products: null,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-31"),
    maxUsageCount: 50,
    currentUsageCount: 50,
  },
  {
    id: "4",
    code: "NEWYEAR2024",
    type: "percentage" as const,
    value: 25,
    status: "expired" as const,
    applicationType: "specific" as const,
    products: [{ id: "3", name: "Winter Essentials Bundle" }],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    maxUsageCount: 200,
    currentUsageCount: 178,
  },
  {
    id: "5",
    code: "BLACKFRIDAY",
    type: "percentage" as const,
    value: 30,
    status: "inactive" as const,
    applicationType: "all" as const,
    products: null,
    startDate: new Date("2024-11-29"),
    endDate: new Date("2024-11-30"),
    maxUsageCount: 500,
    currentUsageCount: 0,
  },
];

export default function DiscountPage() {
  return <Entity data={dummyDiscounts} total={dummyDiscounts.length} />;
}
