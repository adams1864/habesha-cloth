"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Button,
  Stack,
  Grid,
  Checkbox,
  Title,
  Group,
  Paper,
} from "@mantine/core";
import {
  IconMail,
  IconUser,
  IconMapPin,
  IconBuilding,
  IconPhone,
} from "@tabler/icons-react";
import { checkoutSchema, type CheckoutFormData } from "./schemas";

interface ShippingAddressFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export function ShippingAddressForm({
  onSubmit,
  isLoading = false,
  formRef,
}: ShippingAddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      saveInfo: false,
    },
  });

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="xl"
      className="bg-white dark:bg-zinc-800/50"
    >
      <Title
        order={2}
        className="text-3xl font-bold text-zinc-900 dark:text-white mb-8"
      >
        Shipping Address
      </Title>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Stack gap="lg">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            leftSection={<IconMail size={18} />}
            {...register("email")}
            error={errors.email?.message}
            size="md"
            styles={{
              input: {
                "&:focus": {
                  borderColor: "#d6001c",
                },
              },
            }}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="First Name"
                placeholder="John"
                leftSection={<IconUser size={18} />}
                {...register("firstName")}
                error={errors.firstName?.message}
                size="md"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "#d6001c",
                    },
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Last Name"
                placeholder="Doe"
                leftSection={<IconUser size={18} />}
                {...register("lastName")}
                error={errors.lastName?.message}
                size="md"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "#d6001c",
                    },
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          <TextInput
            label="Address"
            placeholder="123 Main Street, Apt 4B"
            leftSection={<IconMapPin size={18} />}
            {...register("address")}
            error={errors.address?.message}
            size="md"
            styles={{
              input: {
                "&:focus": {
                  borderColor: "#d6001c",
                },
              },
            }}
          />

          <TextInput
            label="City"
            placeholder="New York"
            leftSection={<IconBuilding size={18} />}
            {...register("city")}
            error={errors.city?.message}
            size="md"
            styles={{
              input: {
                "&:focus": {
                  borderColor: "#d6001c",
                },
              },
            }}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="State"
                placeholder="NY"
                leftSection={<IconMapPin size={18} />}
                {...register("state")}
                error={errors.state?.message}
                size="md"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "#d6001c",
                    },
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Zip Code"
                placeholder="10001"
                {...register("zipCode")}
                error={errors.zipCode?.message}
                size="md"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "#d6001c",
                    },
                  },
                }}
              />
            </Grid.Col>
          </Grid>

          <TextInput
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            leftSection={<IconPhone size={18} />}
            {...register("phone")}
            error={errors.phone?.message}
            size="md"
            styles={{
              input: {
                "&:focus": {
                  borderColor: "#d6001c",
                },
              },
            }}
          />

          <Checkbox
            label="Save this information for next time"
            {...register("saveInfo")}
            size="md"
            styles={{
              input: {
                "&:checked": {
                  backgroundColor: "#d6001c",
                  borderColor: "#d6001c",
                },
              },
            }}
          />
        </Stack>
      </form>
    </Paper>
  );
}
