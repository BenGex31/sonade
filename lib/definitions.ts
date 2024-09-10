export type Loan = {
  amount: number;
  duration: number;
  rate: number;
  insurance: number;
};

export type LoanTableRow = {
  year: number;
  annuity: number;
  interest: number;
  insurance: number;
  remainingCapital: number;
};
