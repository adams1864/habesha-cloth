"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import { useRouter } from "@/i18n/routing";
import { StarRating } from "./StarRating";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { BundleModal } from "./BundleModal";
import type { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [showBundleModal, setShowBundleModal] = useState(false);
  const router = useRouter();

  const handleBuyNow = () => {
    // TODO: Add product to cart before redirecting
    router.push("/cart");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.itemNumber && (
            <p className="text-sm text-gray-500">Item #{product.itemNumber}</p>
          )}
        </div>

        {product.rating && (
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            {product.reviewCount && (
              <p className="text-sm text-gray-500">
                ({product.reviewCount} reviews)
              </p>
            )}
          </div>
        )}

        {product.description && (
          <p className="text-gray-600">{product.description}</p>
        )}

        {product.sizes && <SizeSelector sizes={product.sizes} />}

        {product.colors && <ColorSelector colors={product.colors} />}

        <div className="flex flex-col gap-4">
          <span className="text-3xl font-bold text-[#d6001c]">
            ETB {product.price.toFixed(2)}
          </span>
          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              color="red"
              radius="xl"
              leftSection={
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <title>Shopping bag icon</title>
                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z" />
                </svg>
              }
            >
              Add to Cart
            </Button>
            <Button
              className="flex-1"
              size="lg"
              color="red"
              variant="outline"
              radius="xl"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Create a Giftbox
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            Add this item to a giftbox and get a discount!
          </p>
          <Button
            onClick={() => setShowBundleModal(true)}
            fullWidth
            size="lg"
            color="red"
            variant="light"
            radius="xl"
            leftSection={
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <title>Add circle icon</title>
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
              </svg>
            }
          >
            Create Custom Giftbox
          </Button>
        </div>
      </div>

      {showBundleModal && (
        <BundleModal
          currentProduct={product}
          onClose={() => setShowBundleModal(false)}
        />
      )}
    </>
  );
}
