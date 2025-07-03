const socket = io();

let username = "";

const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const gameModal = document.getElementById('game-modal');
const closeGame = document.getElementById('close-game');

// Username join
joinBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    socket.emit('new-user', username);
    alert(`Welcome, ${username}!`);
  }
});

// Chat send
sendBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    socket.emit('send-message', `${username}: ${message}`);
    chatInput.value = '';
  }
});

// Receive user joined
socket.on('user-joined', name => {
  const msg = document.createElement('div');
  msg.textContent = `${name} joined the lounge`;
  chatLog.appendChild(msg);
});

// Receive chat message
socket.on('chat-message', msg => {
  const msgElement = document.createElement('div');
  msgElement.textContent = msg;
  chatLog.appendChild(msgElement);
  chatLog.scrollTop = chatLog.scrollHeight;
});

// Open mini game modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'g') {
    gameModal.classList.remove('hidden');
  }
});

closeGame.addEventListener('click', () => {
  gameModal.classList.add('hidden');
});
