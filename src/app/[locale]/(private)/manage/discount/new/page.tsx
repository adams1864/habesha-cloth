import { Box, Card, Title } from "@mantine/core";
import DiscountFormDetails from "../_components/FormDetails";

export default function NewDiscountPage() {
  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Create New Discount
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <DiscountFormDetails mode="new" />
      </Card>
    </Box>
  );
}
