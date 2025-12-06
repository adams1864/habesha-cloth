import { redirect } from "next/navigation";

type Props = { params: { id: string } };

export default function ProductRedirect({ params }: Props) {
  // Redirect to default locale (en). Change if your default locale differs.
  redirect(`/en/product/${params.id}`);
}
