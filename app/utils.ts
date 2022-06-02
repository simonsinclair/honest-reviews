export const getValueRoundedToDecimalPlaces = (
  value: number,
  decimalPlaces: number,
) => {
  const roundingFactor = Math.pow(10, decimalPlaces);
  return Math.round(value * roundingFactor) / roundingFactor;
};

/**
 * Sanitises the `page` URL search parameter.
 * @param page A URL search parameter.
 * @returns A valid page number.
 */
export const getSanitisedPageParam = (page: string | null) => {
  const pageNumber = Number(page);
  return isNaN(pageNumber) ? 1 : Math.max(1, pageNumber);
};

/**
 * Calculates the number of items to skip to a given page.
 * @param pageNum A page number.
 * @param takeValue The number of items in a page.
 * @returns The number of items to skip to the given page.
 */
export const getSkipValue = (pageNum: number, takeValue: number) => {
  return pageNum * takeValue - takeValue;
};
