import React, { useMemo, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import YearForm from '../year-form/YearForm';
import { Carousel } from 'react-native-reanimated-carousel';
import MonthItem from './MonthItem';
// import { ReportStatsYear } from '../../store/reports/reportsState';
import { useSelector } from 'react-redux';
import { selectStatsReportsByYear } from '../../store/reports/reportsSelectors';
// import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const currentYear: number = new Date().getFullYear();
const currentMonth: number = new Date().getMonth() + 1;

const getArrayMonth = () => {
  const result: number[] = [];
  for (let i = 0; i < 12; i++) {
    result.push(i);
  }
  return result;
};

const getMonths = (year: number) =>
  year === currentYear
    ? getArrayMonth().slice(0, currentMonth)
    : getArrayMonth();

const MonthSlider: React.FC = () => {
  const width = Dimensions.get('window').width;

  const [year, setYear] = useState<number>(currentYear);
  // The carousel reads `defaultIndex` only on mount, so it is keyed by year
  // and starts on the latest month of the selected year.
  const months = useMemo(() => getMonths(year), [year]);
  const defaultIndex = months.length - 1;

  const stats = useSelector(selectStatsReportsByYear(year));

  return (
    <View style={{ flex: 1 }}>
      <YearForm year={year} setYear={setYear} />
      <Carousel
        key={year}
        loop={false}
        itemSize={width * 0.85}
        data={months}
        style={styles.carousel}
        defaultIndex={defaultIndex}
        animation={{ type: 'timing', duration: 1000 }}
        renderItem={({ index }) => (
          <MonthItem
            stats={
              stats.statsMonths.filter((elem) => elem.month === index).length >
              0
                ? stats.statsMonths.filter((elem) => elem.month === index)[0]
                : null
            }
            year={year}
            month={index}
          />
        )}
      />
    </View>
  );
};

export default MonthSlider;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
});
