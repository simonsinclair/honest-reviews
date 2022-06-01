export const getValueRoundedToDecimalPlaces = (
  value: number,
  decimalPlaces: number,
) => {
  const roundingFactor = Math.pow(10, decimalPlaces);
  return Math.round(value * roundingFactor) / roundingFactor;
};
