import React from "react";
import PropTypes from "prop-types";
import { Animated, Easing } from "react-native";
import CProgressChartAnim from "./CProgressChartAnim";
const _CProgressChartAnim = Animated.createAnimatedComponent(CProgressChartAnim);

export default class CProgressChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill),
    };
    if (props.onFillChange) {
      this.state.fillAnimation.addListener(({ value }) =>
        props.onFillChange(value)
      );
    }
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill),
      },
      () => this.animate(toVal, dur, ease)
    );
  }

  animate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    const delay = this.props.delay;

    const anim = Animated.timing(this.state.fillAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
      delay,
    });
    anim.start();

    return anim;
  }

  animateColor() {
    if (!this.props.tintColorSecondary) {
      return this.props.tintColor;
    }

    const tintAnimation = this.state.fillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.tintColor, this.props.tintColorSecondary],
    });

    return tintAnimation;
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <_CProgressChartAnim
        {...other}
        fill={this.state.fillAnimation}
        tintColor={this.animateColor()}
      />
    );
  }
}

CProgressChart.propTypes = {
  ...CProgressChartAnim.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  useNativeDriver: PropTypes.bool,
  delay: PropTypes.number,
};

CProgressChart.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  useNativeDriver: false,
  delay: 0,
};
