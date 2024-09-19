import { List, Stack, Title, NumberFormatter, Flex } from "@mantine/core";

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
    <Flex
      justify={"space-around"}
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", md: "lg" }}
    >
      <Stack gap={"2px"}>
        <Title size={"h4"}>
          Mensualités:{" "}
          {
            <NumberFormatter
              thousandSeparator=" "
              decimalSeparator=","
              value={totalMonthlyPayments}
              suffix=" € / mois"
            />
          }
        </Title>
        <List withPadding>
          <List.Item>
            dont Capital moyen:{" "}
            {
              <NumberFormatter
                thousandSeparator=" "
                decimalSeparator=","
                value={averageCapital}
                suffix=" € / mois"
              />
            }
          </List.Item>
          <List.Item>
            dont Intérêts moyens:{" "}
            {
              <NumberFormatter
                thousandSeparator=" "
                decimalSeparator=","
                value={monthlyInterests}
                suffix=" € / mois"
              />
            }
          </List.Item>
          <List.Item>
            dont Assurance:{" "}
            {
              <NumberFormatter
                thousandSeparator=" "
                decimalSeparator=","
                value={monthlyInsurance}
                suffix=" € / mois"
              />
            }
          </List.Item>
        </List>
      </Stack>
      <Stack gap={"2px"}>
        <Title size={"h4"}>
          Cout total:{" "}
          {
            <NumberFormatter
              thousandSeparator=" "
              decimalSeparator=","
              value={totalCostAmount}
              suffix=" €"
            />
          }
        </Title>
        <List withPadding>
          <List.Item>
            dont Intérêts:{" "}
            {
              <NumberFormatter
                thousandSeparator=" "
                decimalSeparator=","
                value={totalCostInterests}
                suffix=" €"
              />
            }
          </List.Item>
          <List.Item>
            dont Assurance:{" "}
            {
              <NumberFormatter
                thousandSeparator=" "
                decimalSeparator=","
                value={totalInsuranceCost}
                suffix=" €"
              />
            }
          </List.Item>
        </List>
      </Stack>
    </Flex>
  );
}
