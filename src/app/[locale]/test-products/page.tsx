import React from "react";
import { products } from "@/data/products";
import { ProductGrid } from "@components/landing/ProductGrid";
import type { Product } from "@/lib/api";

interface PageProps {
  params: { locale: string };
}

export default function TestProductsPage({ params }: PageProps) {
  const firstFour: Product[] = products.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? "",
    category: (p as any).category ?? "",
    size: p.sizes ? p.sizes.join(", ") : "",
    gender: (p as any).gender ?? "",
    price: p.price,
    stock: (p as any).stock ?? 0,
    status: "published" as const,
    coverImage: p.image,
    image1: null,
    image2: null,
    images: p.images ?? (p.image ? [p.image] : []),
    color: "",
    colorValues: [],
    colors: [],
    createdAt: null,
    itemNumber: (p as any).itemNumber ?? null,
    rating: null,
    reviewCount: null,
  }));
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="sr-only">Test Products</h1>
      <ProductGrid products={firstFour} />
    </main>
  );
}
