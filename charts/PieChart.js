import React from 'react';
import {Platform, View} from 'react-native';
import {Text} from 'react-native-svg';
import _PieChart from './module/CPie';
import PropTypes from 'prop-types';

function PieChart(props) {
  const data = props.data || [];
  const shapeData = _data => {
    return _data.map((item, index) => {
      return {
        key: index,
        value: item.value,
        arc: {cornerRadius: 7},
        gradientColor: item.color,
        legendTitle: item.legendTitle,
        legendSubTitle: item.legendSubTitle,
      };
    });
  };

  const _maxValue = data
    ?.map(itm => itm.value)
    .reduce((partialSum, a) => partialSum + a, 0);
  const pieChartDataRounded = shapeData(data);
  const Labels = ({slices, h, w}) => {
    return slices.map((slice, index) => {
      const {_CT, pieCentroid, data} = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0] - 5}
          y={pieCentroid[1]}
          fill={props.percentageColor}
          textAnchor={'middle'}
          alignmentBaseline={'baseline'}
          fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
          fontWeight={'bold'}
          style={{fontFamily: props.percentageFontFamily, fontSize: 10}}>
          {parseInt((data.value / _maxValue) * 100)}%
        </Text>
      );
    });
  };

  const chartWidth = props.width;
  const radius = (chartWidth * 42) / 100;
  const innerRadius = (radius * 20) / 100;
  const outerRadius = (radius * 40) / 100;

  const dataLength = data?.length || 0;
  const chartHeight =
    dataLength *
    (data[0]?.legendSubTitle && data[0]?.legendSubTitle != ''
      ? radius / dataLength + 30
      : radius / dataLength + 20);

  return dataLength > 0 ? (
    <View
      style={{
        width: chartWidth,
        height: chartHeight,
        overflow: 'hidden',
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        marginBottom: props.marginBottom,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
      }}>
      <_PieChart
        {...props}
        data={pieChartDataRounded}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        labelRadius={outerRadius}
        width={radius}
        height={chartHeight}
        chartWidth={chartWidth}
        animate={true}
        animationDuration={4000}>
        <Labels />
      </_PieChart>
    </View>
  ) : null;
}

PieChart.propTypes = {
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  data: PropTypes.array,
  fontFamily: PropTypes.any,
  percentageFontFamily: PropTypes.any,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  borderRadius: PropTypes.number,
  legendColor: PropTypes.string,
  percentageColor: PropTypes.string,
};

PieChart.defaultProps = {
  width: 350,
  backgroundColor: '#151A23',
  lavel: 7,
  data: [],
  fontFamily: '',
  percentageFontFamily: '',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  borderRadius: 20,
  legendColor: '#fff',
  percentageColor: '#fff',
};
export default PieChart;
