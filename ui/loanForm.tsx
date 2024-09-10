"use client";

import { Loan } from "@/lib/definitions";
import { NumberInput, Slider, Stack, Text } from "@mantine/core";
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
  return (
    <form>
      <Stack>
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
            {...form.getInputProps("duration")}
          />
        </Stack>
        <NumberInput
          min={0}
          max={8}
          {...form.getInputProps("rate")}
          label="Taux"
          suffix="%"
          decimalScale={2}
          decimalSeparator=","
        />
        <NumberInput
          min={0}
          max={3}
          {...form.getInputProps("insurance")}
          label="Assurance"
          suffix="%"
          decimalScale={2}
          decimalSeparator=","
        />
      </Stack>
    </form>
  );
}
