"use client";

import { Loan, LoanTableRow } from "@/lib/definitions";
import {
  NumberInput,
  Slider,
  Stack,
  Text,
  Paper,
  Center,
  Button,
  Title,
  Group,
  Badge,
  NumberFormatter,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import LoanTable from "./loanTable";
import { useMemo, useRef } from "react";
import Loandetails from "./loanDetails";
import { modals } from "@mantine/modals";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function LoanForm() {
  const form = useForm<Loan>({
    initialValues: {
      amount: 200000,
      duration: 25,
      rate: 3,
      insurance: 0.3,
    },
  });

  const contentRef = useRef<HTMLDivElement | null>(null);

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

  const monthlyInsurance = useMemo(() => {
    return Math.round(monthlyInsuranceRate);
  }, [monthlyInsuranceRate]);

  function totalMonthlyPayments(): number {
    return Math.round(
      (form.values.amount * form.values.rate) /
        100 /
        12 /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)) +
        monthlyInsurance
    );
  }

  function totalCostAmount(): number {
    return Math.round(totalMonthlyPayments() * numberOfPayments);
  }

  function totalCostInterests(): number {
    return Math.round(totalInterestPaid);
  }

  function totalInsuranceCost(): number {
    return Math.round(monthlyInsurance * numberOfPayments);
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
          annuity: Math.round((monthlyPayment + monthlyInsurance) * 12),
          interest: Math.round(interestPayment * 12),
          insurance: Math.round(monthlyInsurance * 12),
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

  function handleLoandetailsOpen(): void {
    modals.openConfirmModal({
      title: <Title size="h2">Détail emprunt</Title>,
      children: (
        <Stack gap={"lg"} ref={contentRef} align="stretch">
          <Center>
            <Group mt={"md"} justify="center">
              <Tooltip
                label="Montant"
                color="orange"
                withArrow
                position="bottom"
              >
                <Badge size="lg">
                  <NumberFormatter
                    thousandSeparator=" "
                    decimalSeparator=","
                    value={form.values.amount}
                    suffix=" €"
                  />
                </Badge>
              </Tooltip>
              <Badge size="lg">
                {form.values.duration > 1
                  ? `${form.values.duration} ans`
                  : `${form.values.duration} an`}
              </Badge>
              <Tooltip
                label="Taux emprunt"
                color="orange"
                withArrow
                position="bottom"
              >
                <Badge size="lg">{`${form.values.rate} %`}</Badge>
              </Tooltip>
              <Tooltip
                label="Taux assurance"
                color="orange"
                withArrow
                position="bottom"
              >
                <Badge size="lg">{`${form.values.insurance} %`}</Badge>
              </Tooltip>
            </Group>
          </Center>
          <Loandetails
            totalMonthlyPayments={totalMonthlyPayments()}
            averageCapital={averageCapital()}
            monthlyInterests={monthlyInterests()}
            monthlyInsurance={monthlyInsurance}
            totalCostAmount={totalCostAmount()}
            totalCostInterests={totalCostInterests()}
            totalInsuranceCost={totalInsuranceCost()}
          />
          <LoanTable data={loanDataRows} />
        </Stack>
      ),
      size: "90%",
      padding: "xl",
      withCloseButton: false,
      onConfirm: () => generatePDF(),
      labels: { confirm: "Générer PDF", cancel: "Fermer" },
    });
  }

  async function generatePDF() {
    const element = contentRef.current;

    if (!element) return;

    // Capture l'élément HTML sous forme d'image
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // Crée une instance jsPDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // Largeur A4 en millimètres
    const pageHeight = 297; // Hauteur A4 en millimètres
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Ajoute l'image au PDF, gère les pages multiples si nécessaire
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("simulateur-emprunt.pdf");
  }

  return (
    <form>
      <Center>
        <Paper shadow="md" p="xl">
          <Stack w={350}>
            <NumberInput
              min={10000}
              max={900000}
              description="min 10 000 / max 900 000"
              {...form.getInputProps("amount")}
              label="Montant à emprunter"
              thousandSeparator=" "
              suffix=" €"
              styles={{
                label: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack gap={"1px"}>
              <Text fw={"bold"} size="sm">
                Durée
              </Text>
              <Slider
                color="blue"
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
              styles={{
                label: {
                  fontWeight: "bold",
                },
              }}
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
              styles={{
                label: {
                  fontWeight: "bold",
                },
              }}
            />
            <Button onClick={handleLoandetailsOpen}>Calculer</Button>
          </Stack>
        </Paper>
      </Center>
    </form>
  );
}
