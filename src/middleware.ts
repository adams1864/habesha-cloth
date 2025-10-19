import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const middleware = createMiddleware(routing);

export default middleware;

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(am|en)/:path*",

    "/((?!_next|_vercel|api|sw\\.js|ingest|.*\\..*).*)",
  ],
};
