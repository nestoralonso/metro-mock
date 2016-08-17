import React, { Component } from 'react';
import { translate } from 'react-i18next';

class ProfileWidget extends Component {
  render() {
    const t = this.props.t;
    return (
      <div>
      <div className="profmenu__header">
          <div className="profmenu__profbox">
            <div className="profile-img__wrapper">
              <img src="/img/profile-pic.jpg" className="profile-img" alt="Avatar" />
            </div>
            <div className="profbox__user-info">
              <span className="profbox__first-name">Courtney</span>
              <span className="profbox__last-name">Timmons</span>
              <div className="profbox__followers">15,323 {t('widget-profile__followers')}</div>
            </div>
          </div>
        </div>
        <div className="profbox__menu">
          <ul>
            <li className="profbox__menu-item">
              <a href="">
              {t('widget-profile__edit-user')}
                <i className="material-icons">person</i>
              </a>
            </li>
            <li className="profbox__menu-item">
              <a href="">
              {t('widget-profile__Web Statistics')}
                <i className="material-icons">blur_linear</i>
              </a>
            </li>
            <li className="profbox__menu-item">
              <a href="">
              {t('widget-profile__upload-settings')}
                <i className="material-icons">backup</i>
              </a>
            </li>
            <li className="profbox__menu-item">
              <a href="">
              {t('widget-profile__events')}
                <i className="material-icons">edit_location</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default translate()(ProfileWidget);
