
"use client";

import { Button } from "@mantine/core";
import { getBundles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bundle } from "@/lib/api";

export function FeaturedBundle() {
  const [bundleProducts, setBundleProducts] = useState<Bundle[]>([]);

  useEffect(() => {
    async function fetchBundles() {
      const bundles = await getBundles();
      setBundleProducts(bundles);
    }

    fetchBundles();
  }, []);

  if (bundleProducts.length === 0) {
    return null;
  }

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
              href={`/en/product/${bundleProducts[0].id}`}
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
          {bundleProducts.map((product) => (
            <div
              key={product.id}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <div className="relative h-full w-full">
                <Image
                  src={product.bundleImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-2 left-2 text-xs font-medium text-white">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
