import React, {Component} from 'react';
import { translate } from 'react-i18next';

import * as utils from './utils'

class MainNavigation extends Component {

  state = {
    lang: 'en',
  }

  onChange = (e) => {
    console.log('change lang=', e.target.value);
    utils.changeLanguage(e.target.value);
    document.location.reload();
  }

  componentDidMount() {
    const storedLang = utils.readCookie('i18next');
    if(storedLang) {
      this.setState({lang: storedLang});
    }
  }

  render() {
    const t = this.props.t;
    return (
      <span>
        <a href="/index.html">
          <i className="left material-icons">edit_location</i>
          {t('main-nav__check-in')}
        </a>
        <a href="#!events">
          <i className="material-icons left">favorite</i>
          {t('main-nav__events')}
        </a>
        <a href="#!account">
          <i className="left material-icons">person</i>
          {t('main-nav__account')}
        </a>
        <a href="#!settings"><i className="left material-icons">settings</i>
          {t('main-nav__settings')}
        </a>

        <div className="lang-selector-wrapper">
          <select
            name="lang"
            id="lang-selector"
            value={this.state.lang}
            onChange={this.onChange}>
            <option value="en">{t('main-nav__english')}</option>
            <option value="es">{t('main-nav__spanish')}</option>
          </select>
          <i className="material-icons">language</i>
        </div>
      </span>
    );
  }
}

export default translate()(MainNavigation);
