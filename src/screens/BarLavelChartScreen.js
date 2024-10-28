import React from 'react';
import {SafeAreaView} from 'react-native';
import BarLavelChart from '../../charts/BarLavelChart';
import {colors} from '../theme/color';
import {fonts} from '../theme/fonts';

function BarLavelScreen() {
  const _data = [
    {
      label: 'Sun',
      value: 2.5,
      valueLabel: '₱2.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Mon',
      value: 1.5,
      valueLabel: '₱1.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Tue',
      value: 8.1,
      valueLabel: '₱8.1K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Wed',
      value: 4.1,
      valueLabel: '₱4.1K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Thu',
      value: 3.9,
      valueLabel: '₱3.9K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Fri',
      value: 7.5,
      valueLabel: '₱7.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Sat',
      value: 7.5,
      valueLabel: '₱7.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Thu',
      value: 3.9,
      valueLabel: '₱3.9K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'Fri',
      value: 7.5,
      valueLabel: '₱7.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
    {
      label: 'KK',
      value: 7.5,
      valueLabel: '₱7.5K',
      gradientColor: [colors.green.colr1,colors.blue.colr2]
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <BarLavelChart
        height={300}
        width={350}
        backgroundColor={colors.background}
        data={_data}
        fontFamily={fonts.MontserratBold}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        borderRadius={20}
        XAxisColor={colors.white}
        legendColor={colors.white}
      />
    </SafeAreaView>
  );
}

export default BarLavelScreen;
