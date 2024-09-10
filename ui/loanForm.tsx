"use client";

import { Loan } from "@/lib/definitions";
import {
  NumberInput,
  Flex,
  Slider,
  Stack,
  Text,
  Title,
  List,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function LoanForm() {
  const form = useForm<Loan>({
    initialValues: {
      amount: 200000,
      duration: 25,
      rate: 3,
      insurance: 0.3,
    },
  });

  const amount = form.values.amount;
  const monthlyInterestRate = form.values.rate / 100 / 12;
  const numberOfPayments = form.values.duration * 12;
  const monthlyPayment =
    (form.values.amount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  const totalInterestPaid =
    monthlyPayment * numberOfPayments - form.values.amount;
  const averageInterestCost = totalInterestPaid / numberOfPayments;
  const monthlyInsuranceRate = amount * (form.values.insurance / 100 / 12);

  function averageCapital(): number {
    return Math.round(form.values.amount / form.values.duration / 12);
  }

  function monthlyInterests(): number {
    return Math.round(averageInterestCost);
  }

  function monthlyInsurance(): number {
    return Math.round(monthlyInsuranceRate);
  }

  function totalMonthlyPayments(): number {
    return Math.round(
      (form.values.amount * form.values.rate) /
        100 /
        12 /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)) +
        monthlyInsurance()
    );
  }

  function totalCostAmount(): number {
    return Math.round(totalMonthlyPayments() * numberOfPayments);
  }

  function totalCostInterests(): number {
    return Math.round(totalInterestPaid);
  }

  function totalInsuranceCost(): number {
    return Math.round(monthlyInsurance() * numberOfPayments);
  }

  return (
    <form>
      <Flex justify="space-evenly">
        <Stack w={350}>
          <NumberInput
            min={10000}
            max={900000}
            {...form.getInputProps("amount")}
            label="Montant"
            thousandSeparator=" "
            suffix=" €"
          />
          <Stack gap={"1px"}>
            <Text size="sm">Durée</Text>
            <Slider
              label={(value) => (value > 1 ? `${value} ans` : `${value} an`)}
              min={1}
              max={25}
              labelAlwaysOn
              {...form.getInputProps("duration")}
            />
          </Stack>
          <NumberInput
            min={0}
            max={8}
            {...form.getInputProps("rate")}
            label="Taux emprunt"
            suffix="%"
            decimalScale={2}
            decimalSeparator=","
            description="min 0% / max 8%"
          />
          <NumberInput
            min={0}
            max={3}
            {...form.getInputProps("insurance")}
            label="Taux assurance"
            suffix="%"
            decimalScale={2}
            decimalSeparator=","
            description="min 0% / max 3%"
          />
        </Stack>
        <Stack w={350} gap={"xl"}>
          <Stack gap={"2px"}>
            <Title size={"h3"}>
              Mensualités: {totalMonthlyPayments()} € / mois
            </Title>
            <List withPadding>
              <List.Item>
                dont Capital moyen: {averageCapital()} € / mois
              </List.Item>
              <List.Item>
                dont Intérêts moyens: {monthlyInterests()} € / mois
              </List.Item>
              <List.Item>
                dont Assurance: {monthlyInsurance()} € / mois
              </List.Item>
            </List>
          </Stack>
          <Stack gap={"2px"}>
            <Title size={"h3"}>Cout total: {totalCostAmount()} €</Title>
            <List withPadding>
              <List.Item>dont Intérêts: {totalCostInterests()} €</List.Item>
              <List.Item>dont Assurance: {totalInsuranceCost()} €</List.Item>
            </List>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
