require('../styles/ChatApp.css');

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
    
    const https = require('https');
    https.get('http://localhost:4008/message', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      
      resp.on('end', () => {
        var jsonData = JSON.parse(data);
        var messages = [];
        for (var i = 0; i < jsonData.rows.length; i++) {
          var counter = jsonData.rows[i];
          var message = {
            mesaj: counter.mesaj,
            user: counter.user
          };
          messages.push(message);
        }
        messages = messages.reverse();
        for (var i = 0; i < messages.length; i++) {
          console.log(messages[i].mesaj + " , " + messages[i].user);
          
          var message = messages[i].mesaj;

          const messageObject = {
            username: messages[i].user,
            message
          };
          if (this.props.username == messageObject.username)
          {
            messageObject.fromMe = true;
          }
          this.addMessage(messageObject);
        }

      });
      
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
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
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;