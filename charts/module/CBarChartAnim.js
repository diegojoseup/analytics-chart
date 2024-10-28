import React, {PureComponent} from 'react';
import {Easing, Animated, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {G, Defs, LinearGradient, Stop, Text, Rect} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

class CBarChartAnim extends PureComponent {
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
      outputRange: [
        0,
        this.props.width - this.props.height / 2 - this.props.height,
      ],
    });
    return (
      <G x={this.props.height / 2} y={-5}>
        <Defs>
          <LinearGradient
            id={`path${this.props.index}`}
            x1="0"
            y1="0"
            x2="90%"
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
        <G y={(this.props.index + 1) * this.props.height}>
          <AnimatedRect
            x={0}
            y={15}
            height={12}
            rx={8}
            ry={8}
            width={interpolatedHeight}
            fill={
              this.props.gradientColor
                ? `url(#path${this.props.index})`
                : this.props.svg?.fill
            }
          />
          <Text
            fill={this.props.legendColor}
            textAnchor={'start'}
            alignmentBaseline={'baseline'}
            fillRule={Platform.OS=="android"?"evenodd": 'nonzero'}
            style={{fontFamily: this.props.fontFamily, fontSize: 14}}>
            {this.props.label}
          </Text>
        </G>
      </G>
    );
  }
}

CBarChartAnim.propTypes = {
  gradientColor: PropTypes.array,
};

CBarChartAnim.defaultProps = {
  gradientColor: []
};

export default CBarChartAnim;
