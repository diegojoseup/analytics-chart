import React, {PureComponent} from 'react';
import {Easing, Animated} from 'react-native';
import {G, Rect} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

class CMultiLineAnims extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
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
      outputRange: [0, this.props.height],
    });
    const interpolatedY = animatedValue.interpolate({
      inputRange: [0, this.props.maxValue],
      outputRange: [this.props.height, 0],
    });

    return (
      <G>
        <AnimatedRect
          x={this.props.x}
          y={interpolatedY}
          width={this.props.width}
          rx={this.props.width / 2}
          ry={this.props.width / 2}
          height={interpolatedHeight}
          fill={`url(#${this.props.gradientColor})`}
        />
      </G>
    );
  }
}

export default CMultiLineAnims;
