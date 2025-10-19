import { z } from "zod";
import {
  LOCALE_REQUIRED_INPUT_SCHEMA,
  LOCALE_OPTIONAL_INPUT_SCHEMA,
} from "@/utils/locale";

// Product categories
export const PRODUCT_CATEGORIES = [
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "toys", label: "Toys" },
  { value: "bedding", label: "Bedding" },
  { value: "feeding", label: "Feeding" },
  { value: "other", label: "Other" },
] as const;

// Product sizes
export const PRODUCT_SIZES = [
  { value: "0-3m", label: "0-3 Months" },
  { value: "3-6m", label: "3-6 Months" },
  { value: "6-12m", label: "6-12 Months" },
  { value: "12-18m", label: "12-18 Months" },
  { value: "18-24m", label: "18-24 Months" },
  { value: "2-3y", label: "2-3 Years" },
  { value: "3-4y", label: "3-4 Years" },
  { value: "one-size", label: "One Size" },
] as const;

// Product genders
export const PRODUCT_GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unisex", label: "Unisex" },
] as const;

// Product colors
export const PRODUCT_COLORS = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
] as const;

// Product status
export const PRODUCT_STATUS = [
  { value: "published", label: "Published" },
  { value: "unpublished", label: "Unpublished" },
] as const;

export const productSchema = z.object({
  title: LOCALE_REQUIRED_INPUT_SCHEMA,
  description: LOCALE_OPTIONAL_INPUT_SCHEMA,
  category: z.string().min(1, "Category is required"),
  gender: z.string().min(1, "Gender is required"),
  color: z.array(z.string()).min(1, "At least one color is required"),
  size: z.string().min(1, "Size is required"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive("Price must be greater than 0"),
  stock: z.coerce
    .number({ message: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  status: z.enum(["published", "unpublished"], {
    message: "Status is required",
  }),
  coverImage: z
    .object({
      url: z.string(),
    })
    .optional()
    .nullable(),
  images: z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .max(2, "Maximum 2 additional images allowed")
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
