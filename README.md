# Chat Application

---
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

---

This is a chat application that is built with Node.js, Express.js, and Socket.IO. Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.

Chat App's connection is established with WebSocket that provides a communication channel with the server and the client. It falls back on HTTP long-polling if the connection is lost. 

Users can create new chat rooms and join existing ones. The chat may have multiple users, and it sends events to all users in the same chat room. 

* [Node.js](https://nodejs.org/en) 

* [Express.js](https://expressjs.com/) 

* [Socket.IO](https://socket.io/) 

## Installation

Dependencies may be installed with npm.

Download or clone the repository.
```
git clone https://github.com/annako-io/chat-app.git
```
Install dependencies and run the application locally in development.
```
cd chat-app
npm install
npm run dev
```

Your application is ready to go!

### Contributing

If you are interested in contributing, feel free to submit an issue or a pull request! Chat App is an open source learning exercise and I would welcome contributions from other developers excited about the project!