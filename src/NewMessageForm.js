import React, { Component } from 'react';
import { translate, Interpolate } from 'react-i18next';
import classnames from 'classnames';

import ContactsWidget from './ContactsWidget';

function isNotEmpty(value) {
  return value !== '' && value !== undefined && value !== null && value.trim() !== '';
}


class NewMessageForm extends Component {

  state = {
    subject: {
      value: '',
      touched: false,
      invalid: false,
    },
    message: {
      value: '',
      touched: false,
      invalid: false,
    },
    saveCopy: true,
    contacts: [
      'mr@robot.com',
      'techno@lust.com'
    ]
  }

  constructor(props) {
    super(props);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleSubjectBlur = this.handleSubjectBlur.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageBlur = this.handleMessageBlur.bind(this);
    this.handleSaveCopyChange = this.handleSaveCopyChange.bind(this);
    this.handleDelContact = this.handleDelContact.bind(this);
    this.handleNewContact = this.handleNewContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelContact(contactMail) {
    const newContacts = [...this.state.contacts].filter(c => c !== contactMail);
    this.setState({
      contacts: newContacts
    });
  }

  handleNewContact(contactMail) {
    this.setState({
      contacts: [...this.state.contacts, contactMail]
    });
  }

  handleFieldBlur(e, fieldName) {
    const field = this.state[fieldName];
    const isInvalid = !isNotEmpty(field.value);
    this.setState({
      [fieldName]: {...field, touched: true, invalid: isInvalid}
    });

    console.log('handleFieldBlur=', {
      [fieldName]: {...field, invalid: isInvalid}
    });
  }

  handleSubjectBlur(e) {
    this.handleFieldBlur(e, 'subject');
  }

  handleMessageBlur(e) {
    this.handleFieldBlur(e, 'message');
  }

  handleFieldChange(e, fieldName) {
    const newVal = e.target.value;
    const field = this.state[fieldName];

    const isInvalid = !isNotEmpty(newVal);
    this.setState({
      [fieldName]: {...field, value: newVal, invalid: isInvalid}
    });
    console.log('handleFieldBlur=', {
      [fieldName]: {...field, value: newVal, invalid: isInvalid}
    });
  }

  handleSubjectChange(e) {
    this.handleFieldChange(e, 'subject');
  }

  handleMessageChange(e) {
    this.handleFieldChange(e, 'message');
  }

  handleSaveCopyChange(e) {
    this.setState({
      saveCopy: !this.state.saveCopy,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const fieldsToValidate = ['subject', 'message'];
    for(const fName of fieldsToValidate) {
      const field = this.state[fName];
      this.setState({
        [fName]: {...field, touched: true, invalid: !isNotEmpty(field.value)}
      });
    }
  }

  render() {
    const subjectField = this.state.subject;
    const messageField = this.state.message;
    const t = this.props.t;
    const i18nSubject = t('message-form__subject');
    const i18nMessage = t('message-form__message');

    return (
      <div onSubmit={this.handleSubmit}>
        <div className="messages__main-inputs">
          <div className="form-group">
            <label htmlFor="toContacts">{t('message-form__contacts')}</label>
            <ContactsWidget
              contacts={this.state.contacts}
              onDelete={this.handleDelContact}
              onNewContact={this.handleNewContact}
            />
          </div>

          <div className={classnames({ 'form-group' : true, 'has-danger': (subjectField.touched && subjectField.invalid)})}>
            <label htmlFor="subject">{t('message-form__subject')}</label>
            <input
              value={subjectField.value}
              onChange={this.handleSubjectChange}
              onBlur={this.handleSubjectBlur}
              type="text"
              className="form-control"
              id="subject"
              placeholder="You must add a subject"
            />

            {subjectField.touched && subjectField.invalid ?
              <div className="form-control-feedback">
                <Interpolate parent="p" i18nKey="message-form__error" field={i18nSubject} />
              </div>
            : null }
          </div>

          <div className={classnames({ 'form-group' : true, 'has-danger': (messageField.touched && messageField.invalid)})}>
            <label htmlFor="message">{t('message-form__message')}</label>
            <textarea
              value={messageField.value}
              onChange={this.handleMessageChange}
              onBlur={this.handleMessageBlur}
              className="form-control"
              id="message"
              rows="3"></textarea>
            {messageField.touched && messageField.invalid ?
              <div className="form-control-feedback">
                <Interpolate parent="p" i18nKey="message-form__error" field={i18nMessage} />
              </div>
            : null }
          </div>
        </div>
        <div className="messages__footer">
          <div className="form-group clearfix">
            <input checked={this.state.saveCopy} onChange={this.handleSaveCopyChange} type="checkbox" id="save-copy" />
            <label htmlFor="save-copy"> {t('message-form__save-copy')}</label>
          </div>
          <button type="submit" className="btn-form" onClick={this.handleSubmit}>
            <img src="img/arrow-small-orange.png" className="btn-arrow" role="presentation" />&nbsp;
            {t('message-form__send-button')}
          </button>
          </div>
      </div>
    );
  }
}

export default translate()(NewMessageForm);
