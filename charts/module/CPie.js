import React, {PureComponent} from 'react';
import {View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import * as shape from './shape';
import Svg, {
  G,
  Defs,
  LinearGradient,
  Stop,
  Text,
  Circle,
} from 'react-native-svg';

import CPieAnimPath from './CPieAnimPath';

class CPie extends PureComponent {
  _calculateRadius(arg, max, defaultVal) {
    if (typeof arg === 'string') {
      return (arg.split('%')[0] / 100) * max;
    } else if (arg) {
      return arg;
    } else {
      return defaultVal;
    }
  }

  render() {
    const {
      data,
      dataPoints,
      innerRadius,
      outerRadius,
      labelRadius,
      padAngle,
      style,
      sort,
      valueAccessor,
      children,
      startAngle,
      endAngle,
    } = this.props;

    const height = this.props.height;
    const width = this.props.width;

    if (!data && dataPoints) {
      console.log('No points found');
      return null;
    }

    if (data?.length === 0) {
      return <View style={style} />;
    }

    const maxRadius = Math.min(width, height) / 2;
    const maxValue =Math.max(...(data && data?.length > 0 ? data?.map(item=>item.value) :[0]))

    if (Math.min(...(data?.map(obj => valueAccessor({item: obj})) || [])) < 0) {
      console.error("don't pass negative numbers");
    }

    const _outerRadius = this._calculateRadius(
      outerRadius,
      maxRadius,
      maxRadius,
    );
    const _innerRadius = this._calculateRadius(innerRadius, maxRadius, 0);
    const _labelRadius = this._calculateRadius(
      labelRadius,
      maxRadius,
      _outerRadius,
    );

    if (outerRadius > 0 && _innerRadius >= outerRadius) {
      console.warn('innerRadius is equal to or greater than outerRadius');
    }

    const arcs = data?.map(item => {
      const arc = shape
        .arc()
        .outerRadius(_outerRadius)
        .innerRadius(_innerRadius)
        .padAngle(padAngle); // Angle between sections

      item.arc &&
        Object.entries(item.arc).forEach(([key, value]) => {
          if (typeof arc[key] === 'function') {
            if (typeof value === 'string') {
              arc[key]((value.split('%')[0] / 100) * _outerRadius);
            } else {
              arc[key](value);
            }
          }
        });
      return arc;
    });

    const labelArcs = data?.map((item, index) => {
      if (labelRadius) {
        return shape
          .arc()
          .outerRadius(_labelRadius)
          .innerRadius(_labelRadius)
          .padAngle(padAngle);
      }
      return arcs[index];
    });

    const pieSlices =
      data?.length > 0 &&
      shape
        .pie()
        .value(d => valueAccessor({item: d}))
        .sort(sort)
        .startAngle(startAngle)
        .endAngle(endAngle)(data);

    const slices =
      data?.length > 0 &&
      pieSlices.map((slice, index) => ({
        ...slice,
        pieCentroid: arcs[index].centroid(slice),
        labelCentroid: labelArcs[index].centroid(slice),
      }));

    const extraProps = {
      width,
      height,
      data,
      slices,
    };

    const dataLength = data?.length || 0;
    const legendH = height - 30;
    const Gy = legendH / dataLength / 2 + 15;

    return (
      <View pointerEvents={'box-none'} style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '',
          }}>
          <Svg
            pointerEvents={Platform.OS === 'android' && 'box-none'}
            style={{
              height,
              width: this.props.chartWidth - width,
            }}>
            <G y={isFinite(Gy) ? Gy : 0}>
              {data &&
                data?.map((_, inx) => (
                  <G key={inx} y={(legendH / dataLength) * inx} x={10}>
                    <Defs>
                      <LinearGradient
                        id={`legd${inx}`}
                        x1="0"
                        y1="0"
                        x2="60%"
                        y2="60%"
                        gradientTransform="rotate(0)">
                        {_?.gradientColor
                          ? _?.gradientColor?.map(
                              (_color, inx) => (
                                <Stop
                                  key={inx}
                                  offset={`${inx == 0 ? 0 : 100}%`}
                                  stopColor={_color}
                                  stopOpacity="1"
                                />
                              ),
                            )
                          : null}
                      </LinearGradient>
                    </Defs>
                    <Circle
                      x={10}
                      y={
                        -5 +
                        (_?.legendSubTitle && _?.legendSubTitle != '' ? 0 : 5)
                      }
                      r={5}
                      fill={
                        _.gradientColor
                          ? `url(#legd${inx})`
                          : this.props.svg?.fill
                      }
                    />
                    {_?.legendTitle && _?.legendTitle != '' && (
                      <Text
                        x={25}
                        y={
                          -0.5 +
                          (_?.legendSubTitle && _?.legendSubTitle != '' ? 0 : 5)
                        }
                        fill={this.props.legendColor}
                        textAnchor={'start'}
                        alignmentBaseline={'baseline'}
                        fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
                        style={{
                          fontFamily: this.props.fontFamily,
                          fontSize: 18,
                        }}>
                        {_?.legendTitle}
                      </Text>
                    )}
                    {_?.legendSubTitle && _?.legendSubTitle != '' && (
                      <Text
                        x={25}
                        y={20}
                        fill={this.props.legendColor}
                        textAnchor={'start'}
                        alignmentBaseline={'baseline'}
                        fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
                        style={{
                          fontFamily: this.props.fontFamily,
                          fontSize: 10,
                        }}>
                        {_?.legendSubTitle}
                      </Text>
                    )}
                  </G>
                ))}
            </G>
          </Svg>
        </View>
        {height > 0 && width > 0 && (
          <Svg
            pointerEvents={Platform.OS === 'android' && 'box-none'}
            style={{height, width}}>
            <G x={width / 2} y={height / 2}>
              {React?.Children?.map(children, child => {
                if (child && child.props.belowChart) {
                  return React.cloneElement(child, extraProps);
                }
                return null;
              })}
              {pieSlices &&
                pieSlices?.map((slice, index) => {
                  const {key, svg} = data[index];
                  const gradientColor = data[index]?.gradientColor;
                  return (
                    <CPieAnimPath
                      key={key}
                      {...svg}
                      d={arcs[index](slice)}
                      gradientColor={gradientColor}
                      index={index}
                      totalCount={pieSlices?.length || 0}
                      maxValue={maxValue}
                      value={data[index]?.value || 0}
                      animatedValue={this.animatedValue}>
                      {React.Children.map(children, child => {
                        if (child && !child.props.belowChart) {
                          return React.cloneElement(child, extraProps);
                        }
                        return null;
                      })}
                    </CPieAnimPath>
                  );
                })}
            </G>
          </Svg>
        )}
      </View>
    );
  }
}

CPie.propTypes = {
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padAngle: PropTypes.number,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  style: PropTypes.any,
  sort: PropTypes.func,
  valueAccessor: PropTypes.func,

  //
  height: PropTypes.number,
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
  percentageColor: PropTypes.string,
};

CPie.defaultProps = {
  width: 100,
  height: 100,
  padAngle: 0.05,
  startAngle: 0,
  endAngle: Math.PI * 2,
  valueAccessor: ({item}) => item.value,
  innerRadius: '50%',
  //
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
  borderRadius: 20,
  legendColor: '#fff',
  percentageColor: '#fff',
};

export default CPie;
