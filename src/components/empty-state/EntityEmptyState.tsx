import { Card } from "@mantine/core";
import { IconFileStack } from "@tabler/icons-react";

export function EntityEmptyState({
  entity,
  children,
}: {
  entity: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="flex max-h-screen min-h-[400px] items-center justify-center">
      <div className="mb-4 flex justify-center">
        <IconFileStack size={60} color="var(--primary-color-2)" stroke={1.5} />
      </div>

      <div className="text-2xl font-semibold text-gray-600">
        No data available
      </div>
      <div className="text-gray-500">
        There is no data available for {entity}
      </div>
      <div className="mt-4">{children}</div>
    </Card>
  );
}
