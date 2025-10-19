import { Box, Card, Title } from "@mantine/core";
import BundleFormDetails from "../_components/FormDetails";
import { use } from "react";
import logger from "@/utils/logger";

export default function BundleDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);
  // TODO: Fetch bundle data based on _params.id
  // const bundle = await fetchBundle(_params.id);
  logger.log(id);

  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Edit Bundle
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <BundleFormDetails
          mode="detail"
          // bundle={bundle}
        />
      </Card>
    </Box>
  );
}
