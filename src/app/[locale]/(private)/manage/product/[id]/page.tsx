import { Box, Card, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import ProductFormDetails from "../_components/FormDetails";
import { getProduct } from "@/lib/api";
import type { ProductFormData } from "../_actions/product.schema";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";

function cloneLocale(value: string | null | undefined) {
  return Object.fromEntries(
    Object.keys(LOCALE_INPUT_DEFAULT).map((key) => [key, value ?? ""]),
  );
}

function mapProductToForm(product: Awaited<ReturnType<typeof getProduct>>): ProductFormData & { id: string } {
  const localeTitle = cloneLocale(product.name ?? "");
  const localeDescription = cloneLocale(product.description ?? "");
  const colors = Array.isArray(product.colorValues) ? product.colorValues : [];
  const imageObjects = product.images
    .filter(Boolean)
    .map((url) => ({ url }));

  return {
    id: String(product.id),
    title: localeTitle,
    description: localeDescription,
    category: product.category ?? "",
    gender: product.gender ?? "",
    color: colors,
    size: product.size ?? "",
    price: product.price ?? 0,
    stock: product.stock ?? 0,
    status: product.status ?? "unpublished",
    coverImage: product.coverImage ? { url: product.coverImage } : null,
    images: imageObjects.slice(0, 2),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const product = await getProduct(params.id).catch(() => null);
  if (!product) {
    notFound();
  }

  const formProduct = mapProductToForm(product);

  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Edit Product
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ProductFormDetails mode="detail" product={formProduct} />
      </Card>
    </Box>
  );
}
