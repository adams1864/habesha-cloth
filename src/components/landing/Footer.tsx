"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-300">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-2 flex items-center gap-2">
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
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Habesha Bloom. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:col-span-2">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-semibold">Shop</h4>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Clothing
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Accessories
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-semibold">Help</h4>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                FAQ
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-semibold">Legal</h4>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Shipping & Returns
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-[#d6001c] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#d6001c] transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Facebook</title>
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#d6001c] transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Instagram</title>
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#d6001c] transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Twitter</title>
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
