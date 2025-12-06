import Image from "next/image";
import Link from "next/link";
import { getBundle } from "@/lib/api";

type Props = {
  params: { locale: string; id: string };
};

export default async function BundlePage({ params }: Props) {
  const { id, locale } = params;
  let bundle;

  try {
    bundle = await getBundle(id);
  } catch (err) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Bundle not found</h1>
        <p className="mt-2 text-gray-600">The requested bundle does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-50">
            <Image src={bundle.coverImage} alt={bundle.title} width={600} height={800} className="object-cover" />
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">{bundle.title}</h1>
          <p className="mt-2 text-gray-600">{bundle.description}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bundle.products.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/product/${p.id}`}
                  className="group block rounded-lg overflow-hidden border p-3 hover:shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-50">
                      <Image
                        src={p.coverImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-500">ETB {p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
