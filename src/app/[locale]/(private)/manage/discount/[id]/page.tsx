import { Box, Card, Title } from "@mantine/core";
import DiscountFormDetails from "../_components/FormDetails";
import { use } from "react";
import logger from "@/utils/logger";

export default function DiscountDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);
  // TODO: Fetch discount data based on _params.id
  // const discount = await fetchDiscount(_params.id);
  logger.log(id);
  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Edit Discount
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <DiscountFormDetails
          mode="detail"
          // discount={discount}
        />
      </Card>
    </Box>
  );
}
