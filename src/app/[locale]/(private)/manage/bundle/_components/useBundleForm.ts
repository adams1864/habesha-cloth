import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { createBundle, updateBundle, deleteBundle } from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";
import type { BundleFormData } from "../_actions/bundle.schema";
import { bundleSchema } from "../_actions/bundle.schema";

type UseBundleFormProps = {
  mode?: "new" | "detail";
  bundle?: BundleFormData & { id?: string };
};

function cloneLocaleInput() {
  return Object.fromEntries(
    Object.keys(LOCALE_INPUT_DEFAULT).map((key) => [key, ""]),
  );
}

function getEmptyFormValues(): BundleFormData {
  return {
    title: cloneLocaleInput(),
    description: cloneLocaleInput(),
    status: "unpublished",
    coverImage: null,
    products: [],
  };
}

export function useBundleForm({ bundle }: UseBundleFormProps) {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | string | null>(null);
  const [coverDeleted, setCoverDeleted] = useState(false);
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const dashboardPath = `/${locale}/manage/dashboard`;

  const defaultValues = useMemo(() => {
    if (!bundle) {
      return getEmptyFormValues();
    }

    return {
      ...getEmptyFormValues(),
      ...bundle,
      title: {
        ...cloneLocaleInput(),
        ...bundle.title,
      },
      description: {
        ...cloneLocaleInput(),
        ...bundle.description,
      },
      coverImage: bundle.coverImage ?? null,
      products: Array.isArray(bundle.products) ? bundle.products : [],
    } satisfies BundleFormData;
  }, [bundle]);

  const form = useForm<BundleFormData>({
    resolver: zodResolver(bundleSchema) as Resolver<BundleFormData>,
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    setCoverFile(null);
    setCoverDeleted(false);
  }, [defaultValues, form]);

  const handleCreate = async (data: BundleFormData) => {
    setCreating(true);
    try {
      const formData = new FormData();
      const titleEn = typeof data.title?.en === "string" ? data.title.en : "";
      const descriptionEn =
        typeof data.description?.en === "string" ? data.description.en : "";

      formData.append("title", titleEn);
      formData.append("description", descriptionEn);
      formData.append("status", data.status ?? "unpublished");

      const selectedProducts = Array.isArray(data.products)
        ? data.products
        : [];

      const productIds = selectedProducts
        .map((product) => Number(product.id))
        .filter((id) => Number.isFinite(id) && id > 0);

      if (productIds.length === 0) {
        formData.append("productIds", "");
      } else {
        productIds.forEach((id) => formData.append("productIds", String(id)));
      }

      if (coverFile instanceof File) {
        try {
          const coverUrl = await uploadToCloudinary(coverFile);
          formData.append("coverImage", coverUrl);
        } catch (err) {
          console.error("Bundle cover upload failed:", err);
          throw new Error("Failed to upload bundle cover image. Check Cloudinary settings.");
        }
      }

      const created = await createBundle(formData);

      notifications.show({
        title: "Bundle created",
        message: `${created.title || "Bundle"} is now saved.`,
        color: "green",
      });

      setCoverFile(null);
      setCoverDeleted(false);
      form.reset(getEmptyFormValues());
      router.refresh();
    } catch (error) {
      console.error("Error creating bundle:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to create bundle";

      notifications.show({
        title: "Bundle creation failed",
        message,
        color: "red",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (data: BundleFormData) => {
    if (!bundle?.id) return;

    setUpdating(true);
    try {
      const formData = new FormData();
      const titleEn = typeof data.title?.en === "string" ? data.title.en : "";
      const descriptionEn =
        typeof data.description?.en === "string" ? data.description.en : "";

      formData.append("title", titleEn);
      formData.append("description", descriptionEn);
      formData.append("status", data.status ?? "unpublished");

      const selectedProducts = Array.isArray(data.products)
        ? data.products
        : [];

      const productIds = selectedProducts
        .map((product) => Number(product.id))
        .filter((id) => Number.isFinite(id) && id > 0);

      if (productIds.length === 0) {
        formData.append("productIds", "");
      } else {
        productIds.forEach((id) => formData.append("productIds", String(id)));
      }

      if (coverFile instanceof File) {
        try {
          const coverUrl = await uploadToCloudinary(coverFile);
          formData.append("coverImage", coverUrl);
        } catch (err) {
          console.error("Bundle cover upload failed:", err);
          throw new Error("Failed to upload bundle cover image. Check Cloudinary settings.");
        }
      } else if (coverDeleted) {
        formData.append("coverImage", "");
      }

      const updated = await updateBundle(bundle.id, formData);

      notifications.show({
        title: "Bundle updated",
        message: `${updated.title || "Bundle"} changes saved successfully.`,
        color: "green",
      });

      setCoverDeleted(false);
      setCoverFile(null);
      router.refresh();
    } catch (error) {
      console.error("Error updating bundle:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to update bundle";

      notifications.show({
        title: "Bundle update failed",
        message,
        color: "red",
      });
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    if (!bundle?.id) return;

    const confirmed = window.confirm(
      "Delete this bundle? This action cannot be undone.",
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteBundle(bundle.id);
      notifications.show({
        title: "Bundle deleted",
        message: "The bundle has been removed.",
        color: "green",
      });
  router.replace(dashboardPath);
      router.refresh();
    } catch (error) {
      console.error("Error deleting bundle:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to delete bundle";

      notifications.show({
        title: "Bundle deletion failed",
        message,
        color: "red",
      });
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
