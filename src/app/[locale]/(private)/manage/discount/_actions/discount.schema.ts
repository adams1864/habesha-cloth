import { z } from "zod";
import {
  LOCALE_REQUIRED_INPUT_SCHEMA,
  LOCALE_OPTIONAL_INPUT_SCHEMA,
} from "@/utils/locale";

// Discount types
export const DISCOUNT_TYPES = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
] as const;

// Discount status
export const DISCOUNT_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "expired", label: "Expired" },
] as const;

// Application types
export const APPLICATION_TYPES = [
  { value: "all", label: "All Products" },
  { value: "specific", label: "Specific Products" },
] as const;

export const discountSchema = z
  .object({
    code: LOCALE_REQUIRED_INPUT_SCHEMA,
    description: LOCALE_OPTIONAL_INPUT_SCHEMA,
    type: z.enum(["percentage", "fixed"], {
      message: "Discount type is required",
    }),
    value: z.coerce
      .number({ message: "Value must be a number" })
      .positive("Value must be greater than 0"),
    status: z.enum(["active", "inactive", "expired"], {
      message: "Status is required",
    }),
    applicationType: z.enum(["all", "specific"], {
      message: "Application type is required",
    }),
    products: z
      .array(
        z.object({
          id: z.string(),
          name: z.union([z.string(), z.record(z.string(), z.string())]),
        })
      )
      .optional()
      .nullable(),
    startDate: z.coerce.date({
      message: "Start date is required and must be a valid date",
    }),
    endDate: z.coerce.date({
      message: "End date is required and must be a valid date",
    }),
    minPurchaseAmount: z.coerce
      .number({ message: "Min purchase must be a number" })
      .min(0, "Min purchase cannot be negative")
      .optional()
      .nullable(),
    maxUsageCount: z.coerce
      .number({ message: "Max usage must be a number" })
      .int("Max usage must be a whole number")
      .min(1, "Max usage must be at least 1")
      .optional()
      .nullable(),
    currentUsageCount: z.coerce.number().int().min(0).default(0).optional(),
  })
  .refine(
    (data) => {
      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.applicationType === "specific") {
        return data.products && data.products.length > 0;
      }
      return true;
    },
    {
      message: "At least one product must be selected for specific discounts",
      path: ["products"],
    }
  );

export type DiscountFormData = z.infer<typeof discountSchema>;
