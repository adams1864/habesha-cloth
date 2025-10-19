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
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-[#d6001c]"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Habesha Bloom Logo"
            >
              <title>Habesha Bloom Logo</title>
              <path
                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-xl font-bold">Habesha Bloom</h1>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
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
    </header>
  );
}
