import React, { Component } from 'react';
import { translate } from 'react-i18next';

class AccountMenu extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="account-menu clearfix">
        <ul>
          <li>
            <a href="#!profile">
              <i className="left material-icons">people</i>
              {t('account_MyProfile')}
            </a>
            <ul className="account-menu__submenu">
              <li><a href="#!invite">{t('account_InviteFriends')}</a></li>
              <li><a href="#!find-friend">{t('account_FindFriends')}</a></li>
              <li><a href="#!logout">{t('account_Logout')}</a></li>
            </ul>
          </li>
          <li>
            <a href="#!events">
              <i className="material-icons left">edit</i>
              {t('account_Edit')}
            </a>

            <ul className="account-menu__submenu">
              <li><a href="#!edit-profile">{t('account_EditProfile')}</a></li>
              <li><a href="#!account-settings">{t('account_AccountSettings')}</a></li>
              <li><a href="#!followers">{t('account_Followers')}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default translate()(AccountMenu);
