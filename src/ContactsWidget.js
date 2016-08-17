import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class ContactsWidget extends Component {

  state = {
    newContact: '',
    selectedIdx: 1,
  }

  handleChange = (e) => {
    this.setState({ newContact: e.target.value });
  }

  handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      this.props.onNewContact(this.state.newContact);
      this.setState({ newContact: ''});
    }
  }

  handleSelect = (contactName) => {
    for(let i = 0; i < this.props.contacts.length; i++) {
      const name = this.props.contacts[i];
      if(name === contactName) {
        this.setState({ selectedIdx: i });
        break;
      }
    }
  }

  renderContact = (contactName, key) => {
    const selected = this.state.selectedIdx === key;
    return (
      <div
        className={classnames({ 'chip': true, 'selected' : selected})}
        onClick={(e) => this.handleSelect(contactName)}
        key={key}
      >
        {contactName}
        <i className="material-icons close" onClick={(e) => this.props.onDelete(contactName)}>close</i>
      </div>
    );
  }

  render() {
    return (
      <div className="form-control contacts-widget">
        {this.props.contacts.map(this.renderContact)}
        <input
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
          value={this.state.newContact}
          type="text"
          className="input-no-decorations"
          placeholder="+name@me.com"
        />
      </div>
    );
  }
}
ContactsWidget.propTypes = {
  contacts: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onNewContact: PropTypes.func.isRequired,
};
ContactsWidget.defaultProps = {
  contacts: [],
};
export default ContactsWidget;
