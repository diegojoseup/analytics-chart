import React from 'react';
import {SafeAreaView} from 'react-native';
import _ColumnChart from '../../charts/ColumnChart';
import {colors} from '../theme/color';
import {fonts} from '../theme/fonts';

function ColumnChartScreen() {
  const _data = {
    labelX: ['Sun', 'Mon', 'Tue', 'Wed', 'Thi', 'Fri', 'Sat'],
    values: [
      {
        label: 'Expenses',
        gradientColor: [colors.blue.colr2],
        values: [22, 10, 10, 24, 1, 20, 10],
      },
      {
        label: 'Revenue',
        gradientColor: [colors.red.colr1],
        values: [40, 36, 44, 25, 10, 32, 22],
      },
    ],
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <_ColumnChart
        height={300}
        width={350}
        backgroundColor={colors.background}
        lavel={7}
        data={_data}
        fontFamily={fonts.MontserratBold}
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
      />
    </SafeAreaView>
  );
}

export default ColumnChartScreen;
