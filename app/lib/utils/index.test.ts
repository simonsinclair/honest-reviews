import {
  getNumberRoundedToDecimalPlaces,
  getSanitisedPageParam,
} from '~/lib/utils';

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

describe('getSanitisedPageParam', () => {
  it.each([
    { page: null, returnValue: 1 },
    { page: '', returnValue: 1 },
    { page: 'foo', returnValue: 1 },
    { page: '-1', returnValue: 1 },
    { page: '0', returnValue: 1 },
    { page: '1', returnValue: 1 },
    { page: '2', returnValue: 2 },
  ])('sanitises "$page" to a valid page number', ({ page, returnValue }) => {
    expect(getSanitisedPageParam(page)).toBe(returnValue);
  });
});
