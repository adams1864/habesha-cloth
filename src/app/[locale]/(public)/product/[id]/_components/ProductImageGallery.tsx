"use client";

import { useState } from "react";
import Image from "next/image";
import { UnstyledButton } from "@mantine/core";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 row-span-2 relative h-[480px] bg-gray-50 overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - View ${selectedImage + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          loading="eager"
          className="object-cover"
          priority
        />
      </div>
      {images.slice(1).map((image, index) => {
        const imageIndex = index + 1;
        return (
          <UnstyledButton
            key={`thumbnail-${imageIndex}`}
            onClick={() => setSelectedImage(imageIndex)}
            className={`relative h-[220px] bg-gray-50 overflow-hidden transition-all ${
              selectedImage === imageIndex
                ? "ring-2 ring-[#d6001c] ring-offset-2"
                : "hover:opacity-80"
            }`}
            aria-label={`View image ${imageIndex + 1} of ${productName}`}
          >
            <Image
              src={image}
              alt={`${productName} - Thumbnail ${imageIndex + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </UnstyledButton>
        );
      })}
    </div>
  );
}
