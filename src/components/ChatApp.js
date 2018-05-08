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
    https.get('http://192.168.0.104:4008/message', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        var jsonData = JSON.parse(data);
        for (var i = 0; i < jsonData.rows.length; i++) {
          var counter = jsonData.rows[i];
          var message = {
            message: counter.user,
            username: counter.mesaj
          };
          console.log(counter.user + " , " + counter.mesaj );
          this.addMessage(message);
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
      <div>
        
        <h3><img src="/../foto2.png" className="rounded-circle fotos" width="130" height="60"/>React Chat App</h3>        <div className="row"> 
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