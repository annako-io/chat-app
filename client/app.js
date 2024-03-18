const socket = io('ws://localhost:3500');

// Global variables
const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const activity = document.querySelector('.activity');
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

msgInput.addEventListener('keypress', () => {
  socket.emit('activity', nameInput.value);
});

// Message list
socket.on('message', (data) => {
  const post = document.createElement('li');
  post.className = 'post';
  post.innerHTML = data;
  document.querySelector('.chat-display').appendChild(post);
});

// Notify activity
let activityTimer;
socket.on('activity', (name) => {
  activity.textContent = `${name} is typing...`;

  // Clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = '';
  }, 3000);
});