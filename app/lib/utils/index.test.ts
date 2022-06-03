import { getNumberRoundedToDecimalPlaces } from '~/lib/utils';

describe('getNumberRoundedToDecimalPlaces', () => {
  it.each([
    { number: 0, decimalPlaces: 1, returnValue: 0 },
    { number: 1.2, decimalPlaces: 1, returnValue: 1.2 },
    { number: 1.25, decimalPlaces: 1, returnValue: 1.3 },
    { number: 1.265, decimalPlaces: 2, returnValue: 1.27 },
    { number: 1.5, decimalPlaces: 0, returnValue: 2 },
  ])(
    'rounds $number to $decimalPlaces decimal place(s)',
    ({ number, decimalPlaces, returnValue }) => {
      expect(getNumberRoundedToDecimalPlaces(number, decimalPlaces)).toBe(
        returnValue,
      );
    },
  );
});
