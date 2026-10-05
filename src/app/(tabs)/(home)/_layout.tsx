import React from 'react';
import { Stack, router } from 'expo-router';
import { useTheme } from '@shopify/restyle';

import HeaderBackButton from '@/components/buttons/HeaderBackButton';
import ReportForm from '@/components/report-form/ReportForm';
import { getMonthReportInitialDate, parseYearMonth } from '@/utils/date';
import Theme from '@/theme';

export default function HomeLayout() {
  const theme = useTheme<Theme>();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="month/[year]/[month]"
        options={({ route }) => {
          const params = route.params as { year?: string; month?: string };
          const parsed = parseYearMonth(params.year, params.month);
          return {
            headerShown: true,
            title: '',
            headerStyle: {
              backgroundColor: theme.colors.backgroundColor,
            },
            headerRight: () =>
              parsed ? (
                <ReportForm
                  hasAddButton={true}
                  headerButton={true}
                  initialDate={getMonthReportInitialDate(
                    parsed.year,
                    parsed.month
                  )}
                />
              ) : null,
          };
        }}
      />
    </Stack>
  );
}
