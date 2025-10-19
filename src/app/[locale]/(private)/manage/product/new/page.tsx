import { Box, Card, Title } from "@mantine/core";
import ProductFormDetails from "../_components/FormDetails";

export default function NewProductPage() {
  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Create New Product
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ProductFormDetails mode="new" />
      </Card>
    </Box>
  );
}
