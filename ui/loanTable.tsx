import { LoanTableRow } from "@/lib/definitions";
import { Table, Title, Paper, Center } from "@mantine/core";

type Props = {
  data: LoanTableRow[];
};

export default function LoanTable({ data }: Props) {
  return (
    <Paper p="md">
      <Center>
        <Title order={2} mb="md">
          Tableau d&apos;amortissement
        </Title>
      </Center>
      <Table>
        <Table.Thead>
          <Table.Tr
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              textAlign: "center",
            }}
          >
            <Table.Th>Années</Table.Th>
            <Table.Th>Annuités</Table.Th>
            <Table.Th>Intérêts</Table.Th>
            <Table.Th>Assurance</Table.Th>
            <Table.Th>Capital Restant</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.year} style={{ textAlign: "center" }}>
              <Table.Td>{row.year}</Table.Td>
              <Table.Td>{row.annuity.toLocaleString("fr-FR")} €</Table.Td>
              <Table.Td>{row.interest.toLocaleString("fr-FR")} €</Table.Td>
              <Table.Td>{row.insurance.toLocaleString("fr-FR")} €</Table.Td>
              <Table.Td>
                {row.remainingCapital.toLocaleString("fr-FR")} €
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
