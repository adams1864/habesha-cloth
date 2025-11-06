"use client";

import { Box, Button, Grid, Group, Select, Stack, Text } from "@mantine/core";
import type React from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { ImageInput } from "@/components/form/ImageInput";
import {
  SelectRelation,
  type OptionType,
} from "@/components/form/SelectRelation";
import { LocaleInputText } from "@/components/locale/LocaleInputText";
import { LocaleInputTextarea } from "@/components/locale/LocaleInputTextarea";
import type { BundleFormData } from "../_actions/bundle.schema";
import { BUNDLE_STATUS } from "../_actions/bundle.schema";
import { useBundleForm } from "./useBundleForm";
import { getProducts as fetchProducts } from "@/lib/api";

type FormDetailProps = {
  mode?: "new" | "detail";
  bundle?: BundleFormData & { id?: string };
};

const BundleFormDetails: React.FC<FormDetailProps> = (props) => {
  const { mode = "new", bundle } = props;

  const router = useRouter();

  const {
    form,
    creating,
    updating,
    deleting,
    onCreate,
    onUpdate,
    onDelete,
    coverFile,
    setCoverFile,
    setCoverDeleted,
  } = useBundleForm(props);

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const isSubmitting = creating || updating;

  // Function to fetch products for SelectRelation
  const getProducts = useCallback(async ({ search }: { search: string }) => {
    try {
      const result = await fetchProducts({
        perPage: 20,
        search: search && search.trim().length > 0 ? search.trim() : undefined,
      });

      return result.data.map((product) => ({
        id: String(product.id),
        name: product.name ?? "Untitled product",
      })) as OptionType[];
    } catch (error) {
      console.error("Failed to load products for bundle form", error);
      return [];
    }
  }, []);

  return (
    <Box className="max-w-9xl flex w-full">
      <Box className="w-full">
        <Stack gap="md">
          <LocaleInputText
            label="Title"
            field="title"
            required
            register={register}
            errors={errors}
            placeholder="Enter bundle title (e.g., Summer Collection)"
          />

          <LocaleInputTextarea
            label="Description"
            field="description"
            register={register}
            errors={errors}
            placeholder="Enter bundle description"
            autosize
            minRows={3}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    description="Select whether to publish or unpublish this bundle"
                    placeholder="Select status"
                    data={BUNDLE_STATUS}
                    withAsterisk
                    error={errors.status?.message}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Box>
            <Text size="sm" fw={500} mb="xs">
              Cover Image <span style={{ color: "red" }}>*</span>
            </Text>
            <Controller
              name="coverImage"
              control={control}
              render={({ field: { onChange } }) => (
                <ImageInput
                  label=""
                  className="w-full"
                  aspectRatio="video"
                  value={
                    coverFile ||
                    (bundle?.coverImage?.url ? bundle.coverImage.url : null)
                  }
                  onChange={(file) => {
                    setCoverFile(file || null);
                    if (file) {
                      onChange({ url: URL.createObjectURL(file) });
                    }
                  }}
                  onRemove={() => {
                    setCoverFile(null);
                    setCoverDeleted(true);
                    onChange(null);
                  }}
                  error={errors.coverImage?.message}
                />
              )}
            />
            {errors.coverImage && (
              <Text size="xs" c="red" mt="xs">
                {errors.coverImage.message}
              </Text>
            )}
          </Box>

          <Box>
            <Controller
              name="products"
              control={control}
              render={({ field }) => (
                <SelectRelation
                    {...field}
                    value={Array.isArray(field.value) ? field.value : []}
                    onChange={(val) =>
                      field.onChange(Array.isArray(val) ? val : [])
                    }
                  label="Select Products"
                  description="Choose which products are included in this bundle"
                  placeholder="Search and select products"
                  withAsterisk
                  variant="multiple"
                  getEntity={getProducts}
                  error={errors.products?.message}
                />
              )}
            />
          </Box>

          <Group justify="space-between" mt="xl">
            <Group>
              {mode === "detail" && (
                <Button
                  color="red"
                  variant="outline"
                  onClick={onDelete}
                  loading={deleting}
                  disabled={isSubmitting}
                >
                  Delete
                </Button>
              )}
            </Group>

            <Group>
              <Button
                variant="default"
                disabled={isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                onClick={mode === "new" ? onCreate : onUpdate}
                loading={isSubmitting}
              >
                {mode === "new" ? "Create Bundle" : "Update Bundle"}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
};

export default BundleFormDetails;
