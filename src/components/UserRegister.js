require('../styles/UserRegister.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    //Sayfa 3 e 9 olarak bölündü.
    return (
      <div>
        
        <h3>React Chat App</h3>
        <div className="row"> 
        <div className="col-md-3">
        <div className="alert alert-success www" role="alert">
          Kullanıcı adı
        </div>
        
        </div>
        
        <div className="col-md-9 container">
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
        </div>
        </div>

       
        
       
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
