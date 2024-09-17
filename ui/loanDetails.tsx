import { List, Stack, Title } from "@mantine/core";

type Props = {
  totalMonthlyPayments: number;
  averageCapital: number;
  monthlyInterests: number;
  monthlyInsurance: number;
  totalCostAmount: number;
  totalCostInterests: number;
  totalInsuranceCost: number;
};

export default function Loandetails({
  totalMonthlyPayments,
  averageCapital,
  monthlyInterests,
  monthlyInsurance,
  totalCostAmount,
  totalCostInterests,
  totalInsuranceCost,
}: Props) {
  return (
    <Stack w={350} gap={"xl"}>
      <Stack gap={"2px"}>
        <Title size={"h3"}>
          Mensualités: {totalMonthlyPayments.toLocaleString("fr-FR")} € / mois
        </Title>
        <List withPadding>
          <List.Item>
            dont Capital moyen: {averageCapital.toLocaleString("fr-FR")} € /
            mois
          </List.Item>
          <List.Item>
            dont Intérêts moyens: {monthlyInterests.toLocaleString("fr-FR")} € /
            mois
          </List.Item>
          <List.Item>
            dont Assurance: {monthlyInsurance.toLocaleString("fr-FR")} € / mois
          </List.Item>
        </List>
      </Stack>
      <Stack gap={"2px"}>
        <Title size={"h3"}>
          Cout total: {totalCostAmount.toLocaleString("fr-FR")} €
        </Title>
        <List withPadding>
          <List.Item>
            dont Intérêts: {totalCostInterests.toLocaleString("fr-FR")} €
          </List.Item>
          <List.Item>
            dont Assurance: {totalInsuranceCost.toLocaleString("fr-FR")} €
          </List.Item>
        </List>
      </Stack>
    </Stack>
  );
}
