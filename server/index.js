const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3500;
const ADMIN = 'Admin';

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500', 'http://127.0.0.1:5500']
  }
});

// User connects to app
io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);

  socket.emit('message', 'You have joined the Chat App!');

  // User disconnects
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    console.log(`User ${socket.id} disconnected`);
  });

  // Listen for a message event
  socket.on('message', data => {
    io.emit('message', data);
  });

  // Listen for activity
  socket.on('activity', (name) => {
    socket.broadcast.to(room).emit('activity', name);
  });
});


