"use client";

import { Entity } from "./_components/Entity";

// Dummy data for bundles
const dummyBundles = [
  {
    id: "1",
    title: { en: "Summer Collection", am: "የበጋ ስብስብ" },
    description: {
      en: "Perfect bundle for the summer season",
      am: "ለበጋ ወራት ጥሩ ስብስብ",
    },
    status: "published" as const,
    coverImage: {
      url: "https://placehold.co/600x400/4A90E2/ffffff?text=Summer",
    },
    products: [
      { id: "1", name: { en: "Premium Cotton T-Shirt", am: "ፕሪሚየም ጥጥ ሸሚዝ" } },
      { id: "4", name: { en: "Summer Dress", am: "የበጋ ቀሚስ" } },
      { id: "8", name: { en: "Sun Hat", am: "የፀሐይ ኮፍያ" } },
    ],
  },
  {
    id: "2",
    title: { en: "Winter Essentials", am: "የክረምት አስፈላጊዎች" },
    description: {
      en: "Stay warm with our winter bundle",
      am: "በክረምት ስብስባችን ሞቅ ይበሉ",
    },
    status: "published" as const,
    coverImage: {
      url: "https://placehold.co/600x400/E27A3F/ffffff?text=Winter",
    },
    products: [
      { id: "2", name: { en: "Leather Jacket", am: "ቆዳ ጃኬት" } },
      { id: "5", name: { en: "Winter Coat", am: "የክረምት ኮት" } },
      { id: "3", name: { en: "Cotton Pants", am: "ጥጥ ሱሪ" } },
    ],
  },
  {
    id: "3",
    title: { en: "School Starter Pack", am: "የትምህርት ቤት መጀመሪያ ጥቅል" },
    description: {
      en: "Everything you need to start school",
      am: "ትምህርት ቤትን ለመጀመር የሚያስፈልግዎ ሁሉ",
    },
    status: "unpublished" as const,
    coverImage: {
      url: "https://placehold.co/600x400/45B7D1/ffffff?text=School",
    },
    products: [
      { id: "7", name: { en: "Backpack", am: "የጀርባ ቦርሳ" } },
      { id: "1", name: { en: "Premium Cotton T-Shirt", am: "ፕሪሚየም ጥጥ ሸሚዝ" } },
      { id: "3", name: { en: "Cotton Pants", am: "ጥጥ ሱሪ" } },
      { id: "6", name: { en: "Sneakers", am: "ስኒከርስ" } },
    ],
  },
  {
    id: "4",
    title: { en: "Casual Combo", am: "መደበኛ ያልሆነ ጥምረት" },
    description: {
      en: "Casual wear for everyday comfort",
      am: "ለዕለት ተዕለት ምቾት መደበኛ ያልሆነ ልብስ",
    },
    status: "published" as const,
    coverImage: {
      url: "https://placehold.co/600x400/96CEB4/ffffff?text=Casual",
    },
    products: [
      { id: "1", name: { en: "Premium Cotton T-Shirt", am: "ፕሪሚየም ጥጥ ሸሚዝ" } },
      { id: "3", name: { en: "Cotton Pants", am: "ጥጥ ሱሪ" } },
      { id: "6", name: { en: "Sneakers", am: "ስኒከርስ" } },
    ],
  },
  {
    id: "5",
    title: { en: "Adventure Pack", am: "የጀብድ ጥቅል" },
    description: {
      en: "Ready for outdoor adventures",
      am: "ለውጭ ጀብዱ ዝግጁ",
    },
    status: "unpublished" as const,
    coverImage: {
      url: "https://placehold.co/600x400/F4A259/ffffff?text=Adventure",
    },
    products: [
      { id: "7", name: { en: "Backpack", am: "የጀርባ ቦርሳ" } },
      { id: "8", name: { en: "Sun Hat", am: "የፀሐይ ኮፍያ" } },
      { id: "6", name: { en: "Sneakers", am: "ስኒከርስ" } },
    ],
  },
];

export default function BundlePage() {
  return <Entity data={dummyBundles} total={dummyBundles.length} />;
}
