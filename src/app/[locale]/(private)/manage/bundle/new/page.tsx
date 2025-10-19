import { Box, Card, Title } from "@mantine/core";
import BundleFormDetails from "../_components/FormDetails";

export default function NewBundlePage() {
  return (
    <Box p="md">
      <Title order={2} mb="lg">
        Create New Bundle
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <BundleFormDetails mode="new" />
      </Card>
    </Box>
  );
}
