require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '',password:'' };

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.userpasswordChangeHandler = this.userpasswordChangeHandler.bind(this);
    this.SubmitHandler = this.SubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }
  userpasswordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }

  SubmitHandler(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    var cevap = fetch('http://localhost:4008/login', {
      method: 'POST',
      body: data,
    });
    this.setState({ submitted: true, username: this.state.username, password: this.state.password });
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now show the main App
      return (
        <ChatApp username={this.state.username} />
      );
    }

    // Initial page load, show a simple login form
    return (
      <div>
        <div return className="jumbotron text-center t" > 
          <h1 >React Instant Chat</h1>
        </div>
        <form onSubmit={this.SubmitHandler} className="username-container">
          <div><img src="/../foto2.png" className="rounded-circle fotos2" width="200" height="130"/></div>
          <div>
            <input
              type="text" name="user"
              onChange={this.usernameChangeHandler}
              placeholder="Enter a username..."
              required />
          </div>
          <div>
            <input
              type="password" name="password"
              onChange={this.userpasswordChangeHandler}
              placeholder="Enter a password..."
              required />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}
App.defaultProps = {
};

export default App;
