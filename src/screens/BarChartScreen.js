import React from 'react';
import {SafeAreaView} from 'react-native';
import BarChart from '../../charts/BarChart';
import {colors} from '../theme/color';
import { fonts } from '../theme/fonts';

function BarChartScreen() {
  const _data = [
    {
      label: 'iTextKita',
      value: 150,
      gradientColor:[colors.green.colr1,colors.blue.colr2],
    },
    {
      label: 'FELIX ',
      value: 250,
      gradientColor:[colors.green.colr1,colors.blue.colr2],
    },
    {
      label: 'Ka-Tubig ',
      value: 330,
      gradientColor:[colors.green.colr1,colors.blue.colr2],
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <BarChart
        width={350}
        backgroundColor={colors.background}
        data={_data}
        fontFamily={fonts.MontserratRegular}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        borderRadius={20}
        legendColor={colors.white}
      />
    </SafeAreaView>
  );
}

export default BarChartScreen;
