import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class CreateAccount extends Component {

  state={
    username: '',
    password: '',
    confirmPW: '',
    message: '',
    redirect: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    if(this.state.password !== this.state.confirmPW) {
      this.setState({message: "Password and Confirm Password do not match."
    });
    } else {
      e.preventDefault();
      axios.post('http://localhost:3000/auth/signup', {
        username: this.state.username,
        password: this.state.password
      })
        .then(response => {
          console.log(response);
          if(!response.data.msg) {
            console.log('Gratz!');
            this.setState({
              redirect: true
            });
          } else {
            this.setState({message: 'That username is already taken.'})
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/login'/>;
    } else {
    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            label="User Name"
            value={this.state.userName}
            placeholder="User Name"
            name="username"
            onChange={this.handleChange}
          />
          <FormControl
            type="password"
            label="Password"
            value={this.state.passWord}
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            />
            <FormControl
            type="password"
            label="ConfirmPW"
            value={this.state.passWord}
            placeholder="confirm password"
            name="confirmPW"
            onChange={this.handleChange}
            />
        </FormGroup>
        <p>{this.state.message}</p>
        <Button type="submit" onClick={this.handleSubmit}>Create</Button>
      </form>
      );
    }
  }
}

export default CreateAccount;