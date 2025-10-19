"use client";

import { Entity } from "./_components/Entity";

// Dummy data for products
const dummyProducts = [
  {
    id: "1",
    title: "Premium Cotton T-Shirt",
    category: "T-Shirts" as const,
    status: "published" as const,
    price: 29.99,
  },

  {
    id: "4",
    title: "Leather Jacket",
    category: "Jackets" as const,
    status: "draft" as const,
    price: 199.99,
  },
  {
    id: "5",
    title: "Winter Essentials Bundle",
    category: "Kits" as const,
    status: "published" as const,
    price: 299.99,
  },
];

export default function ProductPage() {
  return <Entity data={dummyProducts} total={dummyProducts.length} />;
}
