import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import CBarLavelChartAnim from './CBarLavelChartAnim';

import {Svg} from 'react-native-svg';

export default class CBarLavelChart extends React.PureComponent {
  render() {
    const height = this.props.height,
      width = this.props.width;

    const _data = this.props.data;
    const dataLength = _data?.length || 0;
    const _maxValue = Math.max(...(_data?.map(item => item?.value) || []));

    const _wdth = width - 60;
    const eachWdth = 45;
    const totalWidth = eachWdth * (dataLength + 1) - (eachWdth - 10);

    return (
      <View
        pointerEvents={'box-none'}
        style={{
          width: width,
          height: height,
          backgroundColor: this.props.backgroundColor,
          borderRadius: this.props.borderRadius,
          marginBottom: this.props.marginBottom,
          marginTop: this.props.marginTop,
          marginLeft: this.props.marginLeft,
          marginRight: this.props.marginRight,
          paddingLeft: 10,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: _wdth < totalWidth ? totalWidth : _wdth,
          }}>
          {height > 0 && width > 0 && (
            <Svg
              pointerEvents={Platform.OS === 'android' && 'box-none'}
              style={{
                height: height,
                width: eachWdth * dataLength,
              }}>
              {this.props.data?.map((item, inx) => (
                <CBarLavelChartAnim
                  key={inx}
                  index={inx}
                  maxValue={_maxValue}
                  width={eachWdth}
                  height={height}
                  fontFamily={this.props.fontFamily}
                  XAxisColor={this.props.XAxisColor}
                  legendColor={this.props.legendColor}
                  {...item}
                />
              ))}
            </Svg>
          )}
        </ScrollView>
      </View>
    );
  }
}

CBarLavelChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontFamily: PropTypes.any,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  borderRadius: PropTypes.number,
  XAxisColor: PropTypes.string,
  legendColor: PropTypes.string,
  data: PropTypes.array,
};

CBarLavelChart.defaultProps = {
  height: 300,
  width: 350,
  backgroundColor: '#151A23',
  fontFamily: '',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  borderRadius: 0,
  XAxisColor: '#fff',
  legendColor: '#fff',
  data: [],
};
