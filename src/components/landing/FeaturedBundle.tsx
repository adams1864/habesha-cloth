
"use client";

import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBundles, type Bundle } from "@/lib/api";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%236b7280' font-size='36' text-anchor='middle' font-family='system-ui' dy='.35em'%3ENo Image%3C/text%3E%3C/svg%3E";

function sanitizeImageUrl(value: string | null | undefined): string {
  if (!value) return PLACEHOLDER_IMAGE;
  if (/placehold\.co/i.test(value)) {
    return PLACEHOLDER_IMAGE;
  }
  return value;
}

export function FeaturedBundle() {
  const [featuredBundle, setFeaturedBundle] = useState<Bundle | null>(null);

  useEffect(() => {
    async function fetchBundles() {
      try {
        const response = await getBundles({ perPage: 1, status: "published" });
        setFeaturedBundle(response.data[0] ?? null);
      } catch (error) {
        console.error("Failed to load featured bundle", error);
        setFeaturedBundle(null);
      }
    }

    void fetchBundles();
  }, []);

  if (!featuredBundle) {
    return null;
  }

  const products = Array.isArray(featuredBundle.products)
    ? featuredBundle.products.filter((product) => Boolean(product.coverImage))
    : [];

  const primaryProduct = products[0] ?? null;
  const fallbackImage = sanitizeImageUrl(
    featuredBundle.coverImage || featuredBundle.bundleImage,
  );

  const galleryItems = (products.length > 0
    ? products.map((product) => ({
        id: String(product.id),
        image: sanitizeImageUrl(product.coverImage) || fallbackImage,
        label: product.name ?? featuredBundle.title ?? "Featured bundle",
      }))
    : [
        {
          id: String(featuredBundle.id),
          image: fallbackImage,
          label: featuredBundle.title ?? "Featured bundle",
        },
      ]) satisfies Array<{ id: string; image: string; label: string }>;

  return (
    <section className="mb-12 rounded-xl bg-pink-50 p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">
            Starter Gift Box
          </h3>
          <p className="mt-2 text-lg font-semibold mb-3 animate-shimmer">
            Expandable baby clothes rooted in Ethiopian culture - made for
            growth
          </p>
          <p className="mt-2 text-gray-600">
            Get everything you need for your newborn with our curated starter
            kit. Save 15% when you buy the giftbox!
          </p>
          <div className="mt-4 flex items-center gap-4">
            <p className="text-2xl font-bold text-[#d6001c]">ETB 85</p>
            <p className="text-lg text-gray-500 line-through">ETB 100</p>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button
              component={Link}
              size="md"
              radius="lg"
              href={
                primaryProduct
                  ? `/en/product/${primaryProduct.id}`
                  : `/en/bundle/${featuredBundle.id}`
              }
            >
              View Giftbox
            </Button>
            <Button
              size="md"
              variant="outline"
              className="border-[#d6001c]/50 text-[#d6001c] hover:bg-[#d6001c]/10"
              radius="lg"
            >
              Customize
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.image || fallbackImage}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-2 left-2 text-xs font-medium text-white">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
