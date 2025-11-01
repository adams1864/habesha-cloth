import { createProduct } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";
import type { ProductFormData } from "../_actions/product.schema";
import { productSchema } from "../_actions/product.schema";

type UseProductFormProps = {
  mode?: "new" | "detail";
  product?: ProductFormData & { id?: string };
};

export function useProductForm({ product }: UseProductFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null]);
  const [coverDeleted, setCoverDeleted] = useState(false);
  const [imagesDeleted, setImagesDeleted] = useState<boolean[]>([false, false]);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues: product || {
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
    },
  });

  
  const handleCreate = async (data: ProductFormData) => {
    setCreating(true);
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

      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      await createProduct(formData);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setCreating(false);
    }
  };


  const handleUpdate = async (data: ProductFormData) => {
    setUpdating(true);
    try {
      console.log("Updating product:", data);
      // TODO: Implement API call to update product
      // You'll need to handle file uploads for coverImage and images here
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async () => {
    if (!product?.id) return;

    setDeleting(true);
    try {
      console.log("Deleting product:", product.id);
      // TODO: Implement API call to delete product
    } catch (error) {
      console.error("Error deleting product:", error);
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
  };
}
