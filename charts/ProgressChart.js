import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import CProgressChart from './module/CProgressChart';
function ProgressChart(props) {
  return (
    <View
      style={{
        width: props.radius,
        marginBottom: props.marginBottom,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
      }}>
      <CProgressChart
        size={props.radius}
        width={props.radius - props.innerRadius}
        backgroundWidth={props.radius - props.innerRadius}
        fill={props.progressPercent}
        backgroundColor={props.unFillColor}
        gradientColor={props.fillColor}
        arcSweepAngle={props.radius}
        rotation={props.radius}
        lineCap="round"
        duration={props.animationDuration}>
        {props.children}
      </CProgressChart>
    </View>
  );
}

ProgressChart.propTypes = {
  radius: PropTypes.number,
  innerRadius: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  progressPercent: PropTypes.number,
  animationDuration: PropTypes.number,
  unFillColor: PropTypes.string,
  fillColor: PropTypes.array,
};

ProgressChart.defaultProps = {
  radius: 260,
  innerRadius: 215,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  progressPercent: 0,
  animationDuration: 2000,
  unFillColor: '#ffffff',
  fillColor: [],
};

export default ProgressChart;
