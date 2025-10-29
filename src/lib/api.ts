

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  itemNumber?: string;
  rating?: number;
  reviewCount?: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  images?: string[];
}

export interface Bundle extends Product {
  bundleImage: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing API_BASE_URL environment variable");
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return res.json();
}

export async function getBundles(): Promise<Bundle[]> {
  const res = await fetch(`${API_BASE_URL}/bundles`);
  if (!res.ok) {
    throw new Error("Failed to fetch bundles");
  }
  return res.json();
}

export async function getBundle(id: string): Promise<Bundle> {
  const res = await fetch(`${API_BASE_URL}/bundles/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bundle with id ${id}`);
  }
  return res.json();
}

export async function createProduct(product: FormData): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    body: product,
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}
