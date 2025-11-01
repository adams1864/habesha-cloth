"use client";

import type { Product } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const params = useParams();
  const locale = params?.locale || "en";
  const primaryImage = product.images[0] ?? product.coverImage;
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
