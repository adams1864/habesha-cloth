"use client";

import type { Product } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import TelegramButton from "@/components/telegram/TelegramButton";

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
    <div className="group relative block">
      <Link href={`/${locale}/product/${product.id}`} className="block">
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
      </Link>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium group-hover:text-[#d6001c] transition-colors">
            <Link href={`/${locale}/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-sm text-gray-600">{formattedPrice}</p>
        </div>
        <div className="flex-shrink-0">
          <TelegramButton className="!px-2 !py-1 text-xs" />
        </div>
      </div>
    </div>
  );
}
