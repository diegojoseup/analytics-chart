import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import ProgressChart from '../../charts/ProgressChart';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/color';

function ProgressChartScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#181d32',
        alignItems: 'center',
      }}>
      <ProgressChart
        radius={260}
        innerRadius={215}
        marginTop={30}
        marginBottom={0}
        marginLeft={0}
        marginRight={0}
        progressPercent={70}
        animationDuration={2000}
        unFillColor={'#ffffff'}
        fillColor={[colors.violet.colr2,colors.blue.colr2,colors.green.colr1]}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 38,
              lineHeight: 38,
              fontWeight: 'bold',
              color: '#fff',
              fontFamily: fonts.MontserratBold,
            }}>
            ₱401K
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 14,
              fontWeight: 'bold',
              color: '#6bd19d',
              marginVertical: 10,
            }}>
            +2.5%
          </Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 15,
              color: '#fff',
              opacity: 0.7,
            }}>
            Shares Value
          </Text>
        </View>
      </ProgressChart>
    </SafeAreaView>
  );
}

export default ProgressChartScreen;
