import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumb } from "./_components/Breadcrumb";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ProductInfo } from "./_components/ProductInfo";
import { ReviewsSection } from "./_components/ReviewsSection";
import { products, reviews } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const productImages = product.images || [product.image];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb productName={product.name} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ProductImageGallery
              images={productImages}
              productName={product.name}
            />
            <ProductInfo product={product} />
          </div>

          {product.rating && product.reviewCount && (
            <ReviewsSection
              rating={product.rating}
              reviewCount={product.reviewCount}
              reviews={reviews}
            />
          )}
        </div>
      </div>
    </div>
  );
}
