"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface BreadcrumbProps {
  productName: string;
}

export function Breadcrumb({ productName }: BreadcrumbProps) {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
      <Link
        href={`/${locale}`}
        className="hover:text-[#d6001c] transition-colors"
      >
        Home
      </Link>
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>Breadcrumb separator</title>
        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
      </svg>
      <Link
        href={`/${locale}`}
        className="hover:text-[#d6001c] transition-colors"
      >
        Clothing
      </Link>
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>Breadcrumb separator</title>
        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
      </svg>
      <span className="font-medium text-gray-900">{productName}</span>
    </div>
  );
}
