const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static('public'));

// Socket logic
io.on('connection', socket => {
  socket.on('new-user', name => {
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send-message', msg => {
    socket.broadcast.emit('chat-message', msg);
  });
});

// Start server
server.listen(3000, () => {
  console.log('Byte Lounge running at http://localhost:3000');
});
