import { Button, Container, Flex } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container fluid>
      <Flex justify={"center"} mt={"xl"}>
        <Link href={"/simulateur-emprunt"}>
          <Button>Simulateur emprunt</Button>
        </Link>
      </Flex>
    </Container>
  );
}
