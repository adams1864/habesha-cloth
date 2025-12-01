"use client";

import React from "react";

type Props = {
  url?: string;
  label?: string;
  className?: string;
};

export default function TelegramButton({
  url,
  label = "Telegram",
  className = "",
}: Props) {
  const href = url ?? process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/+WNfcWuS6umgyMjRk";
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0088cc] text-white text-sm font-medium hover:bg-[#0078b9] transition-colors " +
        className
      }
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 64 64"
        fill="none"
        className="shrink-0"
      >
        {/* Octagonal blue background */}
        <path
          d="M20 4h24l16 16v24L44 60H20L4 44V20L20 4z"
          fill="#34A8E0"
        />
        {/* White paper plane */}
        <path
          d="M47.2 19.2L17.4 31c-1.8.7-1.7 3.3.2 3.8l7.5 1.9 2.9 9.4c.4 1.3 2 1.7 2.9.7l4.1-4.3 7.6 5.7c1.1.8 2.7.2 3.1-1.1l5.5-26.6c.4-1.6-1.1-3-2.9-2.5z"
          fill="#FFFFFF"
        />
      </svg>
      <span className="hidden xs:inline">{label}</span>
    </a>
  );
}
