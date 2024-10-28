import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import CBarChartAnim from './CBarChartAnim';

import {Svg} from 'react-native-svg';

export default class CSingleHLine extends React.PureComponent {
  render() {
    const width = this.props.width;
    const _data = this.props.data;
    const dataLength = this.props.data?.length || 0;
    const _maxValue = Math.max(...(_data?.map(item => item.value) || []));

    const eachHeight = 60;
    const totalHeight = eachHeight * (dataLength + 1);

    return (
      <View
        pointerEvents={'box-none'}
        style={{
          width: width,
          height: totalHeight + 5,
          backgroundColor: this.props.backgroundColor,
          borderRadius: this.props.borderRadius,
          marginBottom: this.props.marginBottom,
          marginTop: this.props.marginTop,
          marginLeft: this.props.marginLeft,
          marginRight: this.props.marginRight,
        }}>
        {width > 0 && (
          <Svg
            pointerEvents={Platform.OS === 'android' && 'box-none'}
            style={{height: totalHeight, width: width}}>
            {_data?.map((item, inx) => (
              <CBarChartAnim
                key={inx}
                index={inx}
                maxValue={_maxValue}
                width={width}
                height={eachHeight}
                fontFamily={this.props.fontFamily}
                legendColor={this.props.legendColor}
                {...item}
              />
            ))}
          </Svg>
        )}
      </View>
    );
  }
}

CSingleHLine.propTypes = {
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  data: PropTypes.array,
  fontFamily: PropTypes.any,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  borderRadius: PropTypes.number,
  legendColor: PropTypes.string,
};

CSingleHLine.defaultProps = {
  width: 350,
  backgroundColor: '#151A23',
  data: [],
  fontFamily: '',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  borderRadius: 20,
  legendColor: '#fff',
};
