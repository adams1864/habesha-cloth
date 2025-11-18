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
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M22 3L2 12.2l4.5 1.4L9 20l3-2 6.5 3L22 3z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
      <span className="hidden xs:inline">{label}</span>
    </a>
  );
}
