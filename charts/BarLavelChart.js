import React from 'react';
import PropTypes from 'prop-types';
import CBarLavelChart from './module/CBarLavelChart';
function BarLavelChart(props) {
  return <CBarLavelChart {...props} />;
}

BarLavelChart.propTypes = {
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

BarLavelChart.defaultProps = {
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
  data:[]
};

export default BarLavelChart;
