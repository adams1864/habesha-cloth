import { z } from "zod";
import {
  LOCALE_REQUIRED_INPUT_SCHEMA,
  LOCALE_OPTIONAL_INPUT_SCHEMA,
} from "@/utils/locale";

// Bundle status
export const BUNDLE_STATUS = [
  { value: "published", label: "Published" },
  { value: "unpublished", label: "Unpublished" },
] as const;

export const bundleSchema = z.object({
  title: LOCALE_REQUIRED_INPUT_SCHEMA,
  description: LOCALE_OPTIONAL_INPUT_SCHEMA,
  status: z.enum(["published", "unpublished"], {
    message: "Status is required",
  }),
  coverImage: z
    .object({
      url: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Cover image is required",
    }),
  products: z
    .array(
      z.object({
        id: z.string(),
        name: z.union([z.string(), z.record(z.string(), z.string())]),
      })
    )
    .min(1, "At least one product must be selected")
    .refine((products) => products && products.length > 0, {
      message: "At least one product must be selected for the bundle",
    }),
});

export type BundleFormData = z.infer<typeof bundleSchema>;
