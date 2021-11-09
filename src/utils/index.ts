export function formatNumber(number: number, fixedLength: number = 0) {
  if (!number) return 0;
  return number.toLocaleString("en-US", {
    minimumFractionDigits: fixedLength,
    maximumFractionDigits: fixedLength,
  });
}
