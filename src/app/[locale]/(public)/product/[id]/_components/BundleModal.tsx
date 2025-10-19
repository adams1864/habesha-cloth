"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button, ActionIcon, Checkbox } from "@mantine/core";
import { products, type Product } from "@/data/products";

interface BundleModalProps {
  currentProduct: Product;
  onClose: () => void;
}

export function BundleModal({ currentProduct, onClose }: BundleModalProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    currentProduct,
  ]);

  const availableProducts = products.filter((p) => p.id !== currentProduct.id);

  const handleToggleProduct = (product: Product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 6) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bundle-modal-title"
    >
      <div
        className="w-full max-w-4xl rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2
            id="bundle-modal-title"
            className="text-2xl font-bold text-gray-900"
          >
            Create Your Custom Giftbox
          </h2>
          <ActionIcon
            onClick={onClose}
            variant="subtle"
            color="gray"
            size="lg"
            radius="lg"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>Close icon</title>
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </ActionIcon>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Add up to 5 more items:
            </h3>
            <div className="space-y-4 pr-4 max-h-[400px] overflow-y-auto">
              {availableProducts.slice(0, 5).map((product) => {
                const isSelected = selectedProducts.find(
                  (p) => p.id === product.id,
                );
                return (
                  <div
                    key={product.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-all ${
                      isSelected
                        ? "border-[#d6001c] bg-[#d6001c]/10"
                        : "border-gray-300 hover:border-[#d6001c]/50"
                    }`}
                  >
                    <Checkbox
                      checked={!!isSelected}
                      onChange={() => handleToggleProduct(product)}
                      color="red"
                      size="md"
                      label=""
                      aria-label={`Add ${product.name} to giftbox`}
                    />
                    <div className="relative h-16 w-16 flex-shrink-0 rounded bg-gray-50 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-[#d6001c]">
                        ETB {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 md:rounded-r-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Your Giftbox ({selectedProducts.length}/6 items)
            </h3>
            <div className="flex-1 space-y-4">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded bg-white overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ETB {product.price.toFixed(2)}
                    </p>
                  </div>
                  {product.id !== currentProduct.id && (
                    <ActionIcon
                      onClick={() => handleToggleProduct(product)}
                      variant="subtle"
                      color="gray"
                      size="sm"
                      aria-label={`Remove ${product.name} from giftbox`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <title>Delete icon</title>
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
                      </svg>
                    </ActionIcon>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ETB {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#d6001c]">
                  <span className="font-medium">Giftbox Discount (10%)</span>
                  <span className="font-medium">
                    -ETB {discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Giftbox Total</span>
                  <span className="text-[#d6001c]">ETB {total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                fullWidth
                size="lg"
                color="red"
                radius="xl"
                className="mt-6"
                leftSection={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>Check circle icon</title>
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                }
              >
                Complete Giftbox
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
