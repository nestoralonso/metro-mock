import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n-init';

import * as utils from './utils'
import NewMessageForm from './NewMessageForm';
import StocksWidget from './StocksWidget';
import AccountMenuWidget from './AccountMenuWidget';
import MainNavigation from './MainNavigation';
import WebstatsWidget from './WebstatsWidget';
import ProfileWidget from './ProfileWidget';

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <NewMessageForm/>
  </I18nextProvider>,
  document.getElementById('new-message-form')
);

ReactDOM.render((
  <I18nextProvider i18n={ i18n }>
    <AccountMenuWidget />
  </I18nextProvider>),
  document.getElementById('widget-account-menu')
);

ReactDOM.render((
  <I18nextProvider i18n={ i18n }>
    <MainNavigation />
  </I18nextProvider>),
  document.querySelector('#main-navigation')
);

ReactDOM.render((
  <I18nextProvider i18n={ i18n }>
    <WebstatsWidget />
  </I18nextProvider>),
  document.querySelector('#widget-webstats')
);

ReactDOM.render((
  <I18nextProvider i18n={ i18n }>
    <ProfileWidget />
  </I18nextProvider>),
  document.querySelector('#widget-profmenu')
);


const storedLang = utils.readCookie('i18next') || 'en';

ReactDOM.render((
  <I18nextProvider i18n={ i18n }>
    <StocksWidget lang={storedLang} />
  </I18nextProvider>),
  document.getElementById('widget-stocks')
);
