import React from 'react';
import { useTheme } from '@shopify/restyle';

import Theme from '@/theme';
import ReportForm from '@/components/report-form/ReportForm';
import MonthSlider from '@/components/month-slider/MonthSlider';
import ScreenSafeAreaContainer from '@/components/ScreenSafeAreaContainer';

const HomeScreen: React.FC = () => {
  const theme = useTheme<Theme>();
  return (
    <ScreenSafeAreaContainer
      style={{ backgroundColor: theme.colors.secondaryBackgroundColor }}
    >
      <>
        <MonthSlider />
        <ReportForm hasAddButton={true} />
      </>
    </ScreenSafeAreaContainer>
  );
};

export default HomeScreen;
