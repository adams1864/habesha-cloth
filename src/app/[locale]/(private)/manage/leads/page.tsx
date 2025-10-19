"use client";

import { Entity } from "./_components/Entity";

// Dummy data for leads (carts that haven't been completed)
const dummyLeads = [
  {
    id: "1",
    cartId: "CART-2024-001",
    customerName: "Tigist Hailu",
    email: "tigist@example.com",
    amount: 459.99,
    status: "in_cart" as const,
    date: "2024-10-04T08:15:00Z",
  },
  {
    id: "2",
    cartId: "CART-2024-002",
    customerName: "Daniel Assefa",
    email: "daniel@example.com",
    amount: 129.5,
    status: "checkout_started" as const,
    date: "2024-10-04T12:30:00Z",
  },
  {
    id: "3",
    cartId: "CART-2024-003",
    customerName: "Emma Wilson",
    email: "emma@example.com",
    amount: 89.99,
    status: "abandoned" as const,
    date: "2024-10-03T18:45:00Z",
  },
  {
    id: "4",
    cartId: "CART-2024-004",
    customerName: "Yohannes Bekele",
    email: "yohannes@example.com",
    amount: 199.99,
    status: "in_cart" as const,
    date: "2024-10-05T09:20:00Z",
  },
  {
    id: "5",
    cartId: "CART-2024-005",
    customerName: "Sofia Martinez",
    email: "sofia@example.com",
    amount: 350.0,
    status: "checkout_started" as const,
    date: "2024-10-05T14:10:00Z",
  },
  {
    id: "6",
    cartId: "CART-2024-006",
    customerName: "Michael Brown",
    email: "michael@example.com",
    amount: 75.99,
    status: "abandoned" as const,
    date: "2024-10-02T16:30:00Z",
  },
  {
    id: "7",
    cartId: "CART-2024-007",
    customerName: "Hana Tadesse",
    email: "hana@example.com",
    amount: 299.99,
    status: "in_cart" as const,
    date: "2024-10-05T10:45:00Z",
  },
];

export default function LeadsPage() {
  return <Entity data={dummyLeads} total={dummyLeads.length} />;
}
