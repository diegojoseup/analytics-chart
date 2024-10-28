import React, {PureComponent} from 'react';
import {Easing, Animated, Platform} from 'react-native';
import {
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  Text,
  Rect,
  Circle,
  ClipPath,
} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

class CLineChartAnim extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
    };
    this.positions = [];
  }

  animate() {
    const animation = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    });
    this.props.resetPosition();
    animation.start();

    return animation;
  }

  reAnimate() {
    this.setState(
      {
        animatedValue: new Animated.Value(0),
      },
      () => this.animate(),
    );
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.animate().stop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data || prevProps.maxValue !== this.props.maxValue) {
      this.reAnimate();
    }
  }

  getPoints(tr) {
    this.positions = [];
    const chartHeight = this.props.height - 105;
    let _d = this.props.data;
    const _maxValue = this.props.maxValue;

    if (chartHeight < _maxValue) {
      const _stValue = (chartHeight / _maxValue) * 100;
      _d = _d.map(itm => (itm * _stValue) / 100);
    } else {
      _d = _d.map(itm => {
        const _perc = (itm / _maxValue) * 100;
        return (chartHeight * _perc) / 100;
      });
    }

    let _dValue = ``;
    let preY = 0;
    let preX = 0;
    let firstY = 0;
    _d?.map((_, inx) => {
      const eachWidth = inx * this.props.width;
      const excValue = chartHeight - _ + 2;

      if (inx == 0) {
        _dValue += `M0 ${excValue} `;
        preY = excValue;
        firstY = excValue;
        this.selectPosition = {
          x: 0,
          y: excValue,
        };
        this.positions.push({
          x: 0,
          y: excValue,
        });
      } else {
        if (preX == 0) {
          _dValue += `C${0} ${preY} ${
            eachWidth - 30
          } ${excValue} ${eachWidth} ${excValue} `;
        } else {
          _dValue += `C${preX + 30} ${preY} ${
            eachWidth - 30
          } ${excValue} ${eachWidth} ${excValue} `;
        }
        this.positions.push({
          x: eachWidth,
          y: excValue,
        });
        preY = excValue;
        preX = eachWidth;
      }
    });

    this.props.setPositions(this.positions);
    if (tr == true) {
      return _dValue;
    }
    if (tr == false) {
      _dValue += `L${preX} ${preY} ${preX} ${chartHeight} 0 ${chartHeight} 0 ${firstY}`;
      return _dValue;
    }
  }

  render() {
    const chartHeight = this.props.height;
    //
    const {animatedValue} = this.state;

    const interpolatedWidth = animatedValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, this.props.width * this.props.dataLength],
    });

    return (
      <G>
        <Defs>
          <LinearGradient
            id={`legd${this.props.index}`}
            x1="-2%"
            y1="0"
            x2="0%"
            y2="100%"
            gradientTransform="rotate(0)">
            {this.props.gradientColor
              ? this.props.gradientColor?.map((_color, inx) => (
                  <Stop
                    key={inx}
                    offset={`${inx == 0 && this.props.gradientColor?.length>1 ? 0 : 100}%`}
                    stopColor={_color}
                    stopOpacity={`${inx == 0 ? 0.2 : 0}`}
                  />
                ))
              : null}
          </LinearGradient>
          <ClipPath id={`ctb${this.props.index}`}>
            <AnimatedRect
              x="0"
              y="0"
              width={interpolatedWidth}
              height={chartHeight}
              fill="blue"
            />
          </ClipPath>
        </Defs>

        <G y={60}>
          <AnimatedPath
            d={this.getPoints(false)}
            fill={`url(#legd${this.props.index})`}
            strokeWidth={0}
            strokeLinecap="round"
            clipRule={Platform.OS == 'android' ? 'nonzero' : 'evenodd'}
            clipPath={`url(#ctb${this.props.index})`}
          />
          <AnimatedPath
            d={this.getPoints(true)}
            stroke={this.props.gradientColor[0]}
            fill={'transparent'}
            strokeWidth={2}
            strokeLinecap="round"
            clipRule={Platform.OS == 'android' ? 'nonzero' : 'evenodd'}
            clipPath={`url(#ctb${this.props.index})`}
          />
        </G>
      </G>
    );
  }
}

export default CLineChartAnim;
