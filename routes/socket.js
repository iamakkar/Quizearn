import io from 'socket.io-client';
const socket = io('https://6d78d89c5ce7.ngrok.io');

module.exports = {
  socket,
};
