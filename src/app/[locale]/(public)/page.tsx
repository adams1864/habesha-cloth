import { FilterBar } from "@/components/landing/FilterBar";
import { FeaturedBundle } from "@/components/landing/FeaturedBundle";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { products } from "@/data/products";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold tracking-tight">Baby Clothing</h2>
          <FilterBar />
        </div>
        <FeaturedBundle />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
