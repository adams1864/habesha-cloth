import { createProduct, updateProduct, deleteProduct } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";
import type { ProductFormData } from "../_actions/product.schema";
import { productSchema } from "../_actions/product.schema";

type UseProductFormProps = {
  mode?: "new" | "detail";
  product?: ProductFormData & { id?: string };
};

const EMPTY_FORM_VALUES: ProductFormData = {
  title: LOCALE_INPUT_DEFAULT,
  description: LOCALE_INPUT_DEFAULT,
  category: "",
  gender: "",
  color: [],
  size: "",
  price: 0,
  stock: 0,
  status: "unpublished",
  coverImage: null,
  images: [],
};

export function useProductForm({ mode = "new", product }: UseProductFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null]);
  const [coverDeleted, setCoverDeleted] = useState(false);
  const [imagesDeleted, setImagesDeleted] = useState<boolean[]>([false, false]);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const dashboardPath = `/${locale}/manage/dashboard`;

  const mergeWithDefaults = (values?: ProductFormData) => ({
    ...EMPTY_FORM_VALUES,
    ...(values ?? {}),
  });

  const defaultValues: ProductFormData = mergeWithDefaults(product as ProductFormData | undefined);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues,
  });

  useEffect(() => {
    if (mode === "detail" && product) {
      const nextValues = mergeWithDefaults(product);
      form.reset(nextValues);
      setCoverFile(null);
      setImageFiles([null, null]);
      setCoverDeleted(false);
      setImagesDeleted([false, false]);
    }
  }, [form, product, mode]);

  const handleCreate = async (data: ProductFormData) => {
    setCreating(true);
    setFeedbackSuccess(null);
    setFeedbackError(null);
    try {
      const formData = new FormData();
      const titleEn = typeof data.title?.en === "string" ? data.title.en : "";
      const descriptionEn = typeof data.description?.en === "string" ? data.description.en : "";

      formData.append("name", titleEn);
      formData.append("description", descriptionEn);
      formData.append("price", data.price.toFixed(2));
      formData.append("stock", data.stock.toString());
      formData.append("category", data.category);
      formData.append("size", data.size);
      formData.append("gender", data.gender);
      data.color.forEach((color) => formData.append("color", color));
      formData.append("status", data.status);

      // Upload files to Cloudinary first (client-side unsigned). Replace file fields with returned URLs.
      if (coverFile) {
        try {
          const coverUrl = await uploadToCloudinary(coverFile);
          formData.append("coverImage", coverUrl);
        } catch (err) {
          console.error("Cover upload failed:", err);
          throw new Error("Failed to upload cover image. Check Cloudinary settings.");
        }
      }

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file) {
          try {
            const imageUrl = await uploadToCloudinary(file);
            formData.append(`image${i + 1}`, imageUrl);
          } catch (err) {
            console.error(`Image ${i + 1} upload failed:`, err);
            throw new Error("Failed to upload one of the product images. Check Cloudinary settings.");
          }
        }
      }

      const created = await createProduct(formData);

  setFeedbackError(null);
  setFeedbackSuccess(`${created.name ?? "Product"} created successfully.`);
      notifications.show({
        title: "Product created",
        message: `${created.name ?? "Product"} is now saved.`,
        color: "green",
      });

      setCoverFile(null);
      setCoverDeleted(false);
      setImageFiles([null, null]);
      setImagesDeleted([false, false]);

      form.reset(EMPTY_FORM_VALUES);

      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to create product";
  setFeedbackSuccess(null);
  setFeedbackError(message);
      notifications.show({
        title: "Product creation failed",
        message,
        color: "red",
      });
    } finally {
      setCreating(false);
    }
  };


  const handleUpdate = async (data: ProductFormData) => {
    if (!product || !("id" in product) || !product?.id) {
      return;
    }

    setUpdating(true);
    setFeedbackSuccess(null);
    setFeedbackError(null);
    try {
      const formData = new FormData();
      const titleEn = typeof data.title?.en === "string" ? data.title.en : "";
      const descriptionEn = typeof data.description?.en === "string" ? data.description.en : "";

      formData.append("name", titleEn);
      formData.append("description", descriptionEn);
      formData.append("price", data.price.toFixed(2));
      formData.append("stock", data.stock.toString());
      formData.append("category", data.category);
      formData.append("size", data.size);
      formData.append("gender", data.gender);
      data.color.forEach((color) => formData.append("color", color));
      formData.append("status", data.status);

      // Upload new files to Cloudinary and append URLs. If coverDeleted and no new cover, send empty string to clear.
      if (coverFile) {
        try {
          const coverUrl = await uploadToCloudinary(coverFile);
          formData.append("coverImage", coverUrl);
        } catch (err) {
          console.error("Cover upload failed:", err);
          throw new Error("Failed to upload cover image. Check Cloudinary settings.");
        }
      } else if (coverDeleted) {
        formData.append("coverImage", "");
      }

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file) {
          try {
            const imageUrl = await uploadToCloudinary(file);
            formData.append(`image${i + 1}`, imageUrl);
          } catch (err) {
            console.error(`Image ${i + 1} upload failed:`, err);
            throw new Error("Failed to upload one of the product images. Check Cloudinary settings.");
          }
        }
      }

      imagesDeleted.forEach((removed, index) => {
        if (removed && !imageFiles[index]) {
          formData.append(`image${index + 1}`, "");
        }
      });

      const updated = await updateProduct(product.id, formData);

      setFeedbackError(null);
      setFeedbackSuccess(`${updated.name ?? "Product"} updated successfully.`);
      notifications.show({
        title: "Product updated",
        message: `${updated.name ?? "Product"} changes saved successfully.`,
        color: "green",
      });

      setCoverDeleted(false);
      setImagesDeleted([false, false]);
      setCoverFile(null);
      setImageFiles([null, null]);

      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to update product";
      setFeedbackSuccess(null);
      setFeedbackError(message);
      notifications.show({
        title: "Product update failed",
        message,
        color: "red",
      });
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    if (!product || !product?.id) return;

    const confirmed = window.confirm("Delete this product? This action cannot be undone.");
    if (!confirmed) return;

    setDeleting(true);
    setFeedbackSuccess(null);
    setFeedbackError(null);
    try {
      await deleteProduct(product.id);
      notifications.show({
        title: "Product deleted",
        message: "The product has been removed.",
        color: "green",
      });
      router.replace(dashboardPath);
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to delete product";
      setFeedbackSuccess(null);
      setFeedbackError(message);
      notifications.show({
        title: "Product deletion failed",
        message,
        color: "red",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleImageFileChange = (index: number, file: File | null) => {
    setImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const handleImageDelete = (index: number) => {
    handleImageFileChange(index, null);
    setImagesDeleted((prev) => {
      const newDeleted = [...prev];
      newDeleted[index] = true;
      return newDeleted;
    });
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
    imageFiles,
    handleImageFileChange,
    handleImageDelete,
    imagesDeleted,
    feedbackSuccess,
    feedbackError,
    dismissFeedbackSuccess: () => setFeedbackSuccess(null),
    dismissFeedbackError: () => setFeedbackError(null),
  };
}
