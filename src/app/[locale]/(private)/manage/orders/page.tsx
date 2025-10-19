"use client";

import { Entity } from "./_components/Entity";

// Dummy data for paid transactions
const dummyOrders = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "Abebe Kebede",
    email: "abebe@example.com",
    amount: 299.99,
    status: "paid" as const,
    date: "2024-10-01T10:30:00Z",
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    customerName: "Sara Mohammed",
    email: "sara@example.com",
    amount: 149.5,
    status: "paid" as const,
    date: "2024-10-02T14:15:00Z",
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    customerName: "John Smith",
    email: "john@example.com",
    amount: 89.99,
    status: "paid" as const,
    date: "2024-10-03T09:20:00Z",
  },
  {
    id: "4",
    orderId: "ORD-2024-004",
    customerName: "Mulu Tesfaye",
    email: "mulu@example.com",
    amount: 199.99,
    status: "pending" as const,
    date: "2024-10-04T16:45:00Z",
  },
  {
    id: "5",
    orderId: "ORD-2024-005",
    customerName: "David Johnson",
    email: "david@example.com",
    amount: 450.0,
    status: "paid" as const,
    date: "2024-10-05T11:00:00Z",
  },
];

export default function OrdersPage() {
  // Filter only paid transactions
  const paidOrders = dummyOrders.filter((order) => order.status === "paid");

  return <Entity data={paidOrders} total={paidOrders.length} />;
}
