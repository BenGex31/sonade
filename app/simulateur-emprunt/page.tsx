import LoanForm from "@/ui/loanForm";
import { Center, Container, Stack, Title } from "@mantine/core";

export default function LoanSimulator() {
  return (
    <Container>
      <Center>
        <Stack>
          <Title>Simulateur Emprunt</Title>
          <LoanForm />
        </Stack>
      </Center>
    </Container>
  );
}
