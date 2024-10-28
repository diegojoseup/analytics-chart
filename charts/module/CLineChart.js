import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Platform,
  Text as RText,
  TouchableOpacity,
} from 'react-native';
import CLineChartAnim from './CLineChartAnim';

import {
  Svg,
  G,
  LinearGradient,
  Defs,
  Stop,
  Text,
  Rect,
  Circle,
  Polygon,
  Line,
  Path,
} from 'react-native-svg';

export default class CLineChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectPosition: null,
      selectPositionsCircles: null,
      selectedRC: [],
      tempSelectedRC: [],
      openSelector: false,
    };
    this.positions = [];
  }
  componentDidCatch(e) {}

  getDDLWidth(text) {
    const rectWidth = text.length * 10 + 25;
    return rectWidth;
  }

  truncateText(text, maxLength = 12) {
    if (
      new String(text || '').startsWith('Select') ||
      new String(text || '').startsWith('Selected')
    ) {
      maxLength = 12;
    }
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  getDDLText() {
    let text = '';
    if (this.state?.selectedRC?.length == 0) {
      text = 'Select';
    } else if (this.state?.selectedRC?.length == 1) {
      text = this.props.data?.legend[this.state?.selectedRC[0]].label;
    } else {
      text = `Selected (${this.state?.selectedRC?.length})`;
    }

    return this.truncateText(text);
  }

  render() {
    const _data =
      this.props.data?.legend && Object.values(this.props.data?.legend);
    const height = this.props.height,
      width = this.props.width;
    let dataLength = [];
    const _maxValue = Math.max(
      ...(_data
        ?.filter((_, inx) =>
          this.state.selectedRC?.length > 0
            ? this.state.selectedRC.includes(inx)
            : true,
        )
        ?.map(item => {
          const _values = item.values;
          dataLength.push(_values.length);
          return _values;
        })
        .flat(2) || []),
    );
    dataLength = Math.max(...dataLength);

    //////
    const _wdth = width - 40;
    const chartHeight = height - 105;
    const linePart = this.props.data?.legend?.length > 0 ? this.props.lavel : 0;
    const eachWdth = 42;
    const paddingLeft = 20;
    const X1Legend = 40;
    const lineWidth = eachWdth * (dataLength - 1);
    const _chartWidth = lineWidth < _wdth ? _wdth : lineWidth;

    const legendWidth = 90;
    const legendLength =
      (this.props.data?.legend &&
        this.props.data?.legend?.filter((itm, inx) =>
          this.state.selectedRC.includes(inx),
        ).length) ||
      0;

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
          //paddingTop: 10,
        }}>
        <View
          style={{
            height: 0,
            flexDirection: 'row',
            width: _chartWidth + 5,
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: _chartWidth - 110,
              height: 40,
              zIndex: 2,
              overflow: 'hidden',
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Svg
                pointerEvents={Platform.OS === 'android' && 'box-none'}
                style={{
                  height: 40,
                  width: legendWidth * legendLength,
                }}>
                <G x={15} y={28}>
                  {_data
                    ?.filter((itm, inx) => this.state.selectedRC.includes(inx))
                    ?.map((item, inx) => (
                      <G key={inx}>
                        <Defs>
                          <LinearGradient
                            id={`paths${item?.label}`}
                            x1="0"
                            y1="0"
                            x2="45%"
                            y2="45%"
                            gradientTransform="rotate(0)">
                            {item?.gradientColor
                              ? item.gradientColor?.map(
                                  (_color, inx) => (
                                    <Stop
                                      key={inx}
                                      offset={`${inx == 0 && item.gradientColor?.length>1 ? 0 : 100}%`}
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
          <Svg
            pointerEvents={Platform.OS === 'android' && 'box-none'}
            style={{
              height: 40,
              width: 110,
              position: 'absolute',
              right: 0,
              top: 0,
              width: 110,
              zIndex: 2,
            }}>
            <G
              onPress={() => {
                if (this.state.openSelector) {
                  this.setState({
                    ...this.state,
                    selectedRC: this.state.tempSelectedRC,
                    openSelector: false,
                  });
                } else {
                  this.setState({
                    ...this.state,
                    openSelector: !this.state.openSelector,
                  });
                }
              }}>
              <Text
                x={12}
                y={28}
                fill={this.props.dropdownColor}
                textAnchor={'start'}
                alignmentBaseline={'baseline'}
                fillRule={Platform.OS == 'android' ? 'evenodd' : 'nonzero'}
                fontWeight={'bold'}
                style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
                {this.truncateText(this.getDDLText(), 8)}
              </Text>
              <Rect
                width={110}
                height={30}
                y={10}
                rx={7}
                ry={7}
                fill={this.props.dropdownFillColor}></Rect>
              <Path
                y={20}
                x={110 - 30}
                d="M0,0 L8,8 16 0"
                fill="transparent"
                stroke={this.props.dropdownColor}
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </G>
          </Svg>
          {this.state.openSelector && (
            <View
              style={{
                backgroundColor: '#ffff',
                height:
                  _data?.length > 5 ? 6 * 30 + 10 : _data?.length * 30 + 10,
                width: 150,
                padding: 5,
                borderRadius: 5,
                position: 'absolute',
                right: 0,
                top: 45,
              }}>
              <ScrollView>
                {/* <TouchableOpacity
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(1,1,1,.3)',
                    width: '100%',
                  }}
                  onPress={() => {
                    this.setState({
                      ...this.state,
                      selectedRC: [],
                      openSelector: false,
                      tempSelectedRC: [],
                    });
                  }}>
                  <RText
                    style={{
                      color: 'black',
                      fontFamily: this.props.fontFamily,
                      fontWeight: '700',
                      letterSpacing: 0.5,
                      fontSize: 11,
                    }}
                    numberOfLines={1}>
                    All
                  </RText>
                </TouchableOpacity> */}
                {_data?.map((item, inx) => (
                  <TouchableOpacity
                    key={inx}
                    style={{
                      height: 30,
                      alignItems: 'center',
                      borderBottomWidth: _data?.length - 1 == inx ? 0 : 1,
                      borderBottomColor: 'rgba(1,1,1,.3)',
                      width: '100%',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      const _tempIDS = [...this.state.tempSelectedRC];
                      console.log(_tempIDS);
                      if (_tempIDS.includes(inx)) {
                        const _nx = _tempIDS.findIndex(item => item == inx);
                        if (_nx != -1) {
                          _tempIDS.splice(_nx, 1);
                        }
                      } else {
                        _tempIDS.push(inx);
                      }
                      this.setState({...this.state, tempSelectedRC: _tempIDS});
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: this.state.tempSelectedRC.includes(inx)
                          ? item.gradientColor[0]
                          : 'transparent',
                        borderColor: item.gradientColor[0],
                        borderWidth: this.state.tempSelectedRC.includes(inx)
                          ? 0
                          : 1,
                        marginRight: 5,
                        borderRadius: 2,
                      }}></View>
                    <RText
                      style={{
                        color: 'black',
                        fontFamily: this.props.fontFamily,
                        fontWeight: '700',
                        letterSpacing: 0.5,
                        fontSize: 11,
                      }}
                      numberOfLines={1}>
                      {item?.label || ''}
                    </RText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
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
                style={{height: height, width: _chartWidth}}>
                <Defs>
                  {_data?.map((item, inx2) => (
                    <LinearGradient
                      key={inx2}
                      id={`paths${item?.label}`}
                      x1="0"
                      y1="0"
                      x2="45%"
                      y2="45%"
                      gradientTransform="rotate(0)">
                      {item?.gradientColor
                        ? item.gradientColor?.map(
                            (_color, inx) => (
                              <Stop
                                key={inx}
                                offset={`${inx == 0 && item.gradientColor?.length>1 ? 0 : 100}%`}
                                stopColor={_color}
                                stopOpacity="1"
                              />
                            ),
                          )
                        : null}
                    </LinearGradient>
                  ))}
                </Defs>
                {linePart > 0 ? (
                  <>
                    <G
                      y={
                        height -
                        (48 + (chartHeight / linePart) * (linePart + 1))
                      }
                      x={10}>
                      {new Array(linePart).fill('0').map((_, inx) => (
                        <G y={1} key={inx}>
                          <Rect
                            x={0}
                            y={(chartHeight / linePart) * (inx + 1) + 2}
                            key={inx}
                            width={_chartWidth}
                            height={0.5}
                            opacity={0.1}
                            fill={this.props.lavelLineColor}
                          />
                        </G>
                      ))}
                    </G>
                    <G x={10} y={58 + (chartHeight / linePart) * linePart + 2}>
                      <Rect
                        width={_chartWidth}
                        height={0.5}
                        opacity={0.1}
                        fill={this.props.lavelLineColor}
                      />
                    </G>
                  </>
                ) : null}

                <G x={10}>
                  {_data?.map((item, inx) => {
                    if (this.state.selectedRC.includes(inx))
                      return (
                        <CLineChartAnim
                          key={inx}
                          index={inx}
                          maxValue={_maxValue}
                          totalL={item?.values?.length || 0}
                          data={item?.values}
                          width={eachWdth}
                          dataLength={dataLength}
                          height={height}
                          legendLable={this.props.legendUnit}
                          setPositions={pos => {
                            this.positions[inx] = pos;
                          }}
                          resetPosition={() => {
                            this.setState({
                              ...this.state,
                              selectPosition: null,
                              selectPositionsCircles: null,
                            });
                          }}
                          {...item}
                        />
                      );
                  })}
                </G>
                <G>
                  {this.props.data?.XAsxisLabel?.map((itm, i) => (
                    <G
                      key={i}
                      y={
                        height -
                        15 -
                        (this.state.selectPositionsCircles == i ? 10 : 0)
                      }
                      onPress={() => {
                        this.setState({
                          ...this.state,
                          selectPosition: this.positions[0][i],
                          selectPositionsCircles: i,
                        });
                      }}>
                      <Rect
                        height={25}
                        width={(i + 1) * eachWdth}
                        y={-15}
                        x={i * eachWdth}
                        fill={'transparent'}></Rect>
                      <Text
                        key={i}
                        x={i * eachWdth}
                        fill={this.props.XAxisColor}
                        textAnchor={'start'}
                        alignmentBaseline={'baseline'}
                        fontWeight={'bold'}
                        fillRule={
                          Platform.OS == 'android' ? 'evenodd' : 'nonzero'
                        }
                        style={{
                          fontFamily: this.props.fontFamily,
                          fontSize: 10,
                        }}
                        height={20}>
                        {itm}
                      </Text>
                      {this.state.selectPositionsCircles == i && (
                        <Polygon
                          y={8}
                          x={i * eachWdth + 4}
                          points="8,0 16,10 0,10"
                          fill="transparent"
                          stroke={this.props.selectdPoliColor}
                          strokeWidth={2}
                          strokeLinejoin="round"
                        />
                      )}
                    </G>
                  ))}
                  {/* seleted line */}
                  {this.state.selectPosition != null && (
                    <G y={60} x={10}>
                      <Line
                        x1={this.state.selectPosition.x}
                        y1="0"
                        x2={this.state.selectPosition.x}
                        y2={chartHeight}
                        width={2}
                        height={chartHeight}
                        fill={`transparent`}
                        stroke={this.props.selectdLineColor}
                        strokeWidth={1}
                        strokeDasharray={[5]}
                        // strokeDashoffset={10}
                      />
                    </G>
                  )}
                  <G y={60} x={10}>
                    {this.state.selectPositionsCircles != null
                      ? Object.values(_data).map((_, _i) => this.state.selectedRC.includes(_i) && (
                          <Circle
                            key={_i}
                            x={
                              this.positions[_i][
                                this.state.selectPositionsCircles
                              ].x
                            }
                            y={
                              this.positions[_i][
                                this.state.selectPositionsCircles
                              ].y
                            }
                            r={4}
                            stroke={'transparent'}
                            strokeWidth={2}
                            fill={`url(#paths${_data[_i].label})`}
                          />
                        ))
                      : null}
                  </G>
                </G>
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
              <G y={height - (50 + (chartHeight / linePart) * (linePart + 1))}>
                {new Array(linePart).fill('0').map((_, inx) => (
                  <G y={1} key={inx}>
                    <Text
                      x={0}
                      y={(chartHeight / linePart) * (inx + 1) + 2}
                      fill={this.props.YAxisColor}
                      textAnchor={'start'}
                      alignmentBaseline={'baseline'}
                      fillRule={
                        Platform.OS == 'android' ? 'evenodd' : 'nonzero'
                      }
                      fontWeight={'bold'}
                      style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
                      {isNaN(
                        parseInt(
                          Math.abs((inx - linePart) * (_maxValue / linePart)),
                        ),
                      )
                        ? `0${this.props.legendUnit}`
                        : `${parseInt(
                            Math.abs((inx - linePart) * (_maxValue / linePart)),
                          )}${this.props.legendUnit}`}
                    </Text>
                  </G>
                ))}
              </G>
              <G y={58 + (chartHeight / linePart) * linePart + 2}>
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

CLineChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  lavel: PropTypes.number,
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

CLineChart.defaultProps = {
  height: 300,
  width: 350,
  backgroundColor: '#151A23',
  lavel: 7,
  fontFamily: '',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  legendUnit: '',
  borderRadius: 0,
  XAxisColor: '#fff',
  YAxisColor: '#fff',
  legendColor: '#fff',
  lavelLineColor: '#fff',
  selectdPoliColor: '#484848',
  selectdLineColor: '#fff',
  dropdownColor: '#fff',
  dropdownFillColor: '#fff',
};
