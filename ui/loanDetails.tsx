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
        <Title size={"h3"}>Mensualités: {totalMonthlyPayments} € / mois</Title>
        <List withPadding>
          <List.Item>dont Capital moyen: {averageCapital} € / mois</List.Item>
          <List.Item>
            dont Intérêts moyens: {monthlyInterests} € / mois
          </List.Item>
          <List.Item>dont Assurance: {monthlyInsurance} € / mois</List.Item>
        </List>
      </Stack>
      <Stack gap={"2px"}>
        <Title size={"h3"}>Cout total: {totalCostAmount} €</Title>
        <List withPadding>
          <List.Item>dont Intérêts: {totalCostInterests} €</List.Item>
          <List.Item>dont Assurance: {totalInsuranceCost} €</List.Item>
        </List>
      </Stack>
    </Stack>
  );
}
