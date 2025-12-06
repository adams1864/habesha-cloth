import { redirect } from "next/navigation";

type Props = { params: { id: string } | Promise<{ id: string }> };

export default async function ProductRedirect({ params }: Props) {
  const { id } = await params;
  // Redirect to default locale (en). Change if your default locale differs.
  redirect(`/en/product/${id}`);
}
