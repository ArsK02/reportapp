import { useTheme } from '@shopify/restyle';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocalSearchParams } from 'expo-router';

import MonthReportItem from '@/components/month-report/MonthReportItem';
import ReportForm, { ReportFormRef } from '@/components/report-form/ReportForm';
import ScreenHeader from '@/components/ScreenHeader';
import ScreenSafeAreaContainer from '@/components/ScreenSafeAreaContainer';
import { ReportSaved } from '@/models';
import {
  selectMinutesPassedAlert,
  selectReportsByMonthView,
} from '@/store/reports/reportsSelectors';
import { doPassRemainingHours } from '@/store/reports/reportsService';
import Theme from '@/theme';
import { parseYearMonth } from '@/utils/date';

const MonthReportScreen: React.FC = () => {
  const params = useLocalSearchParams<{ year: string; month: string }>();
  const parsed = parseYearMonth(params.year, params.month);

  // Guard against malformed deep links such as reportapp://month/foo/bar.
  if (!parsed) {
    return <Redirect href="/" />;
  }

  return <MonthReport year={parsed.year} month={parsed.month} />;
};

type MonthReportProps = {
  year: number;
  month: number;
};

const MonthReport: React.FC<MonthReportProps> = ({ year, month }) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [t, i18n] = useTranslation();

  const reportFormRef = useRef<ReportFormRef>(null);

  const [reportFormDataEdit, setReportFormDataEdit] = useState<ReportSaved>();

  // Memoize the selector instances so their results stay referentially
  // stable between renders (the transfer alert effect depends on them).
  const reportsByMonthSelector = useMemo(
    () => selectReportsByMonthView(year, month),
    [year, month]
  );
  const minutesPassedAlertSelector = useMemo(
    () =>
      selectMinutesPassedAlert(
        month === 0 ? year - 1 : year,
        month === 0 ? 11 : month - 1
      ),
    [year, month]
  );
  const reportsByMonth = useSelector(reportsByMonthSelector);
  const minutesPassedAlertData = useSelector(minutesPassedAlertSelector);

  const theme = useTheme<Theme>();

  const passHours = useCallback(() => {
    doPassRemainingHours(dispatch, {
      year: year,
      month: month,
      minutesPassed: minutesPassedAlertData.minutesPassed,
      spetialMinutesPassed: minutesPassedAlertData.spetialMinutesPassed,
      reportRounded: minutesPassedAlertData.reportRounded,
      titleNext: i18n.t('Transferred to the next month'),
      titlePrev: i18n.t('Transferred from the previous month'),
    });
  }, [
    dispatch,
    minutesPassedAlertData.minutesPassed,
    minutesPassedAlertData.spetialMinutesPassed,
    minutesPassedAlertData.reportRounded,
    month,
    i18n,
    year,
  ]);

  useEffect(() => {
    if (
      reportsByMonth.reportsByDays.length === 0 &&
      minutesPassedAlertData.minutesPassed > 0 &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      Alert.alert(
        i18n.t('Transfer minutes'),
        i18n.t('Do you want to transfer minutes from the previous month?') ||
          'Do you want to transfer minutes from the previous month?',
        [
          {
            text: i18n.t('Yes') || 'Yes',
            onPress: passHours,
          },
          {
            text: i18n.t('Cancel') || 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    }
  }, [reportsByMonth, minutesPassedAlertData, year, month, passHours, i18n]);

  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.backgroundColor }}
      disableSafeAreaEdges={['top']}
    >
      <>
        <FlatList
          data={reportsByMonth.reportsByDays}
          ListHeaderComponent={() => <ScreenHeader title={`month-${month}`} />}
          renderItem={({ item, index }) => (
            <MonthReportItem
              setReportFormDataEdit={setReportFormDataEdit}
              reportFormRef={reportFormRef}
              reports={item}
              key={index}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
        <ReportForm
          reportData={reportFormDataEdit}
          ref={reportFormRef}
          hasAddButton={false}
        />
      </>
    </ScreenSafeAreaContainer>
  );
};

export default MonthReportScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 85,
  },
});
