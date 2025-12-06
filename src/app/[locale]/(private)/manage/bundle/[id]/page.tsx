import { Box, Card, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import BundleFormDetails from "../_components/FormDetails";
import { getBundle } from "@/lib/api";
import type { BundleFormData } from "../_actions/bundle.schema";
import { LOCALE_INPUT_DEFAULT } from "@/utils/locale";

function cloneLocale(value: string | null | undefined) {
  return Object.fromEntries(
    Object.keys(LOCALE_INPUT_DEFAULT).map((key) => [key, value ?? ""]),
  );
}

function mapBundleToForm(bundle: Awaited<ReturnType<typeof getBundle>>):
  BundleFormData & { id: string } {
  return {
    id: String(bundle.id),
    title: cloneLocale(bundle.title ?? ""),
    description: cloneLocale(bundle.description ?? ""),
    status: bundle.status ?? "unpublished",
    coverImage: bundle.coverImage ? { url: bundle.coverImage } : null,
    products: Array.isArray(bundle.products)
      ? bundle.products.map((product) => ({
          id: String(product.id),
          name: product.name ?? "Untitled product",
        }))
      : [],
  } satisfies BundleFormData & { id: string };
}

export default async function BundleDetailPage({
  params,
}: {
  params: { locale: string; id: string } | Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const bundle = await getBundle(id).catch(() => null);
  if (!bundle) {
    notFound();
  }

  const formBundle = mapBundleToForm(bundle);

  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Edit Bundle
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <BundleFormDetails mode="detail" bundle={formBundle} />
      </Card>
    </Box>
  );
}
