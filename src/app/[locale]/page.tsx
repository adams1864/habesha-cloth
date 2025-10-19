import { Header } from "@/components/landing/Header";
import { FilterBar } from "@/components/landing/FilterBar";
import { FeaturedBundle } from "@/components/landing/FeaturedBundle";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { Footer } from "@/components/landing/Footer";
import { products } from "@/data/products";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold tracking-tight">Baby Clothing</h2>
            <FilterBar />
          </div>
          <FeaturedBundle />
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
