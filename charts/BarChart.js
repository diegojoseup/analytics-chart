import React from 'react';
import PropTypes from 'prop-types';
import CBarChart from './module/CBarChart';
function BarChart(props) {
  return <CBarChart {...props} />;
}

BarChart.propTypes = {
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

BarChart.defaultProps = {
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

export default BarChart;
