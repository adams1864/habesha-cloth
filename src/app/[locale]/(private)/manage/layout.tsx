import { Box, Container } from "@mantine/core";
import { ManageMenu } from "./_components/menu";
import { Header } from "@/components/landing/Header";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container size="xl" className="min-h-screen">
        <Box className="container mx-auto flex h-full mb-4 gap-4 pt-4">
          <Box className="hidden md:block">
            <ManageMenu />
          </Box>
          <Box className="grow">{children}</Box>
        </Box>
      </Container>
    </>
  );
}
