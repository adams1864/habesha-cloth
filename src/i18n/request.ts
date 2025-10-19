import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!(locale && routing.locales.includes(locale as Locale))) {
    locale = routing.defaultLocale;
  }

  const messages =
    locale === "en"
      ? (await import("../../messages/en.json")).default
      : (await import(`../../messages/${locale}.json`)).default;

  // const databaseMessages = await getTenantBasic();
  // if (databaseMessages.locale) {
  //   const databaseLocaleMessages = databaseMessages.locale?.[locale ?? 'en'];

  //   messages = deepmerge(messages, databaseLocaleMessages);
  // }

  return {
    messages,
    locale,

    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === "production"
          ? "MISSING_MESSAGE"
          : "MISSING_MESSAGE: Could not resolve `missing` in `translation`.")
      ) {
        // Do nothing, this error is triggered on purpose
      }
      // else {
      //   logger.error(JSON.stringify(error.message));
      // }
    },
    getMessageFallback({ key }) {
      return process.env.NODE_ENV === "production" ? key : `[T] ${key}`;
    },
  };
});
