import { Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={"/simulateur-emprunt"}>
      <Button>Simulateur emprunt</Button>
    </Link>
  );
}
