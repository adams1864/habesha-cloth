"use client";

import { Box, Button, Grid, Group, Select, Stack, Text } from "@mantine/core";
import type React from "react";
import { useCallback } from "react";
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

type FormDetailProps = {
  mode?: "new" | "detail";
  bundle?: BundleFormData & { id?: string };
};

const BundleFormDetails: React.FC<FormDetailProps> = (props) => {
  const { mode = "new", bundle } = props;

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
    // TODO: Replace with actual API call
    // This is dummy data for now
    const dummyProducts = [
      { id: "1", name: { en: "Premium Cotton T-Shirt", am: "ፕሪሚየም ጥጥ ሸሚዝ" } },
      { id: "2", name: { en: "Leather Jacket", am: "ቆዳ ጃኬት" } },
      { id: "3", name: { en: "Cotton Pants", am: "ጥጥ ሱሪ" } },
      { id: "4", name: { en: "Summer Dress", am: "የበጋ ቀሚስ" } },
      { id: "5", name: { en: "Winter Coat", am: "የክረምት ኮት" } },
      { id: "6", name: { en: "Sneakers", am: "ስኒከርስ" } },
      { id: "7", name: { en: "Backpack", am: "የጀርባ ቦርሳ" } },
      { id: "8", name: { en: "Sun Hat", am: "የፀሐይ ኮፍያ" } },
    ];

    const filtered = dummyProducts.filter((product) => {
      const name =
        typeof product.name === "string" ? product.name : product.name.en;
      return name.toLowerCase().includes(search.toLowerCase());
    });

    return filtered as OptionType[];
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
              <Button variant="default" disabled={isSubmitting}>
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
