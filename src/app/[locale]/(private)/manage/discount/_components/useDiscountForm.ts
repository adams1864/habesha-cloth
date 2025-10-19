import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";
import type { DiscountFormData } from "../_actions/discount.schema";
import { discountSchema } from "../_actions/discount.schema";

type UseDiscountFormProps = {
  mode?: "new" | "detail";
  discount?: DiscountFormData & { id?: string };
};

export function useDiscountForm({ discount }: UseDiscountFormProps) {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema) as Resolver<DiscountFormData>,
    defaultValues: discount || {
      code: LOCALE_INPUT_DEFAULT,
      description: LOCALE_INPUT_DEFAULT,
      type: "percentage",
      value: 0,
      status: "active",
      applicationType: "all",
      products: null,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      minPurchaseAmount: null,
      maxUsageCount: null,
      currentUsageCount: 0,
    },
  });

  const handleCreate = async (data: DiscountFormData) => {
    setCreating(true);
    try {
      console.log("Creating discount:", data);
      // TODO: Implement API call to create discount
    } catch (error) {
      console.error("Error creating discount:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (data: DiscountFormData) => {
    setUpdating(true);
    try {
      console.log("Updating discount:", data);
      // TODO: Implement API call to update discount
    } catch (error) {
      console.error("Error updating discount:", error);
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    if (!discount?.id) return;

    setDeleting(true);
    try {
      console.log("Deleting discount:", discount.id);
      // TODO: Implement API call to delete discount
    } catch (error) {
      console.error("Error deleting discount:", error);
    } finally {
      setDeleting(false);
    }
  };

  return {
    form,
    creating,
    updating,
    deleting,
    onCreate: form.handleSubmit(handleCreate),
    onUpdate: form.handleSubmit(handleUpdate),
    onDelete,
  };
}
