import type { ProductQuery } from "@/lib/api";
import { getProducts } from "@/lib/api";
import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "./_components/Entity";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ProductPage({ searchParams }: PageProps) {
  const params = searchParams ?? {};

  const getParam = (key: string) => {
    const value = params[key];
    if (Array.isArray(value)) return value[0];
    return value ?? undefined;
  };

  const pageRaw = Number(getParam("page"));
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const search = getParam("search")?.trim();
  const statusParam = getParam("status");
  const status = statusParam && statusParam !== "all" ? statusParam : undefined;
  const sort = getParam("sort") as ProductQuery["sort"];
  const orderParam = getParam("order");
  const order = orderParam === "asc" ? "asc" : "desc";

  const query: ProductQuery = {
    page,
    perPage: PAGE_SIZE,
    search: search && search.length > 0 ? search : undefined,
    status,
    sort: sort && ["createdAt", "name", "price", "status"].includes(sort) ? sort : undefined,
    order,
  };

  try {
    const response = await getProducts(query);

    const rows = response.data.map((product) => ({
      id: String(product.id),
      title: product.name,
      category: product.category || "—",
      status: product.status,
      price: product.price,
    }));

    return (
      <Entity
        data={rows}
        total={response.meta.total}
        perPage={response.meta.perPage}
      />
    );
  } catch (error) {
    console.error("Failed to load products:", error);
    return <Entity data={[]} total={0} perPage={PAGE_SIZE} />;
  }
}
