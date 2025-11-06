"use client";

import {
  Alert,
  Box,
  Button,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import type React from "react";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ImageInput } from "@/components/form/ImageInput";
import { LocaleInputText } from "@/components/locale/LocaleInputText";
import { LocaleInputTextarea } from "@/components/locale/LocaleInputTextarea";
import type { ProductFormData } from "../_actions/product.schema";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_SIZES,
  PRODUCT_GENDERS,
  PRODUCT_COLORS,
  PRODUCT_STATUS,
} from "../_actions/product.schema";
import { useProductForm } from "./useProductForm";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";

type FormDetailProps = {
  mode?: "new" | "detail";
  product?: ProductFormData & { id?: string };
};

const ProductFormDetails: React.FC<FormDetailProps> = (props) => {
  const { mode = "new", product } = props;

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
    imageFiles,
    handleImageFileChange,
    handleImageDelete,
    feedbackSuccess,
    feedbackError,
    dismissFeedbackSuccess,
    dismissFeedbackError,
  } = useProductForm(props);

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const isSubmitting = creating || updating;

  return (
    <Box className="max-w-9xl flex w-full">
      <Box className="w-full">
        <Stack gap="md">
          {feedbackSuccess ? (
            <Alert
              color="green"
              radius="md"
              icon={<IconCheck size={18} />}
              variant="light"
              withCloseButton
              onClose={dismissFeedbackSuccess}
            >
              {feedbackSuccess}
            </Alert>
          ) : null}
          {feedbackError ? (
            <Alert
              color="red"
              radius="md"
              icon={<IconInfoCircle size={18} />}
              variant="light"
              withCloseButton
              onClose={dismissFeedbackError}
            >
              {feedbackError}
            </Alert>
          ) : null}

          <LocaleInputText
            label="Title"
            field="title"
            required
            register={register}
            errors={errors}
            placeholder="Enter product title"
          />

          <LocaleInputTextarea
            label="Description"
            field="description"
            register={register}
            errors={errors}
            placeholder="Enter product description"
            autosize
            minRows={4}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    placeholder="Select category"
                    data={PRODUCT_CATEGORIES}
                    withAsterisk
                    error={errors.category?.message}
                    searchable
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Size"
                    placeholder="Select size"
                    data={PRODUCT_SIZES}
                    withAsterisk
                    error={errors.size?.message}
                    searchable
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gender"
                    placeholder="Select gender"
                    data={PRODUCT_GENDERS}
                    withAsterisk
                    error={errors.gender?.message}
                    searchable
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    label="Color"
                    placeholder="Select colors"
                    data={PRODUCT_COLORS}
                    withAsterisk
                    error={errors.color?.message as string}
                    searchable
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumberInput
                    {...field}
                    label="Price"
                    placeholder="0.00"
                    withAsterisk
                    min={0}
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="ETB "
                    value={value || 0}
                    onChange={(val) => onChange(val)}
                    error={errors.price?.message}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="stock"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumberInput
                    {...field}
                    label="Stock"
                    placeholder="0"
                    withAsterisk
                    min={0}
                    decimalScale={0}
                    value={value || 0}
                    onChange={(val) => onChange(val)}
                    error={errors.stock?.message}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Status"
                placeholder="Select status"
                data={PRODUCT_STATUS}
                withAsterisk
                error={errors.status?.message}
              />
            )}
          />

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
                  aspectRatio="square"
                  value={
                    coverFile ||
                    (product?.coverImage?.url ? product.coverImage.url : null)
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
          </Box>

          <Box>
            <Text size="sm" fw={500} mb="xs">
              Additional Images (Max 2)
            </Text>
            <Grid>
              {[0, 1].map((index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                  <ImageInput
                    label={`Image ${index + 1}`}
                    className="w-full"
                    aspectRatio="square"
                    value={
                      imageFiles[index] ||
                      (product?.images?.[index]?.url
                        ? product.images[index].url
                        : null)
                    }
                    onChange={(file) => {
                      handleImageFileChange(index, file || null);
                    }}
                    onRemove={() => {
                      handleImageDelete(index);
                    }}
                  />
                </Grid.Col>
              ))}
            </Grid>
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
                {mode === "new" ? "Create Product" : "Update Product"}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductFormDetails;
