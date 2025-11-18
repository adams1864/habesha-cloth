import { redirect } from "next/navigation";

type Props = { params: { id: string } };

export default function BundleRedirect({ params }: Props) {
  const { id } = params;
  // Redirect to default locale (en). Adjust if you want a different default.
  redirect(`/en/bundle/${id}`);
}
