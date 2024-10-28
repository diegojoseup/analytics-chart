import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {fonts} from '../theme/fonts';
function DefaultScreen({navigation}) {
  const links = [
    {
      title: 'Line Chart',
      screen: 'LineChartScreen',
    },
    {
      title: 'Column Chart',
      screen: 'ColumnChartScreen',
    },
    {
      title: 'Pie Chart',
      screen: 'PieChartScreen',
    },
    {
      title: 'Bar Chart',
      screen: 'BarChart',
    },
    {
      title: 'Bar Lavel Chart',
      screen: 'BarLavelChartScreen',
    },
    {
      title: 'Progress Chart',
      screen: 'ProgressChartScreen',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {links?.map((item, inx) => (
        <TouchableOpacity
          key={inx}
          onPress={() => navigation?.navigate(item?.screen)}
          style={{
            backgroundColor: '#fff',
            width: 300,
            paddingVertical: 15,
            borderRadius: 7,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.MontserratBold,
              fontSize: 12,
              color: '#181d32',
              textAlign: 'center',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

export default DefaultScreen;
