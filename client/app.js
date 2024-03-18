const socket = io('ws://localhost:3500');

// Global variables
const msgInput = document.querySelector('#message');
const chatDisplay = document.querySelector('.chat-display');

// Send message function
const sendMessage = (e) => {
  e.preventDefault();

  if (msgInput.value) {
    socket.emit('message', msgInput.value);
    msgInput.value = '';
  }
  msgInput.focus();
};

// Event listeners
document.querySelector('.form-msg').addEventListener('submit', sendMessage);

// Message list
socket.on('message', (data) => {
  const post = document.createElement('li');
  post.className = 'post';
  post.innerHTML = data;
  document.querySelector('.chat-display').appendChild(post);
});