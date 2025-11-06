import type { Bundle, BundleQuery } from "@/lib/api";
import { getBundles } from "@/lib/api";
import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "./_components/Entity";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function getParamValue(params: PageProps["searchParams"], key: string) {
  const value = params?.[key];
  if (Array.isArray(value)) return value[0];
  return value ?? undefined;
}

function mapBundleForTable(bundle: Bundle) {
  const products = Array.isArray(bundle.products) ? bundle.products : [];
  const productCount = Array.isArray(bundle.productIds)
    ? bundle.productIds.length
    : Array.isArray(bundle.products)
      ? bundle.products.length
      : 0;

  return {
    id: String(bundle.id),
    title: bundle.title ?? "",
    description: bundle.description ?? "",
    status: bundle.status,
    coverImage: bundle.coverImage ? { url: bundle.coverImage } : null,
    products: products.map((product) => ({
      id: String(product.id),
      name: product.name ?? "",
    })),
    productCount,
  };
}

export default async function BundlePage({ searchParams }: PageProps) {
  const statusParam = getParamValue(searchParams, "status");
  const search = getParamValue(searchParams, "search")?.trim();
  const pageRaw = Number(getParamValue(searchParams, "page"));
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const sortParam = getParamValue(searchParams, "sort");
  const orderParam = getParamValue(searchParams, "order");

  const sort =
    sortParam && ["createdAt", "title", "status"].includes(sortParam)
      ? (sortParam as BundleQuery["sort"])
      : undefined;

  const query = {
    page,
    perPage: PAGE_SIZE,
    search: search && search.length > 0 ? search : undefined,
    status: statusParam && statusParam !== "all" ? statusParam : undefined,
  sort,
    order: orderParam === "asc" ? "asc" : "desc",
  } as const;

  const result = await getBundles(query).catch(() => null);
  if (!result) {
    return <Entity data={[]} total={0} perPage={PAGE_SIZE} />;
  }

  const rows = result.data.map(mapBundleForTable);

  return (
    <Entity data={rows} total={result.meta.total} perPage={result.meta.perPage} />
  );
}
