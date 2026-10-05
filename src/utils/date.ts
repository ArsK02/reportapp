import { getLocales } from 'expo-localization';

export const dateToLocale = (date: Date): string => {
  return new Date(date).toLocaleDateString(getLocales()[0]?.languageTag);
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
