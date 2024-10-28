import React from 'react';
import CLineChart from './module/CLineChart';
import PropTypes from 'prop-types';

function LineChart(props) {
  return <CLineChart {...props} />;
}

LineChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  lavel: PropTypes.number,
  data: PropTypes.object,
  fontFamily: PropTypes.any,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  legendUnit: PropTypes.string,
  borderRadius: PropTypes.number,
  XAxisColor: PropTypes.string,
  YAxisColor: PropTypes.string,
  legendColor: PropTypes.string,
  lavelLineColor: PropTypes.string,
  selectdPoliColor: PropTypes.string,
  selectdLineColor: PropTypes.string,
  dropdownColor: PropTypes.string,
  dropdownFillColor: PropTypes.string,
};

LineChart.defaultProps = {
  height: 300,
  width: 350,
  backgroundColor: '#151A23',
  lavel: 7,
  data: [],
  fontFamily: '',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  legendUnit: '',
  borderRadius: 20,
  XAxisColor: '#fff',
  YAxisColor: '#fff',
  legendColor: '#fff',
  lavelLineColor: '#fff',
  selectdPoliColor: '#484848',
  selectdLineColor: '#fff',
  dropdownColor: '#fff',
  dropdownFillColor: '#fff',
};

export default LineChart;
