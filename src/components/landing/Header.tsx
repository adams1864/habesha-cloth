"use client";

import { ActionIcon, Menu, TextInput } from "@mantine/core";
import {
  IconDashboard,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Header() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <header className="sticky top-0 z-10 border-b border-gray-300 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* left: navigation links (kept but moved left) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <nav className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Clothing
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Accessories
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Sale
              </Link>
            </nav>
          </div>

          {/* center: brand text only */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Link
              href="/"
              aria-label="Baby Clothing home"
              className="inline-block text-sm tracking-[0.3em] text-gray-900 uppercase"
            >
              Baby Clothing
            </Link>
          </div>

          {/* right: search, cart and user */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <TextInput
                placeholder="Search"
                leftSection={<IconSearch size={18} />}
                classNames={{
                  input: "h-10 w-40 lg:w-64 rounded-xl",
                }}
              />
            </div>

            <ActionIcon
              component={Link}
              href="/cart"
              variant="subtle"
              size="lg"
              radius="lg"
              className="hover:bg-[#d6001c]/10 hover:text-[#d6001c]"
              aria-label="Shopping cart"
            >
              <IconShoppingBag size={20} stroke={1.5} />
            </ActionIcon>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  radius="lg"
                  className="hover:bg-[#d6001c]/10 hover:text-[#d6001c]"
                  aria-label="User account"
                >
                  <IconUser size={20} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component={Link}
                  href={`/${locale}/manage/dashboard`}
                  leftSection={<IconDashboard size={16} stroke={1.5} />}
                >
                  Management
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
