import { redirect } from "next/navigation";

type Props = { params: { id: string } };

export default function ProductRedirect({ params }: Props) {
  const { id } = params;
  // Redirect to default locale (en). Change if you want a different default.
  redirect(`/en/product/${id}`);
}
import { redirect } from "next/navigation";

type Props = { params: { id: string } };

export default function ProductRedirect({ params }: Props) {
  // Redirect to default locale (en). Change if your default locale differs.
  redirect(`/en/product/${params.id}`);
}
