const DEFAULT_API_BASE_URL = "http://localhost:4000/api";
const PLACEHOLDER_IMAGE =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' fill='%236b7280' font-size='32' text-anchor='middle' font-family='system-ui' dy='.35em'%3ENo Image%3C/text%3E%3C/svg%3E";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

const API_ORIGIN = (() => {
	try {
		return new URL(API_BASE_URL).origin;
	} catch (error) {
		console.warn("Invalid API base URL, falling back to relative paths", error);
		return "";
	}
})();

type SortOrder = "asc" | "desc";

export interface ApiMeta {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: ApiMeta;
}

export interface ProductColor {
	name: string;
	hex: string;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	category: string;
	size: string;
	gender: string;
	price: number;
	stock: number;
	status: "published" | "unpublished" | "archived";
	coverImage: string;
	image1: string | null;
	image2: string | null;
	images: string[];
	color: string;
	colorValues: string[];
	colors: ProductColor[];
	createdAt: string | null;
	itemNumber?: string | null;
	rating?: number | null;
	reviewCount?: number | null;
}

export interface ProductQuery {
	page?: number;
	perPage?: number;
	search?: string;
	status?: string;
	category?: string;
	sort?: "createdAt" | "name" | "price" | "status";
	order?: SortOrder;
}

export interface Bundle {
	id: number;
	title: string;
	description: string;
	status: "published" | "unpublished";
	coverImage: string;
	bundleImage: string;
	productIds: number[];
	products: Product[];
	createdAt: string | null;
	updatedAt: string | null;
}

export interface BundleQuery {
	page?: number;
	perPage?: number;
	search?: string;
	status?: string;
	sort?: "createdAt" | "title" | "status";
	order?: SortOrder;
}

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

function isFormData(input: unknown): input is FormData {
	return typeof FormData !== "undefined" && input instanceof FormData;
}

function toAbsoluteUrl(value: unknown): string {
	if (typeof value !== "string" || value.trim().length === 0) {
		return PLACEHOLDER_IMAGE;
	}

	if (/^https?:\/\//i.test(value)) {
		return value;
	}

	if (/^data:/i.test(value)) {
		return value;
	}

	if (API_ORIGIN) {
		if (value.startsWith("/")) {
			return `${API_ORIGIN}${value}`;
		}
		return `${API_ORIGIN}/${value}`;
	}

	return value;
}

function mapColorSwatch(input: unknown): ProductColor {
	if (input && typeof input === "object") {
		const record = input as Record<string, unknown>;
		const name = typeof record.name === "string" ? record.name : "";
		const hex = typeof record.hex === "string" ? record.hex : "#6b7280";
		return {
			name,
			hex,
		};
	}

	const fallback = typeof input === "string" ? input : "";
	return {
		name: fallback,
		hex: "#6b7280",
	};
}

function mapProduct(input: Record<string, unknown>): Product {
	const rawImages = Array.isArray(input.images) ? (input.images as unknown[]) : [];
	const imageUrls = rawImages
		.map((image) => (typeof image === "string" ? toAbsoluteUrl(image) : null))
		.filter((image): image is string => Boolean(image));

	const cover = toAbsoluteUrl(input.coverImage);
	const gallery = imageUrls.length > 0 ? imageUrls : [cover];

	const statusRaw = typeof input.status === "string" ? input.status : "unpublished";
	const status = (statusRaw === "published" || statusRaw === "archived" ? statusRaw : "unpublished") as Product["status"];

	const colorValues = Array.isArray(input.colorValues)
		? (input.colorValues as unknown[]).map((value) => String(value))
		: typeof input.color === "string" && input.color.length > 0
			? input.color.split(",").map((value) => value.trim()).filter(Boolean)
			: [];

	const colors = Array.isArray(input.colors)
		? (input.colors as unknown[]).map(mapColorSwatch)
		: colorValues.map((value) => mapColorSwatch(value));

	return {
		id: Number(input.id ?? 0),
		name: typeof input.name === "string" ? input.name : "",
		description: typeof input.description === "string" ? input.description : "",
		category: typeof input.category === "string" ? input.category : "",
		size: typeof input.size === "string" ? input.size : "",
		gender: typeof input.gender === "string" ? input.gender : "",
		price: Number(input.price ?? 0),
		stock: Number(input.stock ?? 0),
		status,
		coverImage: cover,
		image1: typeof input.image1 === "string" && input.image1.length > 0 ? toAbsoluteUrl(input.image1) : null,
		image2: typeof input.image2 === "string" && input.image2.length > 0 ? toAbsoluteUrl(input.image2) : null,
		images: gallery,
		color: typeof input.color === "string" ? input.color : colorValues.join(","),
		colorValues,
		colors,
		createdAt: typeof input.createdAt === "string" ? input.createdAt : null,
			itemNumber: typeof input.itemNumber === "string" ? input.itemNumber : null,
				rating: (() => {
					const value = Number((input as Record<string, unknown>).rating);
					return Number.isFinite(value) ? value : null;
				})(),
				reviewCount: (() => {
					const value = Number((input as Record<string, unknown>).reviewCount);
					return Number.isFinite(value) ? value : null;
				})(),
	};
}

function mapBundle(input: Record<string, unknown>): Bundle {
	const products = Array.isArray(input.products)
		? (input.products as Record<string, unknown>[]).map(mapProduct)
		: [];

	const productIds = Array.isArray(input.productIds)
		? (input.productIds as unknown[]).map((id) => Number(id)).filter((id) => Number.isFinite(id))
		: products.map((product) => product.id);

	const cover = toAbsoluteUrl(input.coverImage ?? input.bundleImage);

	const status = input.status === "published" ? "published" : "unpublished";

	return {
		id: Number(input.id ?? 0),
		title: typeof input.title === "string" ? input.title : "",
		description: typeof input.description === "string" ? input.description : "",
		status,
		coverImage: cover,
		bundleImage: toAbsoluteUrl(input.bundleImage ?? input.coverImage),
		productIds,
		products,
		createdAt: typeof input.createdAt === "string" ? input.createdAt : null,
		updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : null,
	};
}

function buildQuery(params: Record<string, unknown> = {}): string {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) return;

		if (Array.isArray(value)) {
			value.forEach((entry) => {
				if (entry === undefined || entry === null) return;
				searchParams.append(key, String(entry));
			});
			return;
		}

		const stringValue = String(value);
		if (stringValue.length === 0) return;
		searchParams.set(key, stringValue);
	});

	const queryString = searchParams.toString();
	return queryString.length > 0 ? `?${queryString}` : "";
}

function normalizeMeta(meta: unknown, fallbackLength: number, fallbackPerPage?: number): ApiMeta {
	const raw = (meta && typeof meta === "object" ? (meta as Record<string, unknown>) : {}) ?? {};
	const perPageCandidate = raw.perPage ?? fallbackPerPage ?? (fallbackLength > 0 ? fallbackLength : 1);
	const perPage = Number(perPageCandidate);
	const totalCandidate = raw.total ?? fallbackLength;
	const total = Number(totalCandidate);
	const pageCandidate = raw.page ?? 1;
	const page = Number(pageCandidate);
	const totalPagesCandidate = raw.totalPages ?? Math.max(1, Math.ceil((Number.isFinite(total) && total > 0 ? total : fallbackLength) / (Number.isFinite(perPage) && perPage > 0 ? perPage : 1)));
	const totalPages = Number(totalPagesCandidate);

	return {
		page: Number.isFinite(page) && page > 0 ? page : 1,
		perPage: Number.isFinite(perPage) && perPage > 0 ? perPage : fallbackLength || 1,
		total: Number.isFinite(total) && total >= 0 ? total : fallbackLength,
		totalPages: Number.isFinite(totalPages) && totalPages > 0 ? totalPages : Math.max(1, Math.ceil(total / (perPage || 1))),
	};
}

async function parseJson(res: Response): Promise<Record<string, unknown>> {
	try {
		return (await res.json()) as Record<string, unknown>;
	} catch (error) {
		return {};
	}
}

async function apiFetch(path: string, init: RequestInit = {}) {
	const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

	const headers = new Headers(init.headers);
	if (!headers.has("Accept")) {
		headers.set("Accept", "application/json");
	}

	const requestInit: RequestInit = {
		cache: "no-store",
		credentials: init.credentials ?? "include",
		...init,
		headers,
	};

	const response = await fetch(url, requestInit);

	if (!response.ok) {
		const payload = await parseJson(response);
		const message = typeof payload.message === "string" ? payload.message : response.statusText;
		throw new Error(message || "Request failed");
	}

	return response;
}

export async function getProducts(params: ProductQuery = {}): Promise<PaginatedResponse<Product>> {
	const query = buildQuery({ ...params } as Record<string, unknown>);
	const response = await apiFetch(`/products${query}`);
	const payload = await parseJson(response);

	const data = Array.isArray(payload.data)
		? (payload.data as Record<string, unknown>[]).map(mapProduct)
		: [];

	const meta = normalizeMeta(payload.meta, data.length, params.perPage);

	return { data, meta };
}

export async function getProduct(id: string | number): Promise<Product> {
	const response = await apiFetch(`/products/${id}`);
	const payload = await parseJson(response);

	if (!payload.product || typeof payload.product !== "object") {
		throw new Error("Product not found");
	}

	return mapProduct(payload.product as Record<string, unknown>);
}

export async function createProduct(input: FormData | Record<string, JsonValue>): Promise<Product> {
	const isMultipart = isFormData(input);
	const init: RequestInit = {
		method: "POST",
		body: isMultipart ? input : JSON.stringify(input),
	};

	if (!isMultipart) {
		init.headers = {
			"Content-Type": "application/json",
		};
	}

	const response = await apiFetch(`/products`, init);
	const payload = await parseJson(response);

	if (!payload.product || typeof payload.product !== "object") {
		throw new Error("Product creation succeeded but no product returned");
	}

	return mapProduct(payload.product as Record<string, unknown>);
}

export async function updateProduct(
	id: string | number,
	input: FormData | Record<string, JsonValue>,
): Promise<Product> {
	const isMultipart = isFormData(input);
	const init: RequestInit = {
		method: "PUT",
		body: isMultipart ? input : JSON.stringify(input),
	};

	if (!isMultipart) {
		init.headers = {
			"Content-Type": "application/json",
		};
	}

	const response = await apiFetch(`/products/${id}`, init);
	const payload = await parseJson(response);

	if (!payload.product || typeof payload.product !== "object") {
		throw new Error("Product update succeeded but no product returned");
	}

	return mapProduct(payload.product as Record<string, unknown>);
}

export async function deleteProduct(id: string | number): Promise<void> {
	await apiFetch(`/products/${id}`, { method: "DELETE" });
}

export async function getBundles(params: BundleQuery = {}): Promise<PaginatedResponse<Bundle>> {
	const query = buildQuery({ ...params } as Record<string, unknown>);
	const response = await apiFetch(`/bundles${query}`);
	const payload = await parseJson(response);

	const data = Array.isArray(payload.data)
		? (payload.data as Record<string, unknown>[]).map(mapBundle)
		: [];

	const meta = normalizeMeta(payload.meta, data.length, params.perPage);

	return { data, meta };
}

export async function getBundle(id: string | number): Promise<Bundle> {
	const response = await apiFetch(`/bundles/${id}`);
	const payload = await parseJson(response);

	if (!payload.bundle || typeof payload.bundle !== "object") {
		throw new Error("Bundle not found");
	}

	return mapBundle(payload.bundle as Record<string, unknown>);
}

export async function createBundle(input: FormData | Record<string, JsonValue>): Promise<Bundle> {
	const isMultipart = isFormData(input);
	const init: RequestInit = {
		method: "POST",
		body: isMultipart ? input : JSON.stringify(input),
	};

	if (!isMultipart) {
		init.headers = {
			"Content-Type": "application/json",
		};
	}

	const response = await apiFetch(`/bundles`, init);
	const payload = await parseJson(response);

	if (!payload.bundle || typeof payload.bundle !== "object") {
		throw new Error("Bundle creation succeeded but no bundle returned");
	}

	return mapBundle(payload.bundle as Record<string, unknown>);
}

export async function updateBundle(
	id: string | number,
	input: FormData | Record<string, JsonValue>,
): Promise<Bundle> {
	const isMultipart = isFormData(input);
	const init: RequestInit = {
		method: "PUT",
		body: isMultipart ? input : JSON.stringify(input),
	};

	if (!isMultipart) {
		init.headers = {
			"Content-Type": "application/json",
		};
	}

	const response = await apiFetch(`/bundles/${id}`, init);
	const payload = await parseJson(response);

	if (!payload.bundle || typeof payload.bundle !== "object") {
		throw new Error("Bundle update succeeded but no bundle returned");
	}

	return mapBundle(payload.bundle as Record<string, unknown>);
}

export async function deleteBundle(id: string | number): Promise<void> {
	await apiFetch(`/bundles/${id}`, { method: "DELETE" });
}
