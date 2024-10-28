import React, {PureComponent} from 'react';
import {G} from 'react-native-svg';
import CColumnChartAnims from './CColumnChartAnims';

class CColumnChartAnim extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const chartHeight = this.props.height - 95;
    return (
      <G y={50}>
        {this.props.values?.map((_, ky) => (
          <CColumnChartAnims
            value={_}
            index={ky}
            maxValue={this.props.maxValue}
            height={chartHeight}
            width={this.props.width}
            x={
              ky *
                (this.props.width * this.props.columnCount + this.props.gap) +
              this.props.index * (this.props.width + 5)
            }
            gradientColor={this.props.gradientColor}
            key={ky}
          />
        ))}
      </G>
    );
  }
}

export default CColumnChartAnim;
