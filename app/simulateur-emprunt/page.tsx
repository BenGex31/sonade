import LoanForm from "@/ui/loanForm";
import { Group, Container, Stack, Title, Button } from "@mantine/core";
import Link from "next/link";

export default function LoanSimulator() {
  return (
    <Container fluid>
      <Stack gap={"xl"} mb={"lg"}>
        <Group justify="center">
          <Link href={"/"}>
            <Button variant="outline">Retour</Button>
          </Link>
          <Title size={"h1"}>Simulateur Emprunt</Title>
        </Group>
        <LoanForm />
      </Stack>
    </Container>
  );
}
