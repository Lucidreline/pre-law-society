import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../input/input.component';
import Btn from '../../../btn/btn.component';

import './contact-us-form.styles.scss';

class ContactUsForm extends Component {
  constructor() {
    super();
    this.state = {
      emailSent: false,
      name: '',
      email: '',
      message: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }); // if name = email, then {email: value}, etc. So it can be dynamic

    if (e.target.value.trim() !== '') e.target.classList.add('valid');
    else e.target.classList.remove('valid');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;

    // validate data

    // send via sendgrid

    this.sendEmail(name, email, message);

    // clear form
    this.clearForm(e);
  };

  clearForm = (form) => {
    this.setState({ name: '', email: '', message: '' });
    form.target.reset();
    document
      .querySelectorAll('.contact-us-form form input')
      .forEach((input) => {
        input.classList.remove('valid');
      });
    document
      .querySelectorAll('.contact-us-form form textarea')
      .forEach((input) => {
        input.classList.remove('valid');
      });
  };

  sendEmail = (_name, _email, _message) => {
    const userInfo = {
      name: _name,
      email: _email,
      msg: _message,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    };

    fetch(`${process.env.REACT_APP_URL}/send-email`, requestOptions).then(
      this.setState({ emailSent: true })
    );
  };

  render() {
    const inputs = (
      <form onSubmit={this.handleSubmit}>
        <h2 className='form-title'>Send us an Email!</h2>
        <Input
          type='text'
          name='name'
          placeholder='Name'
          handleChange={this.handleChange}
        />
        <Input
          type='text'
          name='email'
          placeholder='Email'
          handleChange={this.handleChange}
        />
        <Input
          type='textArea'
          name='message'
          placeholder='Message'
          handleChange={this.handleChange}
        />
        <Btn className='needs-margin-top' type='submit' color='orange'>
          Send
        </Btn>
      </form>
    );

    const receipt = (
      <div className='email-receipt'>
        <h2>Your Email Was Sent!</h2>
        <i className='fas fa-paper-plane'></i>
        <p className='msg'>We will get back to you as soon as possible!</p>
        <p className='thank-you'>Thank you!</p>
        <Link to='/home' className='text-decoration-none'>
          <Btn className='needs-margin-top'>Return Home</Btn>
        </Link>
      </div>
    );

    let contentToShow;

    if (this.state.emailSent) {
      contentToShow = receipt;
    } else {
      contentToShow = inputs;
    }

    return <div className='contact-us-form'>{contentToShow}</div>;
  }
}

export default ContactUsForm;
