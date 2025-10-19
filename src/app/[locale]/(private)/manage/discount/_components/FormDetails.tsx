"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type React from "react";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import {
  SelectRelation,
  type OptionType,
} from "@/components/form/SelectRelation";
import { LocaleInputText } from "@/components/locale/LocaleInputText";
import { LocaleInputTextarea } from "@/components/locale/LocaleInputTextarea";
import type { DiscountFormData } from "../_actions/discount.schema";
import {
  DISCOUNT_TYPES,
  DISCOUNT_STATUS,
  APPLICATION_TYPES,
} from "../_actions/discount.schema";
import { useDiscountForm } from "./useDiscountForm";

type FormDetailProps = {
  mode?: "new" | "detail";
  discount?: DiscountFormData & { id?: string };
};

const DiscountFormDetails: React.FC<FormDetailProps> = (props) => {
  const { mode = "new" } = props;

  const { form, creating, updating, deleting, onCreate, onUpdate, onDelete } =
    useDiscountForm(props);

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const isSubmitting = creating || updating;
  const discountType = watch("type");
  const applicationType = watch("applicationType");

  // Function to fetch products for SelectRelation
  const getProducts = useCallback(async ({ search }: { search: string }) => {
    // TODO: Replace with actual API call
    // This is dummy data for now
    const dummyProducts = [
      { id: "1", name: { en: "Premium Cotton T-Shirt", am: "ፕሪሚየም ጥጥ ሸሚዝ" } },
      { id: "2", name: { en: "Leather Jacket", am: "ቆዳ ጃኬት" } },
      {
        id: "3",
        name: { en: "Winter Essentials Bundle", am: "የክረምት አስፈላጊዎች ጥቅል" },
      },
      { id: "4", name: { en: "Cotton Pants", am: "ጥጥ ሱሪ" } },
      { id: "5", name: { en: "Summer Dress", am: "የበጋ ቀሚስ" } },
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
            label="Discount Code"
            field="code"
            required
            register={register}
            errors={errors}
            placeholder="Enter discount code (e.g., SUMMER2024)"
          />

          <LocaleInputTextarea
            label="Description"
            field="description"
            register={register}
            errors={errors}
            placeholder="Enter discount description"
            autosize
            minRows={3}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Discount Type"
                    description="Select the type of discount"
                    placeholder="Select type"
                    data={DISCOUNT_TYPES}
                    withAsterisk
                    error={errors.type?.message}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="value"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumberInput
                    {...field}
                    label="Discount Value"
                    placeholder="0"
                    withAsterisk
                    min={0}
                    max={discountType === "percentage" ? 100 : undefined}
                    decimalScale={2}
                    fixedDecimalScale
                    prefix={discountType === "fixed" ? "ETB " : ""}
                    suffix={discountType === "percentage" ? "%" : ""}
                    value={value || 0}
                    onChange={(val) => onChange(val)}
                    error={errors.value?.message}
                    description={
                      discountType === "percentage"
                        ? "Enter percentage (0-100)"
                        : "Enter fixed amount"
                    }
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    label="Start Date"
                    description="Select the start date of the discount"
                    placeholder="Select start date"
                    withAsterisk
                    error={errors.startDate?.message}
                    valueFormat="MMM DD, YYYY"
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    label="End Date"
                    description="Select the end date of the discount"
                    placeholder="Select end date"
                    withAsterisk
                    error={errors.endDate?.message}
                    valueFormat="MMM DD, YYYY"
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="applicationType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Apply To"
                    description="Choose whether to apply discount to all products or specific ones"
                    placeholder="Select application type"
                    data={APPLICATION_TYPES}
                    withAsterisk
                    error={errors.applicationType?.message}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    description="Select the status of the discount"
                    placeholder="Select status"
                    data={DISCOUNT_STATUS}
                    withAsterisk
                    error={errors.status?.message}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          {applicationType === "specific" && (
            <Box>
              <Controller
                name="products"
                control={control}
                render={({ field }) => (
                  <SelectRelation
                    {...field}
                    label="Select Products"
                    description="Choose which products this discount applies to"
                    placeholder="Search and select products"
                    withAsterisk
                    variant="multiple"
                    getEntity={getProducts}
                    error={errors.products?.message}
                  />
                )}
              />
            </Box>
          )}

          <Group grow>
            <Controller
              name="minPurchaseAmount"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <NumberInput
                  {...field}
                  label="Minimum Purchase Amount"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="ETB "
                  value={value ?? undefined}
                  onChange={(val) => onChange(val || null)}
                  error={errors.minPurchaseAmount?.message}
                  description="Leave empty for no minimum"
                />
              )}
            />
            <Controller
              name="maxUsageCount"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <NumberInput
                  {...field}
                  label="Maximum Usage Count"
                  placeholder="0"
                  min={1}
                  decimalScale={0}
                  value={value ?? undefined}
                  onChange={(val) => onChange(val || null)}
                  error={errors.maxUsageCount?.message}
                  description="Leave empty for unlimited usage"
                />
              )}
            />
          </Group>

          <Grid>
            {mode === "detail" && (
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                  name="currentUsageCount"
                  control={control}
                  render={({ field: { value } }) => (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Current Usage Count
                      </Text>
                      <Text size="lg" fw={600} c="blue">
                        {value || 0}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Times this discount has been used
                      </Text>
                    </Box>
                  )}
                />
              </Grid.Col>
            )}
          </Grid>

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
                {mode === "new" ? "Create Discount" : "Update Discount"}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
};

export default DiscountFormDetails;
