import { LoanTableRow } from "@/lib/definitions";
import { Table, Title, Paper, Center } from "@mantine/core";

type Props = {
  data: LoanTableRow[];
};

export default function LoanTable({ data }: Props) {
  return (
    <Paper shadow="xs" p="md" mx={"xl"}>
      <Center>
        <Title order={2} mb="md">
          Tableau d&apos;amortissement
        </Title>
      </Center>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr style={{ backgroundColor: "#2196f3", color: "white" }}>
            <Table.Th>Années</Table.Th>
            <Table.Th>Annuités</Table.Th>
            <Table.Th>Intérêts</Table.Th>
            <Table.Th>Assurance</Table.Th>
            <Table.Th>Capital Restant</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.year}>
              <Table.Td>{row.year}</Table.Td>
              <Table.Td>{row.annuity} €</Table.Td>
              <Table.Td>{row.interest} €</Table.Td>
              <Table.Td>{row.insurance} €</Table.Td>
              <Table.Td>{row.remainingCapital} €</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
