"use client";

import { type ComponentProps, forwardRef } from "react";

import { Link } from "@/i18n/routing";

const NavigationLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof Link>
>(({ href, ...rest }, ref) => {
  return <Link ref={ref} href={href} {...rest} />;
});

NavigationLink.displayName = "NavigationLink";

export default NavigationLink;
