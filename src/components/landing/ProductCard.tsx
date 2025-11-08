"use client";

import type { Product } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%236b7280' font-size='32' text-anchor='middle' font-family='system-ui' dy='.35em'%3ENo Image%3C/text%3E%3C/svg%3E";

export function ProductCard({ product }: ProductCardProps) {
  const params = useParams();
  const locale = params?.locale || "en";
  const primaryImage = product.images[0] ?? product.coverImage ?? FALLBACK_IMAGE;
  const formattedPrice = Number.isFinite(product.price)
    ? new Intl.NumberFormat(locale as string, {
        style: "currency",
        currency: "ETB",
        minimumFractionDigits: 2,
      }).format(product.price)
    : `ETB ${product.price}`;

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group relative block"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50">
        <div className="relative h-full w-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium group-hover:text-[#d6001c] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{formattedPrice}</p>
      </div>
    </Link>
  );
}
