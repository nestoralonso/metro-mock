import React, {Component} from 'react';
import StatsPieChart from './StatsPieChart';
import { translate } from 'react-i18next';

class TransferStats extends Component {
  state = {
    stats: {},
    isLoaded: false,
  }

  computePercentages(stats) {
    let totalGb = 0;
    for(const key of Object.keys(stats)) {
      totalGb += stats[key].sizeGb;
    }

    const newStats = {};
    for(const key of Object.keys(stats)) {
      const pctStr = ((stats[key].sizeGb / totalGb) * 100).toFixed(1);
      newStats[key] = {...stats[key], pctStr};
    }

    return newStats;
  }

  componentDidMount() {
    fetch('/data/webstats.json')
    .then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then((stats) => {
      console.log('loadedData=', stats);
      const computedStats = this.computePercentages(stats);
      this.setState({
        stats: computedStats,
        isLoaded: true,
      });
    });
  }

  render() {
    const t = this.props.t;
    const { stats, isLoaded } = this.state;
    const arrayData = Object.keys(stats).map(k => ({...stats[k], name: k}));
    return (
      <div>
        <div className="webstats_graphic_wrapper">
          <StatsPieChart t={t} data={arrayData} />
        </div>
        <div className="webstats__chart-summary">{/*
       */}<div className="webstats__audio">{/*
          */}<div className="webstats__audio-legend">
              {t('webstats__audio')}
            </div>
            {isLoaded ? stats['audio'].pctStr : ''}%
          </div>{/*
       */}<div className="webstats__video">
            <div className="webstats__video-legend">
                {t('webstats__video')}
              </div>
            {isLoaded ? stats['video'].pctStr : ''}%
          </div>{/*
       */}<div className="webstats__photo">
            <div className="webstats__photo-legend">
                {t('webstats__photo')}
              </div>
            {isLoaded ? stats['photo'].pctStr: ''}%
          </div>{/*
    */}</div>
      </div>
    );
  }
}

export default translate()(TransferStats);
