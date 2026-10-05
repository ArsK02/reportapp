import { getLocales } from 'expo-localization';

export const dateToLocale = (date: Date): string => {
  return new Date(date).toLocaleDateString(getLocales()[0]?.languageTag);
};

// Parses `year`/`month` route params; null when they are not a valid month.
export const parseYearMonth = (
  year?: string,
  month?: string
): { year: number; month: number } | null => {
  const y = Number(year);
  const m = Number(month);
  return Number.isInteger(y) && Number.isInteger(m) && m >= 0 && m <= 11
    ? { year: y, month: m }
    : null;
};

// Today when the month is the current one, otherwise its first day.
export const getMonthReportInitialDate = (
  year: number,
  month: number
): Date => {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() === month
    ? now
    : new Date(year, month, 1);
};
