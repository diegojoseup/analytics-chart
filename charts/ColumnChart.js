import React from "react";
import CColumnChart from "./module/CColumnChart";
import PropTypes from 'prop-types';

function ColumnChart(props) {
  return <CColumnChart {...props} />;
}

ColumnChart.propTypes = {
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
};

ColumnChart.defaultProps = {
  height: 300,
  width: 350,
  backgroundColor: '#151A23',
  lavel: 7,
  data: null,
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
};

export default ColumnChart;