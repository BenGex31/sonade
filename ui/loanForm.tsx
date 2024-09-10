"use client";

import { Loan, LoanTableRow } from "@/lib/definitions";
import { NumberInput, Flex, Slider, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import LoanTable from "./loanTable";
import { useMemo } from "react";
import Loandetails from "./loanDetails";

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

  const loanDataRows: LoanTableRow[] = useMemo(() => {
    const loanArray: LoanTableRow[] = [];
    let remainingBalance = amount;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      if (i % 12 === 0 || i === numberOfPayments) {
        loanArray.push({
          year: i / 12,
          annuity: Math.round((monthlyPayment + monthlyInsurance()) * 12),
          interest: Math.round(interestPayment * 12),
          insurance: Math.round(monthlyInsurance() * 12),
          remainingCapital: Math.round(remainingBalance),
        });
      }
    }
    return loanArray;
  }, [
    numberOfPayments,
    amount,
    monthlyInsurance,
    monthlyInterestRate,
    monthlyPayment,
  ]);

  return (
    <form>
      <Flex
        gap={"xl"}
        direction={{ base: "column", xs: "row" }}
        justify={{ base: "center", xs: "space-evenly" }}
        align={"center"}
      >
        <Stack w={350}>
          <NumberInput
            min={10000}
            max={900000}
            description="min 10 000 / max 900 000"
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
        <Loandetails
          totalMonthlyPayments={totalMonthlyPayments()}
          averageCapital={averageCapital()}
          monthlyInterests={monthlyInterests()}
          monthlyInsurance={monthlyInsurance()}
          totalCostAmount={totalCostAmount()}
          totalCostInterests={totalCostInterests()}
          totalInsuranceCost={totalInsuranceCost()}
        />
      </Flex>
      <LoanTable data={loanDataRows} />
    </form>
  );
}
