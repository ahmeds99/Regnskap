export function formatCurrency(amount: number): string {
  return amount.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
