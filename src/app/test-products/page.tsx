import React from "react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/landing/ProductGrid";

export default function TestProductsPage() {
  const firstFour = products.slice(0, 4);
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="sr-only">Test Products</h1>
      <ProductGrid products={firstFour} />
    </main>
  );
}
