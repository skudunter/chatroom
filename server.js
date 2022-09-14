const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
var users = [];


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})
server.listen(process.env.PORT)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message sent', (msg) => {
    io.emit('message sent', msg)
  })
  socket.on('user register', (username) => {
    users.push(username);
    io.emit('user register', username + ' has registered');
    io.emit('users array update', users);
  })
  socket.on('disconnect', () => {
    io.emit('user disconnected');
    console.log('user has disconnected');
  })
  io.on('clear array', (username) => {
  for(let i = 0;i < users.length;i++){
  if(users[i] == username){
    users[i].splice
  }
  }
  })
});
