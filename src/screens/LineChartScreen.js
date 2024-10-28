import React from 'react';
import {SafeAreaView} from 'react-native';
import LineChart from '../../charts/LineChart';
import {colors} from '../theme/color';
import {fonts} from '../theme/fonts';

function LineChartScreen() {
  const _data = {
    legend: [
      {
        label: 'Expenses',
        gradientColor: [colors.green.colr1,colors.green.colr1],
        values: [100, 50, 160, 350, 200, 80, 400]
      },
      {
        label: 'Revenue',
        gradientColor: [colors.red.colr1,colors.red.colr1],
        values: [150, 140, 200, 107, 0, 226, 200],
      },
    ],
    XAsxisLabel: ['Sun', 'Mon', 'Wed', 'Tue', 'Thu', 'Fri', 'Sat'],
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <LineChart
        height={300}
        width={350}
        backgroundColor={colors.background}
        lavel={7}
        data={_data}
        fontFamily={fonts.MontserratRegular}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        legendUnit={'K'}
        borderRadius={20}
        XAxisColor={colors.white}
        YAxisColor={colors.white}
        legendColor={colors.white}
        lavelLineColor={colors.white}
        selectdPoliColor={colors.lightGrey}
        selectdLineColor={colors.white}
        dropdownColor={colors.green.colr1}
        dropdownFillColor={colors.lightGreen}
      />
    </SafeAreaView>
  );
}

export default LineChartScreen;
