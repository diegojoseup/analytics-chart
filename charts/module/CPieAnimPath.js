import React, { PureComponent } from "react";
import { Easing, StyleSheet, Animated, Platform } from "react-native";
import {
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG= Animated.createAnimatedComponent(G);

class StrokeFillAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  animate() {
    const perValue=(this.props.value/this.props.maxValue)*100;
    const animationDelay=500 - ((500*perValue)/100)
    const animation = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      delay: animationDelay,
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
      () => this.animate()
    );
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.animate().stop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.d !== this.props.d) {
      this.reAnimate();
    }
  }

  render() {
    const { animatedValue } = this.state;
    const interpolatedRotate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "360deg"],
    });
    const interpolatedOpacity= animatedValue.interpolate({
      inputRange: [0, .9, 1],
      outputRange: [0, 0,1],
    });
    const interpolatedOpacity2= animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <G>
        <Defs>
          <LinearGradient
            id={`path${this.props.index}`}
            x1="0"
            y1="0"
            x2="70%"
            y2="20%"
            gradientTransform="rotate(60)"
          >
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
          <ClipPath id={`pieclip${this.props.index}`}>
            <AnimatedPath
              d={this.props.d}
              fill={"red"}
              style={{ transform: [{ rotate: interpolatedRotate }] }}
            />
          </ClipPath>
        </Defs>
        <AnimatedPath
          d={this.props.d}
          fillOpacity={interpolatedOpacity2}
          fill={
            this.props.gradientColor
              ? `url(#path${this.props.index})`
              : this.props.svg?.fill
          }
          clipRule={Platform.OS=="android" ? 'nonzero' : 'evenodd'}
          //clipPath={`url(#pieclip${this.props.index})`}
          style={{ transform: [{ rotate: interpolatedRotate }],position:'relative',zIndex:100-this.props.index }}
        />
        <AnimatedG opacity={interpolatedOpacity}>
        {this.props.children}
        </AnimatedG>
      </G>
    );
  }
}

export default StrokeFillAnimation;
