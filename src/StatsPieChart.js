import React, {Component} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  "audio": "#4daf7b",
  "video": "#e35936",
  "photo": "#ebc85e",
  "other": "#f4ede7",
};

class StatsPieChart extends Component {
  state = {
    currIdx: 0,
  };

  onBarSelect = (e, idx) => {
    console.log('selected=', idx);
    this.setState({
      currIdx: idx,
    });
  }

  renderCustomTooltip = () => {
    const selData = this.props.data[this.state.currIdx];
    if(!selData) return <div>...</div>;
    return (
      <div className="webstats__center-tooltip">
        <div>{selData.numFiles} {this.props.t('webstats__files')} </div>
        <h1>{selData.sizeGb} Gb</h1>
      </div>);
  }

  render() {
    const { data } = this.props;

    return (
      <div style={ {position: 'relative', width: '100%', height: '100%'} }>
        <ResponsiveContainer>
          <PieChart onClick={this.onBarSelect} >
            <Pie data={data} valueKey='sizeGb' innerRadius={70} outerRadius={130}>
            {data.map((entry, index) =>
              <Cell fill={COLORS[entry.name]} style={{cursor: 'pointer'}} key={index} />)
            }
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div style={{
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          textAlign: 'center',
          backgroundColor: '#00000080',
          pointerEvents: 'none'
        }}>{this.renderCustomTooltip()}</div>
      </div>
    );
  }
}

export default StatsPieChart;
