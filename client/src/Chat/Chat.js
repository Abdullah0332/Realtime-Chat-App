import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import onlineIcon from '../icons/onlineIcon.png'

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import cartoon1 from '../icons/cartoon1.png'

import './Chat.css';

const ENDPOINT = 'https://realtime-chat-application001.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={4} lg={6} sm={12} xm={12}>
        <Container maxWidth="sm" >
          <img src={cartoon1} style={{ width: '100px'}}/>
          <div>
            <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
            <h2>Created with React, Express, Node and Socket.IO</h2>
          </div>
          {
            users
              ? (
                <div>
                  <h1>Currently Active People : </h1>
                  <div className="activeContainer">
                    <h2>
                      {users.map(({name}) => (
                        <div key={name} className="activeItem">
                          -> {name}
                          <img alt="Online Icon" src={onlineIcon}/>
                        </div>
                      ))}
                    </h2>
                  </div>
                </div>
              )
              : null
          }
        </Container>
      </Grid>
      <Grid item md={8} lg={6} sm={12} xm={12}>
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Chat;
