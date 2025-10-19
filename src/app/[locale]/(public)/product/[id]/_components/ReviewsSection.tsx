"use client";

import { ActionIcon } from "@mantine/core";
import { StarRating } from "./StarRating";
import Image from "next/image";
import type { Review } from "@/data/products";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export function ReviewsSection({
  rating,
  reviewCount,
  reviews,
}: ReviewsSectionProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#d6001c]/10 p-6">
          <p className="text-5xl font-black text-[#d6001c]">
            {rating.toFixed(1)}
          </p>
          <StarRating rating={rating} size="md" />
          <p className="text-sm text-gray-500">
            Based on {reviewCount} reviews
          </p>
        </div>

        <div className="col-span-1 flex flex-col justify-center gap-2 md:col-span-2">
          {ratingDistribution.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-4">
              <p className="w-10 text-sm text-gray-600">{stars} star</p>
              <div className="h-2 flex-1 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#d6001c]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="w-10 text-right text-sm font-medium text-gray-600">
                {percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4 border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src={review.avatar}
                  alt={review.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{review.author}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>

            <StarRating rating={review.rating} size="sm" />

            <p className="text-sm text-gray-600">{review.comment}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ActionIcon.Group>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="md"
                  aria-label="Mark review as helpful"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>Thumbs up icon</title>
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>
                </ActionIcon>
                <span className="px-2">{review.helpful}</span>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="md"
                  aria-label="Mark review as not helpful"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>Thumbs down icon</title>
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>
                </ActionIcon>
                {review.notHelpful > 0 && (
                  <span className="px-2">{review.notHelpful}</span>
                )}
              </ActionIcon.Group>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
