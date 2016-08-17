import React, { Component } from 'react';
import { translate, Interpolate } from 'react-i18next';

import TransferStats from './TransferStats';
import ProfileWidget from './ProfileWidget';
import classnames from 'classnames';

class WebstatsWidget extends Component {

  state = {
    selectedTab: 0,
  };

  changeTab = (idx) => {
    this.setState({
      selectedTab: idx,
    });
  }

  render() {
    const { selectedTab } = this.state;
    const t = this.props.t;

    return (
      <div>
          <ul className="webstats__tabs">{/*
         */}<li
              role="presentation"
              onClick={(e) => this.changeTab(0)}
              className={classnames({active: (selectedTab === 0)})}
              >
                <a href="#">{t('webstats__diagram-stats')}</a>
              </li>{/*
         */}<li
              role="presentation"
              onClick={() => this.changeTab(1)}
              className={classnames({active: (selectedTab === 1)})}>
                <a href="#">{t('webstats__profile')}</a>
            </li>{/*
        */}</ul>

        <div className="webstats__content">
          {this.state.selectedTab === 0 ?
            <TransferStats />
          :
            <ProfileWidget />
          }
        </div>

        <div className="webstats__toolbar btn-group" role="group" aria-label="Statistics Tools">
          <button type="button" className="webstats__button">
            <i className="material-icons">backup</i>
            {t('webstats__upload-files')}
          </button>
          <button type="button" className="webstats__button">
            <i className="material-icons">share</i>
            {t('webstats__share')}
          </button>
          <button type="button" className="webstats__button">
            <i className="material-icons">low_priority</i>
            {t('webstats__backup')}
          </button>
        </div>
      </div>
    );
  }
}

export default translate()(WebstatsWidget);
