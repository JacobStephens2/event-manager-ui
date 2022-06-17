import React from 'react';
import Nav from '../components/Nav.js';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Nav />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label htmlFor='email'>
            Email
            <input type='email' id='email' />
          </label>
          <label htmlFor='password'>
            Password
            <input type='password' id='password' />
          </label>
          <label htmlFor='submit'>
            Login
            <input type='submit' id='submit' />
          </label>
        </form>
      </>
    )
  }
}

export default Login;