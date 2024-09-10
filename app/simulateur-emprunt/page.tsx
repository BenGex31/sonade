import LoanForm from "@/ui/loanForm";
import { Center, Container, Stack, Title } from "@mantine/core";

export default function LoanSimulator() {
  return (
    <Container fluid>
      <Stack gap={"xl"}>
        <Center>
          <Title size={"h1"}>Simulateur Emprunt</Title>
        </Center>
        <LoanForm />
      </Stack>
    </Container>
  );
}
