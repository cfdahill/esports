import React, {Component} from 'react';
import {Button, FormGroup, Controllabel, FormControl, HelpBlock} from 'react-bootstrap';

class CreateAccount extends Component {

  state={
    userName: '',
    passWord: ''
  }

  render() {
    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            label="User Name"
            value={this.state.userName}
            placeholder="User Name"
            onChange={(e) => this.setState({
              userName: e.target.value
            })}
          />
          <FormControl
            type="password"
            label="Password"
            value={this.state.passWord}
            placeholder="password"
            onChange={(e) => this.setState({
              passWord: e.target.value
            })}
            />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}

export default CreateAccount;