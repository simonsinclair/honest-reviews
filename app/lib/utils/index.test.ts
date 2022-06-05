import {
  getChartDataAltText,
  getNumberRoundedToDecimalPlaces,
  getSanitisedPageParam,
  getSkipValue,
} from '~/lib/utils';
import { DEFAULT_TAKE } from '../constants';

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

describe('getSkipValue', () => {
  it.each([
    { pageNum: 1, takeValue: 0, returnValue: 0 },
    { pageNum: 1, takeValue: DEFAULT_TAKE, returnValue: 0 },
    { pageNum: 2, takeValue: 20, returnValue: 20 },
  ])(
    'returns the number of items to skip to page $pageNum when a page has $takeValue items',
    ({ pageNum, takeValue, returnValue }) => {
      expect(getSkipValue(pageNum, takeValue)).toBe(returnValue);
    },
  );
});

describe('getChartDataAltText', () => {
  it.each<{ labelValuePairs: [string, number][]; returnValue: string }>([
    { labelValuePairs: [], returnValue: '' },
    { labelValuePairs: [['A', 1]], returnValue: 'A: 1.' },
    {
      labelValuePairs: [
        ['A', 1],
        ['B', 2],
      ],
      returnValue: 'A: 1. B: 2.',
    },
  ])(
    'serialises chart data into a human-readable string when label and value pairs are "$labelValuePairs"',
    ({ labelValuePairs, returnValue }) => {
      expect(getChartDataAltText(labelValuePairs)).toBe(returnValue);
    },
  );
});
