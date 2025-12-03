
import { getProduct } from "@/lib/api";
import { products as sampleProducts } from "@/data/products";
import { notFound } from "next/navigation";
import { Breadcrumb } from "./_components/Breadcrumb";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ProductInfo } from "./_components/ProductInfo";
// Reviews/ratings removed per request

export default async function ProductDetailPage(props: {
  params: { id: string };
}) {
  const { id } = props.params;

  // Try fetching product from API, fallback to local sample products for preview
  let product = await getProduct(id).catch(() => null);

  if (!product) {
    const p = sampleProducts.find((s) => String(s.id) === String(id));
    if (p) {
      // adapt sample product shape to match API Product type
      product = {
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        category: (p as any).category ?? "",
        size: p.sizes ? p.sizes.join(", ") : "",
        gender: (p as any).gender ?? "",
        price: p.price ?? 0,
        stock: (p as any).stock ?? 0,
        status: "published",
        coverImage: p.image ?? "",
        image1: null,
        image2: null,
        images: p.images ?? (p.image ? [p.image] : []),
        color: "",
        colorValues: [],
        colors: p.colors ?? [],
        createdAt: null,
        itemNumber: (p as any).itemNumber ?? null,
        rating: null,
        reviewCount: null,
      } as any;
    }
  }

  if (!product) {
    notFound();
  }

  const productImages =
    product.images.length > 0
      ? product.images
      : product.coverImage
        ? [product.coverImage]
        : [];


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

          {/* Reviews and rating section removed (was causing runtime error) */}
        </div>
      </div>
    </div>
  );
}
