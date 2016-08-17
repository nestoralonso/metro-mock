import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
import fetch from 'isomorphic-fetch';


class StocksWidget extends Component {
  state = {
    closePrice: [],
    volume: [],
  };

  componentDidMount() {
    fetch('/data/msft.json')
      .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then((monthly) => {
          this.setState({
            closePrice: monthly.map(p => parseFloat(p['Close'], 10)),
            volume: monthly.map(p => parseInt(p['Volume'], 10)),
          })

          console.log('monthly=', monthly.map(p => p['Close']).join(', '))
      });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <header className="stocks__header">
          <div className="stocks__curr-price">
            <i className="material-icons">trending_up</i>634.39
            <div className="stocks__today-change">+2.18 (3.71%)</div>
          </div>

          <div className="stocks__volume-graph-wrapper">
            {this.state.volume.length > 0 ?
              <Sparklines data={this.state.volume} width={170} height={35}>
                <SparklinesBars
                  style={{ fill: '#3d9e68', strokeWidth: 0.2, stroke: '#4daf7b'}}
                />
              </Sparklines>
            :
              <div>{t('stocks__loading')} </div>
            }
          </div>
          <div className="stocks__trend-graph-wrapper">
            {this.state.closePrice.length > 0 ?
              <Sparklines data={this.state.closePrice} width={240} height={110}>
                <SparklinesLine
                  style={{ fill: 'none', strokeWidth: 3, stroke: "#FFFFFF"}}
                />
              </Sparklines>
            :
              <div>{t('stocks__loading')} </div>
            }
          </div>
        </header>

        <div className="stocks__body">
          <div className="stocks__date">
            {(new Date()).toLocaleString(this.props.lang)}
          </div>
          <span className="stocks__location">Salt Lake City</span>
          <div className="stocks__summary-info clearfix">
            <div className="stocks__shares-traded">
              <div>13.5 M</div>
              <div>{t('stocks__shares-traded')}</div>
            </div>
            <div className="stocks__shares-marketcap">
              <div>28.44 B</div>
              <div>{t('stocks__market-cap')}</div>
            </div>
          </div>

          <div className="stocks__footer">
            <div className="stocks__quarter-mini-report">
              <h1>MSFT</h1>
              <Sparklines data={this.state.volume} width={170} height={35}>
                <SparklinesBars
                  style={{ fill: '#3d9e68', strokeWidth: 0.2, stroke: '#4daf7b'}}
                />
              </Sparklines>
            </div>

            <div className="stocks__yearly-change">
              <span>{t('stocks__yearly-change')}</span>
              <div className="stocks__green-rect">+127.01</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(StocksWidget);
