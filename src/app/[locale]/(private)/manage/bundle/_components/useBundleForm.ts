import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";
import type { BundleFormData } from "../_actions/bundle.schema";
import { bundleSchema } from "../_actions/bundle.schema";

type UseBundleFormProps = {
  mode?: "new" | "detail";
  bundle?: BundleFormData & { id?: string };
};

export function useBundleForm({ bundle }: UseBundleFormProps) {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | string | null>(null);
  const [coverDeleted, setCoverDeleted] = useState(false);

  const form = useForm<BundleFormData>({
    resolver: zodResolver(bundleSchema) as Resolver<BundleFormData>,
    defaultValues: bundle || {
      title: LOCALE_INPUT_DEFAULT,
      description: LOCALE_INPUT_DEFAULT,
      status: "unpublished",
      coverImage: null,
      products: [],
    },
  });

  const handleCreate = async (data: BundleFormData) => {
    setCreating(true);
    try {
      console.log("Creating bundle:", data);
      console.log("Cover file:", coverFile);
      // TODO: Implement API call to create bundle
      // You would typically upload the coverFile to your storage and then create the bundle
    } catch (error) {
      console.error("Error creating bundle:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (data: BundleFormData) => {
    setUpdating(true);
    try {
      console.log("Updating bundle:", data);
      console.log("Cover file:", coverFile);
      console.log("Cover deleted:", coverDeleted);
      // TODO: Implement API call to update bundle
    } catch (error) {
      console.error("Error updating bundle:", error);
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    if (!bundle?.id) return;

    setDeleting(true);
    try {
      console.log("Deleting bundle:", bundle.id);
      // TODO: Implement API call to delete bundle
    } catch (error) {
      console.error("Error deleting bundle:", error);
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
    coverFile,
    setCoverFile,
    coverDeleted,
    setCoverDeleted,
  };
}
