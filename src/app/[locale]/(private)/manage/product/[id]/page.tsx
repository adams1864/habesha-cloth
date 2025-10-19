import { Box, Card, Title } from "@mantine/core";
import ProductFormDetails from "../_components/FormDetails";
import { use } from "react";
import logger from "@/utils/logger";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // TODO: Fetch product data based on _params.id
  // const product = await fetchProduct(_params.id);
  logger.log(id);
  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Edit Product
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ProductFormDetails
          mode="detail"
          // product={product}
        />
      </Card>
    </Box>
  );
}
