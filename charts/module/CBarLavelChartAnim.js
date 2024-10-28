import React, {PureComponent} from 'react';
import {Easing, Animated, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {G, Defs, LinearGradient, Stop, Text, Rect} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedG = Animated.createAnimatedComponent(G);

class CBarLavelChartAnim extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      animationCompleted: false,
    };
  }

  animate() {
    const animation = Animated.timing(this.state.animatedValue, {
      toValue: this.props.value,
      duration: 1500,
      delay: this.props.index * 100,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    });
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
    if (
      prevProps.value !== this.props.value ||
      prevProps.maxValue !== this.props.maxValue
    ) {
      this.reAnimate();
    }
  }

  render() {
    const {animatedValue} = this.state;
    const interpolatedHeight = animatedValue.interpolate({
      inputRange: [0, this.props.maxValue],
      outputRange: [0, this.props.height - 100],
    });
    const interpolatedY = animatedValue.interpolate({
      inputRange: [0, this.props.maxValue],
      outputRange: [this.props.height - 100, 0],
    });
    return (
      <G y={40} x={15}>
        <Defs>
          <LinearGradient
            id={`path${this.props.index}`}
            x1="0"
            y1="0"
            x2="45%"
            y2="45%"
            gradientTransform="rotate(0)">
            {this.props.gradientColor
              ? this.props.gradientColor?.map((_color, inx) => (
                  <Stop
                    key={inx}
                    offset={`${inx == 0 ? 0 : 100}%`}
                    stopColor={_color}
                    stopOpacity="1"
                  />
                ))
              : null}
          </LinearGradient>
        </Defs>
        <AnimatedRect
          x={this.props.width * this.props.index}
          y={-20}
          width="15"
          rx="9"
          ry="9"
          height={this.props.height - 60}
          style={{
            opacity: 0.15,
          }}
          fill={
            this.props.gradientColor
              ? `url(#path${this.props.index})`
              : this.props.svg?.fill
          }
        />
        <G y={20}>
          <AnimatedRect
            x={this.props.width * this.props.index}
            y={interpolatedY}
            width="15"
            rx="9"
            ry="9"
            height={interpolatedHeight}
            fill={
              this.props.gradientColor
                ? `url(#path${this.props.index})`
                : this.props.svg?.fill
            }
          />
        </G>
        <AnimatedG y={interpolatedY}>
          <Text
            x={this.props.width * this.props.index + 5}
            fill={this.props.legendColor}
            textAnchor={'middle'}
            alignmentBaseline={'baseline'}
            fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
            fontWeight={'bold'}
            style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
            {this.props.valueLabel}
          </Text>
        </AnimatedG>
        <G y={0}>
          <Text
            x={this.props.width * this.props.index}
            y={this.props.height - 60}
            fill={this.props.XAxisColor}
            textAnchor={'start'}
            alignmentBaseline={'baseline'}
            fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
            fontWeight={'bold'}
            style={{fontFamily: this.props.fontFamily, fontSize: 10}}>
            {this.props.label}
          </Text>
        </G>
      </G>
    );
  }
}

CBarLavelChartAnim.propTypes = {
  gradientColor: PropTypes.array,
};

CBarLavelChartAnim.defaultProps = {
  gradientColor: []
};

export default CBarLavelChartAnim;
