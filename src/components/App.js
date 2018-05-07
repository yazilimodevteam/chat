require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
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
      <h1 >React Instant Chat</h1>
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <div><h2>Deneme</h2></div>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Enter a username..."
            required />
        </div>
        <div>
          <input  //Username'e benzer passwordhandeler yazıldı.
            type="text"
            onChange={this.passwordChangeHandler}
            placeholder="Enter a Password..."
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
