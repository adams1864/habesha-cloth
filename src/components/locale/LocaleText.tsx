"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/utils/locale";

type LocaleTextProps = {
  text?: Locale;
};
export const LocaleText = ({ text }: LocaleTextProps) => {
  const locale = useLocale();

  const defaultLocale = locale;

  if (!text) {
    return null;
  }

  if (defaultLocale) {
    return <>{text?.[defaultLocale] || text?.["en"] || ""}</>;
  }
  return <>{text?.["en"]}</>;
};
