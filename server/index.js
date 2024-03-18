const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3500;
const ADMIN = 'Admin';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500', 'http://127.0.0.1:5500']
  }
});

// State of users
const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray
  }
};

// User connects to app
io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);

  // Upon connection - message only to user (socket, not io)
  socket.emit('message', buildMsg(ADMIN, 'You have joined the Chat App!'));

  // Upon entering a room
  socket.on('enterRoom', ({ name, room }) => {
    // Leave previous room
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`));
    }

    // Activiate user (state)
    const user = activateUser(socket.id, name, room);

    // Update previous room users list (after updating user state)
    if (prevRoom) {
      io.to(prevRoom).emit('userList', {
        users: getUsersInRoom(prevRoom)
      });
    }

    // Join room
    socket.join(user.room);

    // Notify user who joined
    socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`));

    // Notify everyone else
    socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`));

    // Update user list for room
    io.to(user.room).emit('userList', {
      users: getUsersInRoom(user.room)
    });

    // Update room list for everyone
    io.emit('roomList', {
      rooms: getAllActiveRooms()
    });
  });

  // When user disconnects - to all others
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    // Remove user from state
    userLeavesApp(socket.id);

    if (user) {
      io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));

      io.to(user.room).emit('userList', {
        users: getUsersInRoom(user.room)
      });

      io.emit('roomList', {
        rooms: getAllActiveRooms()
      });
    }
    console.log(`User ${socket.id} disconnected`);
  });

  // Listening for a message event
  socket.on('message', ({ name, text }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit('message', buildMsg(name, text));
    }
  });

  // Listen for activity
  socket.on('activity', (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit('activity', name);
    }
  });
});

const buildMsg = (name, text) => {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date())
  };
};

// User functions
const activateUser = (id, name, room) => {
  const user = { id, name, room };
  UsersState.setUsers([
    ...UsersState.users.filter(user => user.id !== id),
    user
  ]);
  return user;
};

const userLeavesApp = (id) => {
  UsersState.setUsers(
    UsersState.users.filter(user => user.id !== id)
  );
};

const getUser = (id) => {
  return UsersState.users.find(user => user.id === id);
};

const getUsersInRoom = (room) => {
  return UsersState.users.filter(user => user.room === room);
};

const getAllActiveRooms = () => {
  return Array.from(new Set(UsersState.users.map(user => user.room)));
};