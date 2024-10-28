import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Platform} from 'react-native';
import CColumnChartAnim from './CColumnChartAnim';

import {
  Svg,
  Text,
  G,
  LinearGradient,
  Defs,
  Stop,
  Rect,
  Circle,
} from 'react-native-svg';

export default class CColumnChart extends React.PureComponent {
  truncateText(text, maxLength = 12) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  render() {
    const _data = this.props.data?.values;
    const labelX = this.props.data?.labelX;
    const height = this.props.height,
      width = this.props.width;
    const _maxValue = Math.max(
      ...(_data
        ?.map(item => {
          const _values = item.values;
          return _values;
        })
        .flat(2) || []),
    );
    const eachWdth = 9;

    const chartHeight = height - 95;
    const linePart = _data?.length > 0 ? this.props.lavel : 0;
    const _wdth = width - 40;
    const legendCount = _data?.length || 0;

    const paddingLeft = 20;
    const X1Legend = 40;

    const gap = eachWdth * 3;
    const lineWidth =
      (eachWdth * legendCount + 5 * (legendCount - 1) + gap) *
      ((labelX?.length || 1) - 1);
    const _chartWidth =
      lineWidth < _wdth ? _wdth - eachWdth : lineWidth - eachWdth / 2;

      const legendWidth = 90;
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
          paddingLeft: paddingLeft,
        }}>
        <View
          style={{
            height: 0,
            position: 'relative',
            zIndex: 1,
          }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: width-(paddingLeft*2),
              height: 40,
              zIndex: 2,
              overflow: 'hidden',
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Svg
                pointerEvents={Platform.OS === 'android' && 'box-none'}
                style={{
                  height: 35,
                  width: (legendWidth * legendCount)+(15*(legendCount-1)),
                }}>
                <G x={5} y={25}>
                  {_data?.map((item, inx) => (
                    <G key={inx}>
                      <Defs>
                        <LinearGradient
                          id={`paths${item?.label}`}
                          x1="0"
                          y1="0"
                          x2="45%"
                          y2="45%"
                          gradientTransform="rotate(0)">
                          {item.gradientColor
                            ? item.gradientColor?.map(
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
                        x={legendWidth * inx}
                        y={-2.5}
                        r={5}
                        fill={`url(#paths${item?.label})`}
                      />
                      <Text
                        x={legendWidth * inx + 15}
                        y={0}
                        fill={this.props.legendColor}
                        textAnchor={'start'}
                        alignmentBaseline={'baseline'}
                        fillRule={
                          Platform.OS == 'android' ? 'evenodd' : 'nonzero'
                        }
                        fontWeight={'bold'}
                        style={{
                          fontFamily: this.props.fontFamily,
                          fontSize: 10,
                        }}>
                        {this.truncateText(item?.label, 8)}
                      </Text>
                    </G>
                  ))}
                </G>
              </Svg>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: _chartWidth,
            }}>
            {height > 0 && width > 0 && (
              <Svg
                pointerEvents={Platform.OS === 'android' && 'box-none'}
                style={{
                  height: height,
                  width: _chartWidth,
                }}>
                {linePart > 0 && (
                  <>
                    <G
                      y={
                        height -
                        (45 + (chartHeight / linePart) * (linePart + 1))
                      }>
                      {new Array(linePart).fill('0').map((_, inx) => (
                        <Rect
                          x={0}
                          y={(chartHeight / linePart) * (inx + 1) + 1}
                          key={inx}
                          width={_chartWidth}
                          height={0.5}
                          opacity={0.1}
                          fill={this.props.lavelLineColor}
                        />
                      ))}
                    </G>
                    <G y={50 + (chartHeight / linePart) * linePart}>
                      <Rect
                        x={0}
                        width={_chartWidth}
                        height={0.5}
                        opacity={0.1}
                        fill={this.props.lavelLineColor}
                      />
                    </G>
                  </>
                )}
                {_data?.map((item, inx) => (
                  <G key={inx}>
                    <Defs>
                      <LinearGradient
                        id={`paths${item?.label}`}
                        x1="0"
                        y1="0"
                        x2="45%"
                        y2="45%"
                        gradientTransform="rotate(0)">
                        {item.gradientColor
                          ? item.gradientColor?.map(
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
                    <CColumnChartAnim
                      key={inx}
                      index={inx}
                      values={item.values}
                      maxValue={_maxValue}
                      columnCount={_data?.length}
                      width={eachWdth}
                      height={height}
                      legendLable={this.props.legendUnit}
                      gradientColor={`paths${item?.label}`}
                      gap={gap}
                    />
                  </G>
                ))}
                {labelX?.map((_, ky) => (
                  <Text
                    key={ky}
                    x={ky * (eachWdth * _data?.length + gap)}
                    y={height - 25}
                    fill={this.props.XAxisColor}
                    textAnchor={'start'}
                    alignmentBaseline={'baseline'}
                    fillRule={Platform.OS == 'android' ? 'evenodd' : 'nonzero'}
                    fontWeight={'bold'}
                    style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
                    {_}
                  </Text>
                ))}
              </Svg>
            )}
          </ScrollView>
          {height > 0 && width > 0 && linePart > 0 && (
            <Svg
              pointerEvents={Platform.OS === 'android' && 'box-none'}
              style={{
                height: height,
                width: X1Legend,
                marginLeft: 10,
              }}>
              <G y={height - (45 + (chartHeight / linePart) * (linePart + 1))}>
                {new Array(linePart).fill('0').map((_, inx) => (
                  <G y={1} key={inx}>
                    <Text
                      x={0}
                      y={(chartHeight / linePart) * (inx + 1) + 1}
                      fill={this.props.YAxisColor}
                      textAnchor={'start'}
                      alignmentBaseline={'baseline'}
                      fillRule={
                        Platform.OS == 'android' ? 'evenodd' : 'nonzero'
                      }
                      fontWeight={'bold'}
                      style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
                      {parseInt(
                        Math.abs((inx - linePart) * (_maxValue / linePart)),
                      )}
                      {this.props.legendUnit}
                    </Text>
                  </G>
                ))}
              </G>
              <G y={50 + (chartHeight / linePart) * linePart}>
                <Text
                  x={0}
                  fill={this.props.YAxisColor}
                  textAnchor={'start'}
                  alignmentBaseline={'baseline'}
                  fillRule={Platform.OS == 'android' ? 'evenodd' : 'nonzero'}
                  fontWeight={'bold'}
                  style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
                  0{this.props.legendUnit}
                </Text>
              </G>
            </Svg>
          )}
        </View>
      </View>
    );
  }
}

CColumnChart.propTypes = {
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

CColumnChart.defaultProps = {
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
