import React from 'react';
import {SafeAreaView} from 'react-native';
import PieChart from '../../charts/PieChart';
import {colors} from '../theme/color';
import {fonts} from '../theme/fonts';

function PieChartScreen() {
  const _data2 = [
    {
      legendTitle: 'Development',
      value: 8,
      color: [colors.grey.colr1,colors.grey.colr2],
    },
    {
      legendTitle: 'Marketing',
      value: 12,
      color: [colors.violet.colr1,colors.violet.colr2],
    },
    {
      legendTitle: 'Design',
      value: 3,
      color: [colors.purple.colr1,colors.purple.colr2],
    },
    {
      legendTitle: 'Server',
      value: 45,
      color: [colors.green.colr1,colors.green.colr2],
    },
    {
      legendTitle: 'API',
      value: 25,
      color: [colors.blue.colr1,colors.blue.colr2],
    },
    {
      legendTitle: 'Others',
      value: 7,
      color: [colors.gold.colr1,colors.gold.colr2],
    },
  ];
  const _data = [
    {
      legendTitle: '120,45',
      legendSubTitle: 'Active Customer',
      value: 12045,
      color: [colors.grey.colr1,colors.grey.colr2],
    },
    {
      legendTitle: '8,504',
      legendSubTitle: 'In-active Customer',
      value: 8504,
      color: [colors.violet.colr1,colors.violet.colr2],
    },
    {
      legendTitle: '4,024',
      legendSubTitle: 'Lost Customers',
      value: 4024,
      color: [colors.purple.colr1,colors.purple.colr2],
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <PieChart
        data={_data}
        width={350}
        backgroundColor={colors.background}
        fontFamily={fonts.MontserratRegular}
        percentageFontFamily={fonts.MontserratBold}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        borderRadius={20}
        percentageColor={colors.white}
        legendColor={colors.white}
      />
      <PieChart
        data={_data2}
        width={350}
        backgroundColor={colors.background}
        fontFamily={fonts.MontserratRegular}
        percentageFontFamily={fonts.MontserratBold}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        borderRadius={20}
        percentageColor={colors.white}
        legendColor={colors.white}
      />
    </SafeAreaView>
  );
}

export default PieChartScreen;
